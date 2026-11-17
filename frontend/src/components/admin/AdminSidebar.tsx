"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Users,
  LogOut,
  X,
  Tags,
  CalendarDays,
  ShieldCheck,
  Mail,
} from "lucide-react";

import type { ElementType } from "react";
import Image from "next/image";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

interface NavigationItem {
  label: string;
  icon: ElementType;
  href: string;
  roles: string[];
}

const navigation: NavigationItem[] = [
  {
    label: "Dashboard Overview",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
    roles: ["Super Administrator", "Administrator", "Manager"],
  },
  {
    label: "Pricing Management",
    icon: Tags,
    href: "/admin/pricing",
    roles: ["Super Administrator", "Administrator"],
  },
  {
    label: "Destination Management",
    icon: MapPin,
    href: "/admin/destinations",
    roles: ["Super Administrator", "Administrator"],
  },
  {
    label: "Email Center",
    icon: Mail,
    href: "/admin/email",
    roles: ["Super Administrator", "Administrator", "Manager"],
  },
  {
    label: "Booking Management",
    icon: CalendarDays,
    href: "/admin/bookings",
    roles: ["Super Administrator", "Administrator", "Manager"],
  },
  {
    label: "Accounts",
    icon: Users,
    href: "/admin/accounts",
    roles: ["Super Administrator"],
  },
];

export default function AdminSidebar({
  sidebarOpen,
  onClose,
  onLogout,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const savedUser = sessionStorage.getItem("adminUser");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setUserRole(user.role || "");
      } catch {
        setUserRole("");
      }
    }
  }, []);

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(userRole),
  );

  return (
    <>
      {sidebarOpen && (
        <button
          className="admin-sidebar-overlay"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-brand">
          <div className="admin-brand-mark">
            <Image
              src="/images/jambinno-logo.png"
              alt="Jambinno Shuttles"
              width={100}
              height={100}
              priority
              style={{ objectFit: "contain" }}
            />
          </div>

          <button
            className="admin-sidebar-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <div className="admin-sidebar-label">BUSINESS MANAGEMENT</div>

        <nav className="admin-sidebar-nav">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`admin-nav-item ${active ? "active" : ""}`}
                onClick={onClose}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-security">
            <ShieldCheck size={18} />
            <div>
              <strong>Secure Access</strong>
              <span>{userRole || "Loading permissions..."}</span>
            </div>
          </div>

          <button className="admin-logout-button" onClick={onLogout}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
