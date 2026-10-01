/**
 * React 18 doesn't know the `inert` attribute; passing an empty string sets it.
 * Spread the result onto an element: <div {...inert(!open)} />
 */
export const inert = (on: boolean): Record<string, string> => (on ? { inert: '' } : {});
