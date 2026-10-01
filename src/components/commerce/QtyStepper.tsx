import Icon from '../ui/Icon';

export default function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  label = 'Quantity',
  size = 'md',
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  label?: string;
  size?: 'sm' | 'md';
}) {
  return (
    <div className={`qty qty--${size}`} role="group" aria-label={label}>
      <button type="button" className="qty__btn" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Decrease ${label.toLowerCase()}`}>
        <Icon name="minus" size={16} />
      </button>
      <output className="qty__value" aria-live="polite" aria-label={`${label}: ${value}`}>
        {value}
      </output>
      <button type="button" className="qty__btn" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`Increase ${label.toLowerCase()}`}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
