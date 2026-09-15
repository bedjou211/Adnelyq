"use client";

import {
  BarChart3,
  Bell,
  Bot,
  Boxes,
  ChevronDown,
  FileImage,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  PackageCheck,
  Settings,
  ShoppingBag,
  Store,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";

import { createClient } from "../lib/supabase/client";

const navItems = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/orders", "Commandes", ShoppingBag],
  ["/products", "Produits", Boxes],
  ["/store", "Boutique", Store],
  ["/ads", "Publicités", Megaphone],
  ["/analytics", "Analytics", BarChart3],
  ["/ai", "AI Action Center", Bot],
  ["/creatives", "Créatifs", FileImage],
  ["/social", "Social", PackageCheck],
  ["/settings", "Paramètres", Settings]
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  async function signOut() {
    const supabase = createClient();
    await supabase?.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const sidebar = (
    <aside className="flex h-full w-[260px] flex-col border-r border-white/10 bg-ink px-4 py-5 text-white">
      <div className="flex items-center justify-between px-2">
        <Link href="/dashboard" className="flex items-center gap-3 font-bold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-lime text-sm text-ink">A</span>Adnelyq</Link>
        <button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Fermer le menu"><X size={20} /></button>
      </div>
      <button className="mt-7 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[.06] px-3 py-3 text-left">
        <span><span className="block text-[10px] uppercase tracking-[.14em] text-white/45">Boutique active</span><span className="mt-1 block text-sm font-semibold">Atlas Belt</span></span><ChevronDown size={16} className="text-white/50" />
      </button>
      <nav className="mt-6 flex-1 space-y-1">
        {navItems.map(([href, label, Icon]) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? "bg-white text-ink" : "text-white/65 hover:bg-white/[.06] hover:text-white"}`}><Icon size={18} strokeWidth={1.8} />{label}</Link>;
        })}
      </nav>
      <div className="rounded-xl border border-white/10 p-3"><p className="text-xs font-semibold">Plan Starter</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[38%] rounded-full bg-lime" /></div><p className="mt-2 text-[11px] text-white/45">11 / 30 rapports IA</p></div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-canvas lg:grid lg:grid-cols-[260px_1fr]">
      <div className="hidden lg:block">{sidebar}</div>
      {mobileOpen && <div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} aria-label="Fermer le menu" /> <div className="relative h-full w-[280px]">{sidebar}</div></div>}
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-line bg-white/90 px-5 backdrop-blur md:px-8">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu"><Menu size={22} /></button>
          <div className="hidden lg:block"><p className="text-xs text-muted">Espace marchand</p><p className="text-sm font-semibold">Atlas Company</p></div>
          <div className="ml-auto flex items-center gap-3"><button className="relative grid h-10 w-10 place-items-center rounded-xl border border-line bg-white" aria-label="Notifications"><Bell size={18} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" /></button><div className="relative"><button onClick={() => setUserMenuOpen((open) => !open)} className="flex items-center gap-2 rounded-xl border border-line bg-white p-1.5 pr-3" aria-expanded={userMenuOpen}><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#DDEAE3] text-xs font-bold text-brand">CB</span><span className="hidden text-sm font-semibold sm:block">Celina</span><ChevronDown size={14} className="text-muted" /></button>{userMenuOpen && <div className="absolute right-0 mt-2 w-52 rounded-xl border border-line bg-white p-2 shadow-card"><button onClick={() => void signOut()} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-700 hover:bg-red-50"><LogOut size={16} /> Se déconnecter</button></div>}</div></div>
        </header>
        <main className="mx-auto max-w-[1500px] p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
