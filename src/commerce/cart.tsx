import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import { getProduct } from './catalog';
import { computeTotals, isPurchasable } from './pricing';
import type { CartLine, CartTotals, OrderSummary, PurchaseType } from './types';

/**
 * Client-side cart. State persists in localStorage so it survives reloads.
 * When a real platform is connected, swap the reducer's persistence for the
 * platform's cart API — components only use the `useCart()` surface.
 */
const STORAGE_KEY = 'ellura-cart-v1';
const ORDER_KEY = 'ellura-last-order';
const MAX_QTY = 10;

type Action =
  | { type: 'add'; sku: string; qty: number; purchase: PurchaseType }
  | { type: 'set'; id: string; qty: number }
  | { type: 'remove'; id: string }
  | { type: 'switch'; id: string; purchase: PurchaseType }
  | { type: 'clear' }
  | { type: 'replace'; lines: CartLine[] };

const lineId = (sku: string, purchase: PurchaseType) => `${sku}:${purchase}`;

function reducer(state: CartLine[], a: Action): CartLine[] {
  switch (a.type) {
    case 'add': {
      const id = lineId(a.sku, a.purchase);
      const existing = state.find((l) => l.id === id);
      if (existing) return state.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, l.qty + a.qty) } : l));
      return [...state, { id, sku: a.sku, qty: Math.min(MAX_QTY, a.qty), purchase: a.purchase }];
    }
    case 'set':
      return a.qty <= 0 ? state.filter((l) => l.id !== a.id) : state.map((l) => (l.id === a.id ? { ...l, qty: Math.min(MAX_QTY, a.qty) } : l));
    case 'remove':
      return state.filter((l) => l.id !== a.id);
    case 'switch': {
      const line = state.find((l) => l.id === a.id);
      if (!line) return state;
      const rest = state.filter((l) => l.id !== a.id);
      return reducer(rest, { type: 'add', sku: line.sku, qty: line.qty, purchase: a.purchase });
    }
    case 'clear':
      return [];
    case 'replace':
      return a.lines;
  }
}

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    // Drop anything that is no longer purchasable (e.g. catalogue changes).
    return parsed.filter((l) => {
      const p = getProduct(l.sku);
      return p && isPurchasable(p) && l.qty > 0 && (l.purchase !== 'subscription' || p.subscription.eligible);
    });
  } catch {
    return [];
  }
}

interface CartContextValue {
  lines: CartLine[];
  totals: CartTotals;
  open: boolean;
  /** Last line that was added — lets the drawer highlight it. */
  lastAdded: string | null;
  setOpen: (open: boolean) => void;
  add: (sku: string, qty: number, purchase: PurchaseType, openDrawer?: boolean) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  switchPurchase: (id: string, purchase: PurchaseType) => void;
  clear: () => void;
  saveOrder: (o: OrderSummary) => void;
  lastOrder: () => OrderSummary | null;
  maxQty: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, undefined, load);
  const [open, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable — cart still works for this session */
    }
  }, [lines]);

  // Keep carts in sync across tabs.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) dispatch({ type: 'replace', lines: load() });
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const add = useCallback((sku: string, qty: number, purchase: PurchaseType, openDrawer = true) => {
    const p = getProduct(sku);
    if (!p || !isPurchasable(p)) return;
    const type: PurchaseType = purchase === 'subscription' && !p.subscription.eligible ? 'one-time' : purchase;
    dispatch({ type: 'add', sku, qty, purchase: type });
    setLastAdded(lineId(sku, type));
    if (openDrawer) setOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      totals: computeTotals(lines),
      open,
      lastAdded,
      setOpen,
      add,
      setQty: (id, qty) => dispatch({ type: 'set', id, qty }),
      remove: (id) => dispatch({ type: 'remove', id }),
      switchPurchase: (id, purchase) => dispatch({ type: 'switch', id, purchase }),
      clear: () => dispatch({ type: 'clear' }),
      saveOrder: (o) => {
        try {
          sessionStorage.setItem(ORDER_KEY, JSON.stringify(o));
        } catch {
          /* ignore */
        }
      },
      lastOrder: () => {
        try {
          const raw = sessionStorage.getItem(ORDER_KEY);
          return raw ? (JSON.parse(raw) as OrderSummary) : null;
        } catch {
          return null;
        }
      },
      maxQty: MAX_QTY,
    }),
    [lines, open, lastAdded, add],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
