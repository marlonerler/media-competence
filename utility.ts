import Crypto from "crypto";

export interface Stringifiable {
  toString: () => string;
}

export async function hash(input: string): Promise<string> {
  if (!input) return "";
  return Crypto.createHash("md5").update(input).digest("hex");
}

export async function compareHash(
  input: string,
  referenceHash: string
): Promise<boolean> {
  const newHash = await hash(input);
  return newHash == referenceHash;
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

export function summarizeArray(array: string[]): string {
  switch (array.length) {
    case 0:
      return "Nobody";
    case 1:
      return array[0];
    case 2:
      return `${array[0]} and ${array[1]}`;
    case 3:
      return `${array[0]}, ${array[1]}, and ${array[2]}`;
    default:
      return `${array[0]}, ${array[1]}, and ${array.length - 2} more`;
  }
}
