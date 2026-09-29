import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");

async function readCollection<T>(filename: string): Promise<T[]> {
  await mkdir(dataDir, { recursive: true });
  try { return JSON.parse(await readFile(path.join(dataDir, filename), "utf8")) as T[]; }
  catch { return []; }
}

async function appendCollection<T>(filename: string, record: T) {
  const records = await readCollection<T>(filename);
  records.push(record);
  await writeFile(path.join(dataDir, filename), JSON.stringify(records, null, 2), "utf8");
}

export async function saveInquiry<T>(record: T) { await appendCollection("inquiries.json", record); }
export async function saveOrder<T>(record: T) { await appendCollection("orders.json", record); }
export async function saveAccount<T>(record: T) { await appendCollection("accounts.json", record); }
export async function getOrder<T extends { id: string }>(id: string) { return (await readCollection<T>("orders.json")).find((order) => order.id === id) ?? null; }
export async function updateOrders<T extends { id: string; checkout: { customer: { email: string } }; accountId?: string }>(email: string, accountId: string) {
  const orders = await readCollection<T>("orders.json");
  const updated = orders.map((order) => order.checkout.customer.email.toLowerCase() === email.toLowerCase() ? { ...order, accountId } : order);
  await writeFile(path.join(dataDir, "orders.json"), JSON.stringify(updated, null, 2), "utf8");
}
