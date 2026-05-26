"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Users, ShoppingCart, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [accounts, setAccounts] = useState([
    { id: 1, title: "Epic Big Time Squad", status: "Active", added: "2026-05-20" },
    { id: 2, title: "Showtime Legends Pack", status: "Active", added: "2026-05-22" },
    { id: 3, title: "Starter Pro Edition", status: "Sold", added: "2026-05-25" },
  ]);

  const handleDelete = (id: number) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
  };

  return (
    <div className="w-full bg-[#000B33] min-h-[90vh] py-12">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-white uppercase italic tracking-wider">
              ADMIN <span className="text-[var(--color-gold)]">DASHBOARD</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">Manage your KMoney Store inventory and settings here.</p>
          </div>
          
          <button 
            onClick={() => {
              const title = prompt("Enter account title:");
              if (title) {
                const newId = accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1;
                setAccounts([{ id: newId, title, status: "Active", added: new Date().toISOString().split("T")[0] }, ...accounts]);
              }
            }}
            className="px-6 py-3 bg-[var(--color-gold)] hover:bg-[var(--color-gold-hover)] text-[#000F4D] font-bold rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(251,239,11,0.2)]">
            <Plus className="w-5 h-5" /> Add New Account
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#001A88] p-6 rounded-2xl border border-[var(--color-gold)]/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-gold)]">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Total Listings</p>
              <p className="text-2xl font-black text-white">{accounts.length}</p>
            </div>
          </div>
          <div className="bg-[#001A88] p-6 rounded-2xl border border-[var(--color-gold)]/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Active Status</p>
              <p className="text-2xl font-black text-white">{accounts.filter(a => a.status === "Active").length}</p>
            </div>
          </div>
          <div className="bg-[#001A88] p-6 rounded-2xl border border-[var(--color-gold)]/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Admins</p>
              <p className="text-2xl font-black text-white">1</p>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#001A88] rounded-2xl border border-[var(--color-gold)]/10 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-[var(--color-gold)]/10 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Current Inventory</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#000F4D]/50">
                  <th className="p-4 text-xs tracking-wider uppercase text-gray-400 font-bold border-b border-[var(--color-gold)]/10">ID</th>
                  <th className="p-4 text-xs tracking-wider uppercase text-gray-400 font-bold border-b border-[var(--color-gold)]/10">Title</th>
                  <th className="p-4 text-xs tracking-wider uppercase text-gray-400 font-bold border-b border-[var(--color-gold)]/10">Status</th>
                  <th className="p-4 text-xs tracking-wider uppercase text-gray-400 font-bold border-b border-[var(--color-gold)]/10">Date Added</th>
                  <th className="p-4 text-xs tracking-wider uppercase text-gray-400 font-bold border-b border-[var(--color-gold)]/10 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((acc, index) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    key={acc.id} 
                    className="hover:bg-[#0022AA]/50 transition-colors border-b border-white/5 last:border-0"
                  >
                    <td className="p-4 text-white text-sm">#{acc.id}</td>
                    <td className="p-4 text-white font-semibold">{acc.title}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${acc.status === "Active" ? "bg-[#25D366]/20 text-[#25D366]" : "bg-gray-500/20 text-gray-400"}`}>
                        {acc.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 text-sm">{acc.added}</td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-[var(--color-gold)] bg-white/5 hover:bg-white/10 rounded transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(acc.id)}
                        className="p-2 text-gray-400 hover:text-red-500 bg-white/5 hover:bg-red-500/10 rounded transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
                
                {accounts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400 italic">
                      No accounts found. Start by adding one!
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
