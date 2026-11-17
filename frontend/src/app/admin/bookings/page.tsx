
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  RefreshCw,
  CalendarDays,
  Users,
  Clock,
  CheckCircle2,
  Eye,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  ChevronDown,
  Menu,
  Loader2,
  X,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { bookingService, type Booking } from "@/services/bookingService";

import "./Bookings.css";

const statusOptions = [
  "All",
  "Pending",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
];

export default function AdminBookingsPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [adminName, setAdminName] = useState("Administrator");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await bookingService.getAll();
      setBookings(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load bookings."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    const savedAdmin = sessionStorage.getItem("adminUser");

    if (!token || !savedAdmin) {
      router.replace("/admin/login");
      return;
    }

    try {
      const admin = JSON.parse(savedAdmin);
      setAdminName(admin.fullName || "Administrator");
      loadBookings();
    } catch {
      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminUser");
      router.replace("/admin/login");
    }
  }, [router, loadBookings]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    router.replace("/admin/login");
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const searchValue = search.toLowerCase().trim();

      const searchableValues = [
        booking.bookingReference,
        booking.fullName,
        booking.email,
        booking.phone,
        booking.pickup,
        booking.destination,
        booking.service,
      ];

      const matchesSearch =
        searchValue === "" ||
        searchableValues.some((value) =>
          value?.toLowerCase().includes(searchValue)
        );

      const matchesStatus =
        statusFilter === "All" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  const formatDate = (date: string) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("en-ZA", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status: string) => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className="admin-dashboard bookings-dashboard">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <main className="admin-dashboard-main">
        {/* TOPBAR */}

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
            <h1>Booking Management</h1>
          </div>

          <div className="admin-topbar-actions">
            <div className="admin-profile">
              <div className="admin-profile-avatar">
                {adminName.charAt(0).toUpperCase()}
              </div>

              <div className="admin-profile-info">
                <strong>{adminName}</strong>
                <span>Administrator</span>
              </div>

              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}

        <div className="admin-dashboard-content">
          {/* PAGE HEADING */}

          <div className="bookings-page-heading">
            <div>
              <button
                className="bookings-back-button"
                onClick={() => router.push("/admin/dashboard")}
              >
                <ArrowLeft size={16} />
                Dashboard Overview
              </button>

              <h2>Manage Customer Bookings</h2>

              <p>
                Review customer reservations, monitor upcoming journeys and
                keep track of booking requests.
              </p>
            </div>

            <button
              className="bookings-refresh-button"
              onClick={loadBookings}
              disabled={loading}
            >
              <RefreshCw
                size={16}
                className={loading ? "bookings-spin" : ""}
              />
              Refresh Bookings
            </button>
          </div>

          {/* NOTIFICATIONS */}

          {error && (
            <div className="bookings-message error">
              <AlertCircle size={18} />
              <span>{error}</span>

              <button onClick={loadBookings} disabled={loading}>
                Try Again
              </button>
            </div>
          )}

          {/* SUMMARY CARDS */}

          <section className="booking-stats">
            <div className="booking-stat-card">
              <div className="booking-stat-icon total">
                <CalendarDays size={21} />
              </div>

              <div>
                <span>Total Bookings</span>
                <h3>{bookings.length}</h3>
              </div>
            </div>

            <div className="booking-stat-card">
              <div className="booking-stat-icon pending">
                <Clock size={21} />
              </div>

              <div>
                <span>Pending</span>
                <h3>{pendingCount}</h3>
              </div>
            </div>

            <div className="booking-stat-card">
              <div className="booking-stat-icon confirmed">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <span>Confirmed</span>
                <h3>{confirmedCount}</h3>
              </div>
            </div>

            <div className="booking-stat-card">
              <div className="booking-stat-icon completed">
                <Users size={21} />
              </div>

              <div>
                <span>Completed</span>
                <h3>{completedCount}</h3>
              </div>
            </div>
          </section>

          {/* BOOKINGS PANEL */}

          <section className="admin-panel bookings-panel">
            <div className="admin-panel-heading bookings-panel-heading">
              <div>
                <h3>All Customer Bookings</h3>
                <p>
                  {filteredBookings.length} booking
                  {filteredBookings.length === 1 ? "" : "s"} found
                </p>
              </div>

              <div className="bookings-filters">
                <div className="bookings-search">
                  <Search size={17} />

                  <input
                    type="search"
                    placeholder="Search bookings..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  aria-label="Filter bookings by status"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === "All" ? "All Statuses" : status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOADING STATE */}

            {loading ? (
              <div className="bookings-empty-state">
                <Loader2 className="bookings-spin" size={28} />
                <strong>Loading customer bookings...</strong>
                <p>Retrieving booking records from the database.</p>
              </div>
            ) : !error && filteredBookings.length === 0 ? (
              /* EMPTY STATE */

              <div className="bookings-empty-state">
                <CalendarDays size={32} />

                <strong>No bookings found</strong>

                <p>
                  {bookings.length === 0
                    ? "Customer booking requests will appear here."
                    : "Try changing your search or status filter."}
                </p>
              </div>
            ) : !error ? (
              /* BOOKINGS TABLE */

              <div className="bookings-table-wrapper">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>BOOKING REFERENCE</th>
                      <th>CUSTOMER</th>
                      <th>JOURNEY</th>
                      <th>TRAVEL DATE</th>
                      <th>PASSENGERS</th>
                      <th>SERVICE</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>
                          <strong className="booking-reference">
                            {booking.bookingReference}
                          </strong>
                        </td>

                        <td>
                          <div className="booking-customer">
                            <strong>{booking.fullName}</strong>
                            <span>{booking.email}</span>
                          </div>
                        </td>

                        <td>
                          <div className="booking-journey">
                            <span>{booking.pickup}</span>
                            <span className="journey-arrow">↓</span>
                            <span>{booking.destination}</span>
                          </div>
                        </td>

                        <td>{formatDate(booking.travelDate)}</td>

                        <td>{booking.passengers}</td>

                        <td>{booking.service}</td>

                        <td>
                          <span
                            className={`booking-status ${getStatusClass(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </td>

                        <td>
                          <div className="booking-actions">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              title="View booking details"
                              aria-label={`View booking ${booking.bookingReference}`}
                            >
                              <Eye size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </section>

          {/* FOOTER */}

          <footer className="admin-dashboard-footer">
            <span>TWENDE JAMBINNO SHUTTLE</span>
            <span>Administration Portal</span>
          </footer>
        </div>
      </main>

      {/* BOOKING DETAILS MODAL */}

      {selectedBooking && (
        <div
          className="booking-modal-overlay"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="booking-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="booking-modal-header">
              <div>
                <span>BOOKING DETAILS</span>
                <h2>{selectedBooking.bookingReference}</h2>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                aria-label="Close booking details"
              >
                <X size={19} />
              </button>
            </div>

            <div className="booking-modal-body">
              <div className="booking-detail-section">
                <h3>Customer Information</h3>

                <p>
                  <strong>Name:</strong> {selectedBooking.fullName}
                </p>

                <p>
                  <strong>Email:</strong> {selectedBooking.email}
                </p>

                <p>
                  <strong>Phone:</strong> {selectedBooking.phone}
                </p>
              </div>

              <div className="booking-detail-section">
                <h3>Journey Information</h3>

                <p>
                  <strong>Pickup:</strong> {selectedBooking.pickup}
                </p>

                <p>
                  <strong>Destination:</strong> {selectedBooking.destination}
                </p>

                <p>
                  <strong>Travel Date:</strong>{" "}
                  {formatDate(selectedBooking.travelDate)}
                </p>

                <p>
                  <strong>Passengers:</strong> {selectedBooking.passengers}
                </p>

                <p>
                  <strong>Service:</strong> {selectedBooking.service}
                </p>
              </div>

              <div className="booking-detail-section">
                <h3>Additional Information</h3>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`booking-status ${getStatusClass(
                      selectedBooking.status
                    )}`}
                  >
                    {selectedBooking.status}
                  </span>
                </p>

                <p>
                  <strong>Special Requests:</strong>{" "}
                  {selectedBooking.specialRequests || "None"}
                </p>

                <p>
                  <strong>Submitted:</strong>{" "}
                  {formatDate(selectedBooking.createdAt)}
                </p>
              </div>
            </div>

            <div className="booking-modal-footer">
              <button onClick={() => setSelectedBooking(null)}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
