import { formatINR, mrpSaving, unitPrice } from '../../commerce/pricing';
import type { Product, PurchaseType } from '../../commerce/types';

/** Price with MRP strike-through and saving chip; honest fallback when unannounced. */
export function Price({
  product,
  purchase = 'one-time',
  size = 'md',
  showSave = true,
  className = '',
}: {
  product: Product;
  purchase?: PurchaseType;
  size?: 'sm' | 'md' | 'lg';
  showSave?: boolean;
  className?: string;
}) {
  const unit = unitPrice(product, purchase);
  if (unit === null) {
    return (
      <p className={`price price--${size} price--tba ${className}`}>
        <span className="price__now">Price at launch</span>
      </p>
    );
  }
  const compare = product.mrp ?? product.price;
  const saving = compare !== null ? compare - unit : 0;
  return (
    <p className={`price price--${size} ${className}`}>
      <span className="sr-only">Price </span>
      <span className="price__now">{formatINR(unit)}</span>
      {compare !== null && compare > unit && (
        <>
          <span className="sr-only">, MRP </span>
          <s className="price__was">{formatINR(compare)}</s>
        </>
      )}
      {showSave && saving > 0 && <span className="chip chip--save price__save">Save {formatINR(saving)}</span>}
    </p>
  );
}

export function mrpNote(product: Product) {
  return product.mrp !== null && mrpSaving(product) !== null ? 'MRP inclusive of all taxes' : '';
}
