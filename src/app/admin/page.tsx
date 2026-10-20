"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Edit2,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

type AccountStatus = "Active" | "Sold";

type Account = {
  id: number;
  title: string;
  status: AccountStatus;
  category: string;
  price: string;
  added: string;
  imageDataUrl?: string;
};

const defaultAdminAccounts: Account[] = [];

const loadAccounts = async () => {
  const response = await fetch("/api/accounts");
  if (!response.ok) {
    return defaultAdminAccounts;
  }

  const data = (await response.json()) as Account[];
  return Array.isArray(data) ? data : defaultAdminAccounts;
};

const formDefaults = {
  title: "",
  category: "Premium",
  price: "",
  status: "Active" as AccountStatus,
  imageDataUrl: "",
};

const buildHighlights = (category: string) => {
  const base = {
    Premium: ["Elite squad", "Fast progress", "Verified account"],
    Legend: ["Top-tier cards", "Strong chemistry", "Ready to play"],
    Starter: ["Budget-friendly", "Easy start", "Quick delivery"],
    Value: ["Good value", "Balanced squad", "Fast support"],
  };

  return (
    base[category as keyof typeof base] ?? [
      "Ready to play",
      "Fast delivery",
      "Verified account",
    ]
  );
};

export default function AdminDashboard() {
  const [accounts, setAccounts] = useState<Account[]>(defaultAdminAccounts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | AccountStatus>(
    "All",
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(formDefaults);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/admin/session");
        if (response.ok) {
          setIsUnlocked(true);
        }
      } catch {
        setIsUnlocked(false);
      }
    };

    void checkSession();
  }, []);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      const nextAccounts = await loadAccounts();
      if (!ignore) {
        setAccounts(nextAccounts);
      }
    };

    load();

    const sync = () => {
      void load();
    };

    window.addEventListener("kmoney-accounts-updated", sync);
    return () => {
      ignore = true;
      window.removeEventListener("kmoney-accounts-updated", sync);
    };
  }, []);

  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      const matchesSearch = account.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesStatus =
        statusFilter === "All" || account.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [accounts, search, statusFilter]);

  const totalListings = accounts.length;
  const activeAccounts = accounts.filter(
    (account) => account.status === "Active",
  ).length;
  const soldAccounts = accounts.filter(
    (account) => account.status === "Sold",
  ).length;
  const totalValue = accounts.reduce((sum, account) => {
    const numericValue = Number(account.price.replace(/[^\d]/g, ""));
    return sum + (Number.isFinite(numericValue) ? numericValue : 0);
  }, 0);

  const resetForm = () => {
    setForm(formDefaults);
    setEditingId(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({
        ...current,
        imageDataUrl: typeof reader.result === "string" ? reader.result : "",
      }));
    };
    reader.readAsDataURL(file);
  };

  const openCreateForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (account: Account) => {
    setEditingId(account.id);
    setForm({
      title: account.title,
      category: account.category,
      price: account.price,
      status: account.status,
      imageDataUrl: account.imageDataUrl ?? "",
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim()) return;

    const today = new Date().toISOString().split("T")[0];

    if (editingId !== null) {
      const response = await fetch("/api/accounts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          title: form.title.trim(),
          category: form.category,
          price: form.price,
          status: form.status,
          imageDataUrl: form.imageDataUrl || "",
        }),
      });

      if (response.ok) {
        const nextAccounts = (await response.json()) as Account[];
        setAccounts(nextAccounts);
      }
    } else {
      const response = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now(),
          title: form.title.trim(),
          category: form.category,
          price: form.price,
          status: form.status,
          added: today,
          imageDataUrl: form.imageDataUrl || "",
        }),
      });

      if (response.ok) {
        const nextAccounts = (await response.json()) as Account[];
        setAccounts(nextAccounts);
      }
    }

    setIsFormOpen(false);
    resetForm();
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/accounts?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const nextAccounts = (await response.json()) as Account[];
      setAccounts(nextAccounts);
    }
  };

  const handleUnlock = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: accessCode.trim() }),
      });

      if (!response.ok) {
        setAccessError("Incorrect code. Access denied.");
        return;
      }

      setIsUnlocked(true);
      setAccessError("");
    } catch {
      setAccessError("Unable to verify admin access right now.");
    }
  };

  const toggleStatus = async (id: number) => {
    const currentAccount = accounts.find((account) => account.id === id);
    if (!currentAccount) return;

    const response = await fetch("/api/accounts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title: currentAccount.title,
        category: currentAccount.category,
        price: currentAccount.price,
        status: currentAccount.status === "Active" ? "Sold" : "Active",
        imageDataUrl: currentAccount.imageDataUrl || "",
      }),
    });

    if (response.ok) {
      const nextAccounts = (await response.json()) as Account[];
      setAccounts(nextAccounts);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-[#000B33] px-4">
        <div className="w-full max-w-md rounded-3xl border border-[var(--color-gold)]/20 bg-[#001A88] p-8 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-gold)]">
            Restricted
          </p>
          <h1 className="mb-6 text-center text-3xl font-black uppercase italic tracking-wider text-white">
            Admin Access
          </h1>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                Enter code
              </label>
              <input
                type="password"
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
                placeholder=""
                className="w-full rounded-xl border border-white/10 bg-[#000F4D] px-3 py-3 text-white outline-none transition focus:border-[var(--color-gold)]"
                autoFocus
              />
            </div>

            {accessError ? (
              <p className="text-sm font-medium text-red-400">{accessError}</p>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-xl bg-[var(--color-gold)] px-4 py-3 text-sm font-black uppercase tracking-[0.15em] text-[#000F4D] transition hover:bg-[var(--color-gold-hover)]"
            >
              Enter Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#000B33] min-h-[90vh] py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-[var(--color-gold)]">
              Store control room
            </p>
            <h1 className="text-3xl font-black uppercase italic tracking-wider text-white md:text-4xl">
              Admin <span className="text-[var(--color-gold)]">Dashboard</span>
            </h1>
          </div>

          <button
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-gold)] px-5 py-3 font-black text-[#000F4D] transition hover:bg-[var(--color-gold-hover)]"
          >
            <Plus className="h-5 w-5" />
            Add listing
          </button>
        </div>

        <div className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Listings",
              value: totalListings,
              icon: ShoppingCart,
              accent: "text-[var(--color-gold)] bg-[var(--color-gold)]/10",
            },
            {
              label: "Active",
              value: activeAccounts,
              icon: Activity,
              accent: "text-[#25D366] bg-[#25D366]/10",
            },
            {
              label: "Sold",
              value: soldAccounts,
              icon: ShieldCheck,
              accent: "text-white bg-white/10",
            },
            {
              label: "Value",
              value: `${totalValue}k`,
              icon: Users,
              accent: "text-[#7dd3fc] bg-[#7dd3fc]/10",
            },
          ].map(({ label, value, icon: Icon, accent }) => (
            <div
              key={label}
              className="rounded-2xl border border-[var(--color-gold)]/10 bg-[#001A88] p-5 shadow-[0_0_30px_rgba(0,0,0,0.15)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${accent}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Live
                </span>
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                {label}
              </p>
              <p className="mt-2 text-3xl font-black text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-[var(--color-gold)]/10 bg-[#001A88] shadow-xl">
          <div className="flex flex-col gap-4 border-b border-[var(--color-gold)]/10 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                Current Inventory
              </h2>
              <p className="text-sm text-gray-400">
                Track, update, and remove account listings.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search listings"
                  className="w-full rounded-lg border border-white/10 bg-[#000F4D] py-2.5 pl-9 pr-3 text-sm text-white outline-none transition focus:border-[var(--color-gold)] sm:w-64"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as "All" | AccountStatus)
                }
                className="rounded-lg border border-white/10 bg-[#000F4D] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[var(--color-gold)]"
              >
                <option value="All">All statuses</option>
                <option value="Active">Active</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>

          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-b border-[var(--color-gold)]/10 bg-[#000F4D]"
            >
              <form
                onSubmit={handleSubmit}
                className="grid gap-4 p-5 md:grid-cols-2"
              >
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Listing name
                  </label>
                  <input
                    value={form.title}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Epic Big Time Squad"
                    className="w-full rounded-xl border border-white/10 bg-[#001A88] px-3 py-2.5 text-white outline-none transition focus:border-[var(--color-gold)]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#001A88] px-3 py-2.5 text-white outline-none transition focus:border-[var(--color-gold)]"
                  >
                    <option>Premium</option>
                    <option>Legend</option>
                    <option>Starter</option>
                    <option>Value</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Price
                  </label>
                  <input
                    value={form.price}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        price: event.target.value,
                      }))
                    }
                    placeholder="18k"
                    className="w-full rounded-xl border border-white/10 bg-[#001A88] px-3 py-2.5 text-white outline-none transition focus:border-[var(--color-gold)]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        status: event.target.value as AccountStatus,
                      }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#001A88] px-3 py-2.5 text-white outline-none transition focus:border-[var(--color-gold)]"
                  >
                    <option value="Active">Active</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Account image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full rounded-xl border border-dashed border-white/15 bg-[#001A88] px-3 py-3 text-sm text-gray-300 file:mr-4 file:rounded file:border-0 file:bg-[var(--color-gold)] file:px-3 file:py-2 file:text-sm file:font-bold file:text-[#000F4D]"
                  />
                  {form.imageDataUrl ? (
                    <div className="mt-3 overflow-hidden rounded-xl border border-[var(--color-gold)]/20">
                      <img
                        src={form.imageDataUrl}
                        alt="Selected account"
                        className="h-32 w-full object-cover"
                      />
                    </div>
                  ) : null}
                </div>

                <div className="md:col-span-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormOpen(false);
                      resetForm();
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:bg-white/5"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-gold)] px-4 py-2.5 text-sm font-black text-[#000F4D] transition hover:bg-[var(--color-gold-hover)]"
                  >
                    <Sparkles className="h-4 w-4" />
                    {editingId !== null ? "Save changes" : "Create listing"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#000F4D]/60 text-xs uppercase tracking-[0.2em] text-gray-400">
                  <th className="p-4 font-bold">ID</th>
                  <th className="p-4 font-bold">Title</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Price</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account, index) => (
                  <motion.tr
                    key={account.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 last:border-0 hover:bg-[#0022AA]/40"
                  >
                    <td className="p-4 text-sm text-white">#{account.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {account.imageDataUrl ? (
                          <img
                            src={account.imageDataUrl}
                            alt={account.title}
                            className="h-11 w-11 rounded-lg object-cover border border-white/10"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[var(--color-gold)] text-xs font-bold">
                            IMG
                          </div>
                        )}
                        <span className="text-sm font-semibold text-white">
                          {account.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-300">
                      {account.category}
                    </td>
                    <td className="p-4 text-sm font-bold text-[var(--color-gold)]">
                      {account.price}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(account.id)}
                        className={`inline-flex min-w-[140px] items-center justify-center rounded-full border px-3 py-2 text-xs font-black uppercase tracking-[0.15em] transition ${
                          account.status === "Active"
                            ? "border-[#25D366]/30 bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25"
                            : "border-gray-500/30 bg-gray-500/10 text-gray-300 hover:bg-gray-500/20"
                        }`}
                        aria-label={
                          account.status === "Active"
                            ? `Mark ${account.title} as sold`
                            : `Mark ${account.title} as active`
                        }
                        title={
                          account.status === "Active"
                            ? `Mark ${account.title} as sold`
                            : `Mark ${account.title} as active`
                        }
                      >
                        {account.status === "Active"
                          ? "Mark sold"
                          : "Mark active"}
                      </button>
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      {account.added}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditForm(account)}
                          className="rounded-lg bg-white/5 p-2 text-gray-300 transition hover:bg-white/10 hover:text-[var(--color-gold)]"
                          aria-label={`Edit ${account.title}`}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(account.id)}
                          className="rounded-lg bg-white/5 p-2 text-gray-300 transition hover:bg-red-500/10 hover:text-red-400"
                          aria-label={`Delete ${account.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}

                {filteredAccounts.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-10 text-center text-sm italic text-gray-400"
                    >
                      No products match your current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
