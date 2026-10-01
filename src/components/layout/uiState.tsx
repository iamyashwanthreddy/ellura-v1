import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface UIState {
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}

const Ctx = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const value = useMemo(() => ({ searchOpen, setSearchOpen, menuOpen, setMenuOpen }), [searchOpen, menuOpen]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUI() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useUI must be used inside <UIProvider>');
  return c;
}
