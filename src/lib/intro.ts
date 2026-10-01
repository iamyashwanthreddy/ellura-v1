/**
 * Coordinates entrance timing between the first-visit loader, the route
 * transition and each page's intro animations.
 */
let firstLoad = true;
let loaderActive = false;
let last = { at: 0, value: 0 };

export const LOADER_DURATION = 1.9; // seconds until the loader has lifted

export function setLoaderActive(active: boolean) {
  loaderActive = active;
}

/** Seconds a page's intro should wait before it starts. */
export function introDelay(): number {
  const now = performance.now();
  // StrictMode mounts effects twice in development — reuse the same answer.
  if (now - last.at < 400) return last.value;
  let value = 0.25; // route change: content fades in quickly
  if (firstLoad) {
    firstLoad = false;
    value = loaderActive ? LOADER_DURATION - 0.35 : 0.15;
  }
  last = { at: now, value };
  return value;
}
