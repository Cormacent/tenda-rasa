export function importImage(path: string): string {
  return new URL(`/src/assets/${path}`, import.meta.url).href;
}
