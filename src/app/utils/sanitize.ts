export function sanitize(value: string) {
  return value.trim().replaceAll(' ', '_').toLowerCase().replaceAll(/[^a-z0-9_-]/g, '');
}
