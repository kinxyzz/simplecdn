export function createSafeImageName(originalName: string): string {
  const timestamp = Date.now();
  const sanitizedOriginalName = originalName.replace(/[^a-zA-Z0-9-_]/g, "");
  return `${timestamp}-${sanitizedOriginalName}.jpg`;
}
