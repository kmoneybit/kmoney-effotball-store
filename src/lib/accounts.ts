import fs from "fs/promises";
import path from "path";

export type StoreAccount = {
  id: number;
  title: string;
  status: "Active" | "Sold";
  category: string;
  price: string;
  added: string;
  imageDataUrl?: string;
};

export const defaultAccounts: StoreAccount[] = [
  {
    id: 1,
    title: "Epic Big Time Squad",
    status: "Active",
    category: "Premium",
    price: "18k",
    added: "2026-05-20",
  },
  {
    id: 2,
    title: "Showtime Legends Pack",
    status: "Active",
    category: "Legend",
    price: "50k",
    added: "2026-05-22",
  },
  {
    id: 3,
    title: "Starter Pro Edition",
    status: "Sold",
    category: "Starter",
    price: "12k",
    added: "2026-05-25",
  },
  {
    id: 4,
    title: "Weekend Goal Rush",
    status: "Active",
    category: "Value",
    price: "22k",
    added: "2026-05-28",
  },
];

const dataFilePath = path.join(process.cwd(), "data", "accounts.json");

async function ensureDataFile() {
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true });

  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(
      dataFilePath,
      JSON.stringify(defaultAccounts, null, 2),
      "utf8",
    );
  }
}

export async function readAccounts(): Promise<StoreAccount[]> {
  await ensureDataFile();

  const fileContents = await fs.readFile(dataFilePath, "utf8");
  if (!fileContents.trim()) {
    await fs.writeFile(
      dataFilePath,
      JSON.stringify(defaultAccounts, null, 2),
      "utf8",
    );
    return defaultAccounts;
  }

  try {
    const parsed = JSON.parse(fileContents) as StoreAccount[];
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : defaultAccounts;
  } catch {
    return defaultAccounts;
  }
}

export async function writeAccounts(nextAccounts: StoreAccount[]) {
  await ensureDataFile();
  await fs.writeFile(
    dataFilePath,
    JSON.stringify(nextAccounts, null, 2),
    "utf8",
  );
}
