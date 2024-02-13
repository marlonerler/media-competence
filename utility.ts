export function hash(input: string): Promise<string> {
  return Bun.password.hash(input);
}

export function checkIsEmail(input: string): boolean {
  return /^(\w+)\@(\w+)\.(]w+)$/.test(input);
}
