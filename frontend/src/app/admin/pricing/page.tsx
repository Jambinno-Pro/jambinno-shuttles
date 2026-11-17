"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  RefreshCw,
  Edit3,
  Power,
  Loader2,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
  ChevronDown,
  Menu,
  SlidersHorizontal,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";

import {
  adminPricingService,
  type AdminDestination,
  type PriceRange,
} from "@/services/adminPricingService";

import "./Pricing.css";

export default function AdminPricingPage() {
  const router = useRouter();

  const [destinations, setDestinations] = useState<AdminDestination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [minimumPassengers, setMinimumPassengers] = useState("1");
  const [maximumPassengers, setMaximumPassengers] = useState("3");
  const [price, setPrice] = useState("");

  const [adminName, setAdminName] = useState("Administrator");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      loadDestinations();
    } catch {
      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminUser");
      router.replace("/admin/login");
    }
  }, [router]);

  const loadDestinations = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await adminPricingService.getDestinations();
      setDestinations(result);

      if (result.length > 0) {
        setSelectedDestination((current) => current ?? result[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load destinations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDestination !== null) {
      loadPriceRanges(selectedDestination);
    }
  }, [selectedDestination]);

  const loadPriceRanges = async (destinationId: number) => {
    setLoadingPrices(true);
    setError("");

    try {
      const result = await adminPricingService.getPriceRanges(destinationId);
      setPriceRanges(result.priceRanges);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load pricing.");
      setPriceRanges([]);
    } finally {
      setLoadingPrices(false);
    }
  };

  const resetForm = () => {
    setMinimumPassengers("1");
    setMaximumPassengers("3");
    setPrice("");
    setEditingId(null);
    setShowForm(false);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
    setSuccess("");
    setError("");
  };

  const openEditForm = (range: PriceRange) => {
    setEditingId(range.id);
    setMinimumPassengers(String(range.minimumPassengers));
    setMaximumPassengers(String(range.maximumPassengers));
    setPrice(String(range.price));
    setShowForm(true);
    setSuccess("");
    setError("");
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedDestination === null) return;

    const minimum = Number(minimumPassengers);
    const maximum = Number(maximumPassengers);
    const amount = Number(price);

    if (
      !Number.isInteger(minimum) ||
      !Number.isInteger(maximum) ||
      minimum < 1 ||
      maximum < minimum ||
      maximum > 22 ||
      !Number.isFinite(amount) ||
      amount < 0
    ) {
      setError("Enter a valid passenger range and price.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const data = {
      destinationId: selectedDestination,
      minimumPassengers: minimum,
      maximumPassengers: maximum,
      price: amount,
    };

    try {
      if (editingId !== null) {
        await adminPricingService.updatePriceRange(editingId, data);
        setSuccess("Price range updated successfully.");
      } else {
        await adminPricingService.createPriceRange(data);
        setSuccess("New price range added successfully.");
      }

      resetForm();
      await loadPriceRanges(selectedDestination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save price range.");
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (range: PriceRange) => {
    const action = range.isActive ? "deactivate" : "activate";

    if (!window.confirm(`Are you sure you want to ${action} this price range?`)) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const result = await adminPricingService.updatePriceRangeStatus(
        range.id,
        !range.isActive,
      );

      setSuccess(result.message);
      await loadPriceRanges(range.destinationId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update price range.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    router.replace("/admin/login");
  };

  const selected = destinations.find((d) => d.id === selectedDestination);

  return (
    <div className="admin-dashboard pricing-dashboard">
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
    <h1>Pricing Management</h1>
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

        <div className="admin-dashboard-content">
          <div className="pricing-page-heading">
            <div>
              <button
                className="pricing-back-button"
                onClick={() => router.push("/admin/dashboard")}
              >
                <ArrowLeft size={16} />
                Dashboard Overview
              </button>

              <h2>Manage Destination Pricing</h2>
              <p>
                Manage passenger price ranges and rates for your shuttle destinations.
                Changes are saved directly to your database.
              </p>
            </div>

            <button
              className="pricing-refresh-button"
              onClick={() => {
                loadDestinations();
                if (selectedDestination !== null) loadPriceRanges(selectedDestination);
              }}
              disabled={loading || loadingPrices}
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {error && (
            <div className="pricing-message error">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {success && (
            <div className="pricing-message success">
              <ShieldCheck size={18} />
              {success}
            </div>
          )}

          <section className="pricing-selection-panel">
            <div>
              <span className="pricing-field-label">SELECT DESTINATION</span>
              <h3>Choose a destination to manage its rates</h3>
            </div>

            {loading ? (
              <Loader2 className="pricing-loader" size={22} />
            ) : (
              <select
                value={selectedDestination ?? ""}
                onChange={(event) => {
                  resetForm();
                  setSuccess("");
                  setSelectedDestination(Number(event.target.value));
                }}
              >
                {destinations.map((destination) => (
                  <option key={destination.id} value={destination.id}>
                    {destination.name} {!destination.isActive ? "(Inactive)" : ""}
                  </option>
                ))}
              </select>
            )}
          </section>

          {selected && (
            <section className="pricing-destination-summary">
              <div>
                <span>SELECTED DESTINATION</span>
                <h3>{selected.name}</h3>
                <p>{selected.categoryName}</p>
              </div>

              <div className="pricing-summary-status">
                <span className={selected.isActive ? "active" : "inactive"}>
                  {selected.isActive ? "ACTIVE DESTINATION" : "INACTIVE DESTINATION"}
                </span>
              </div>
            </section>
          )}

          <section className="admin-panel pricing-table-panel">
            <div className="admin-panel-heading pricing-table-heading">
              <div>
                <h3>Passenger Price Ranges</h3>
                <p>Manage the prices charged for different group sizes.</p>
              </div>

              <button
                className="pricing-add-button"
                onClick={openAddForm}
                disabled={!selected || !selected.isActive}
              >
                <Plus size={17} />
                Add Price Range
              </button>
            </div>

            {showForm && (
              <form className="pricing-form" onSubmit={handleSave}>
                <div className="pricing-form-heading">
                  <div>
                    <h3>{editingId !== null ? "Edit Price Range" : "Add New Price Range"}</h3>
                    <p>{selected?.name}</p>
                  </div>
                </div>

                <div className="pricing-form-grid">
                  <label>
                    Minimum Passengers
                    <input
                      type="number"
                      min="1"
                      max="22"
                      value={minimumPassengers}
                      onChange={(event) => setMinimumPassengers(event.target.value)}
                      required
                    />
                  </label>

                  <label>
                    Maximum Passengers
                    <input
                      type="number"
                      min="1"
                      max="22"
                      value={maximumPassengers}
                      onChange={(event) => setMaximumPassengers(event.target.value)}
                      required
                    />
                  </label>

                  <label>
                    Price (ZAR)
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="e.g. 2500.00"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                      required
                    />
                  </label>
                </div>

                <div className="pricing-form-actions">
                  <button type="button" className="pricing-cancel-button" onClick={resetForm}>
                    Cancel
                  </button>

                  <button type="submit" className="pricing-save-button" disabled={saving}>
                    {saving ? <Loader2 className="pricing-spin" size={17} /> : null}
                    {saving ? "Saving..." : "Save Price Range"}
                  </button>
                </div>
              </form>
            )}

            {loadingPrices ? (
              <div className="pricing-empty-state">
                <Loader2 className="pricing-spin" size={27} />
                <strong>Loading passenger pricing...</strong>
                <p>Retrieving rates from SQL Server.</p>
              </div>
            ) : priceRanges.length === 0 ? (
              <div className="pricing-empty-state">
                <SlidersHorizontal size={30} />
                <strong>No price ranges found</strong>
                <p>Add a passenger range to start configuring rates for this destination.</p>
              </div>
            ) : (
              <div className="pricing-table-wrapper">
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th>PASSENGER RANGE</th>
                      <th>MINIMUM</th>
                      <th>MAXIMUM</th>
                      <th>PRICE</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {priceRanges.map((range) => (
                      <tr key={range.id}>
                        <td>
                          <strong>
                            {range.minimumPassengers}–{range.maximumPassengers} passengers
                          </strong>
                        </td>
                        <td>{range.minimumPassengers}</td>
                        <td>{range.maximumPassengers}</td>
                        <td className="pricing-amount">
                          {range.currency} {range.price.toLocaleString("en-ZA", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td>
                          <span className={`pricing-status ${range.isActive ? "active" : "inactive"}`}>
                            {range.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <div className="pricing-actions">
                            <button
                              title="Edit price range"
                              onClick={() => openEditForm(range)}
                            >
                              <Edit3 size={16} />
                            </button>

                            <button
                              title={range.isActive ? "Deactivate" : "Activate"}
                              onClick={() => toggleStatus(range)}
                              className={range.isActive ? "deactivate" : "activate"}
                            >
                              <Power size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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

