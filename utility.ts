import Crypto from "crypto";

export interface Stringifiable {
  toString: () => string;
}

export async function hash(input: string): Promise<string> {
  if (!input) return "";
  return await Bun.password.hash(input);
}

export function checkIsEmail(input: string): boolean {
  return /^(\w+)\@(\w+)\.(\w+)$/.test(input);
}

export function uuid(): string {
  return Crypto.randomUUID();
}

export function parseMessage(data: Stringifiable): string[] {
  return data.toString().split("\n");
}

export function errorAndReturn<T>(message: string, value: T): T {
  console.error(message);
  return value;
}
