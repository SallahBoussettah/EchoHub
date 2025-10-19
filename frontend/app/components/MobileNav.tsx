"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "./Sidebar";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-[var(--color-line)] z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[64px] ${
                isActive
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-muted-ink)]"
              }`}
            >
              <item.icon
                className={`w-6 h-6 ${
                  isActive ? "scale-110" : "scale-100"
                } transition-transform`}
              />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
