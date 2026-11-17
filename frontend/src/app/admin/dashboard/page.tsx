"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Loader2,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  Menu,
  Tags,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";

import {
  dashboardService,
  type DashboardOverview,
} from "@/services/dashboardService";
import AdminSidebar from "@/components/admin/AdminSidebar";


import "./Dashboard.css";

interface AdminUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
}



export default function AdminDashboardPage() {
  const router = useRouter();

  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    const savedAdmin = sessionStorage.getItem("adminUser");

    if (!token || !savedAdmin) {
      router.replace("/admin/login");
      return;
    }

    try {
      setAdmin(JSON.parse(savedAdmin) as AdminUser);
      setReady(true);
    } catch {
      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminUser");
      router.replace("/admin/login");
    }
  }, [router]);

  useEffect(() => {
    if (!ready) return;

    loadOverview();
  }, [ready]);

  const loadOverview = async () => {
    setLoadingData(true);
    setDataError("");

    try {
      const result = await dashboardService.getOverview();
      setOverview(result);
    } catch (error) {
      setDataError(
        error instanceof Error
          ? error.message
          : "Unable to load dashboard information.",
      );
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    router.replace("/admin/login");
  };



  if (!ready || !admin) {
    return <div className="admin-dashboard-loading">Loading dashboard...</div>;
  }

  return (
   <div className="admin-dashboard">
  <AdminSidebar
    sidebarOpen={sidebarOpen}
    onClose={() => setSidebarOpen(false)}
    onLogout={handleLogout}
  />

      <main className="admin-dashboard-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <div className="admin-topbar-title">
            <span>BUSINESS ADMINISTRATION</span>
            <h1>Dashboard Overview</h1>
          </div>

          <div className="admin-topbar-actions">
            <button
              className="admin-notification-button"
              aria-label="Notifications"
            >
              <Bell size={19} />
            </button>

            <div className="admin-profile">
              <div className="admin-profile-avatar">
                {admin.fullName.charAt(0).toUpperCase()}
              </div>

              <div className="admin-profile-info">
                <strong>{admin.fullName}</strong>
                <span>{admin.role}</span>
              </div>

              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <div className="admin-dashboard-content">
          <div className="admin-welcome">
            <div>
              <h2>Welcome back, {admin.fullName.split(" ")[0]}!</h2>
              <p>
                Here's an overview of your destinations and pricing operations.
              </p>
            </div>

            <div className="admin-date-label">
              <ShieldCheck size={16} />
              Administrator Panel
            </div>
          </div>

          {dataError && (
            <div className="admin-dashboard-error">
              <AlertCircle size={19} />
              <span>{dataError}</span>
              <button onClick={loadOverview}>
                <RefreshCw size={15} />
                Retry
              </button>
            </div>
          )}

          <section className="admin-stats-grid">
            <article className="admin-stat-card">
              <div className="admin-stat-top">
                <span>Pricing Categories</span>
                <div className="admin-stat-icon blue">
                  <Tags size={20} />
                </div>
              </div>

              <strong>
                {loadingData ? (
                  <Loader2 className="admin-spin" size={22} />
                ) : (
                  (overview?.categories.total ?? "—")
                )}
              </strong>

              <small>
                {overview
                  ? `${overview.categories.active} active categories`
                  : "Categories in your database"}
              </small>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-top">
                <span>Destinations</span>
                <div className="admin-stat-icon orange">
                  <MapPin size={20} />
                </div>
              </div>

              <strong>
                {loadingData ? (
                  <Loader2 className="admin-spin" size={22} />
                ) : (
                  (overview?.destinations.total ?? "—")
                )}
              </strong>

              <small>
                {overview
                  ? `${overview.destinations.active} active · ${overview.destinations.inactive} inactive`
                  : "Destinations in your database"}
              </small>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-top">
                <span>Passenger Price Ranges</span>
                <div className="admin-stat-icon yellow">
                  <SlidersHorizontal size={20} />
                </div>
              </div>

              <strong>
                {loadingData ? (
                  <Loader2 className="admin-spin" size={22} />
                ) : (
                  (overview?.passengerPricing.total ?? "—")
                )}
              </strong>

              <small>
                {overview
                  ? `${overview.passengerPricing.active} active · ${overview.passengerPricing.inactive} inactive`
                  : "Pricing records in your database"}
              </small>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-top">
                <span>Administrators</span>
                <div className="admin-stat-icon green">
                  <ShieldCheck size={20} />
                </div>
              </div>

              <strong>
                {loadingData ? (
                  <Loader2 className="admin-spin" size={22} />
                ) : (
                  (overview?.administrators.total ?? "—")
                )}
              </strong>

              <small>Registered administrator accounts</small>
            </article>
          </section>

          <section className="admin-dashboard-panels">
            <article className="admin-panel admin-activity-panel">
              <div className="admin-panel-heading">
                <div>
                  <h3>Pricing & Destination Overview</h3>
                  <p>Current status of your shuttle pricing database</p>
                </div>

                <span className="admin-panel-tag">
                  {loadingData ? "LOADING" : dataError ? "ERROR" : "DATABASE"}
                </span>
              </div>

              {loadingData ? (
                <div className="admin-empty-state">
                  <Loader2 className="admin-spin" size={26} />
                  <strong>Loading business information...</strong>
                  <p>Retrieving records from your database.</p>
                </div>
              ) : overview ? (
                <div className="admin-overview-status">
                  <div className="admin-overview-status-row">
                    <div className="admin-overview-status-icon">
                      <CheckCircle2 size={19} />
                    </div>
                    <div>
                      <strong>Pricing database connected</strong>
                      <p>
                        Your dashboard is retrieving live SQL Server records.
                      </p>
                    </div>
                  </div>

                  <div className="admin-overview-status-row">
                    <div className="admin-overview-status-icon">
                      <MapPin size={19} />
                    </div>
                    <div>
                      <strong>
                        {overview.destinations.active} active destinations
                      </strong>
                      <p>
                        {overview.destinations.inactive} inactive destinations
                        are currently excluded from public pricing.
                      </p>
                    </div>
                  </div>

                  <div className="admin-overview-status-row">
                    <div className="admin-overview-status-icon">
                      <SlidersHorizontal size={19} />
                    </div>
                    <div>
                      <strong>
                        {overview.passengerPricing.active} active price ranges
                      </strong>
                      <p>
                        {overview.passengerPricing.inactive} inactive price
                        ranges are currently excluded from public pricing.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="admin-empty-state">
                  <AlertCircle size={25} />
                  <strong>Business information unavailable</strong>
                  <p>Try refreshing the dashboard.</p>
                </div>
              )}

              <button
                className="admin-dashboard-refresh"
                onClick={loadOverview}
                disabled={loadingData}
              >
                <RefreshCw size={15} />
                Refresh dashboard data
              </button>
            </article>

            <article className="admin-panel admin-account-panel">
              <div className="admin-panel-heading">
                <div>
                  <h3>Administrator Account</h3>
                  <p>Your account information</p>
                </div>
              </div>

              <div className="admin-account-details">
                <div className="admin-account-avatar">
                  {admin.fullName.charAt(0).toUpperCase()}
                </div>

                <strong>{admin.fullName}</strong>
                <span>{admin.email}</span>

                <span className="admin-account-role">
                  <ShieldCheck size={14} />
                  {admin.role}
                </span>
              </div>
            </article>
          </section>

          <footer className="admin-dashboard-footer">
            <span>TWENDE JAMBINNO SHUTTLE</span>
            <span>Administration Portal</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
