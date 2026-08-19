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

export const defaultAccounts: StoreAccount[] = [];

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
    return [];
  }

  try {
    const parsed = JSON.parse(fileContents) as StoreAccount[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
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
