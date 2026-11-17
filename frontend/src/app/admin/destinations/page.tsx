
"use client";

import { useEffect, useMemo, useState } from "react";
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
  MapPin,
  Search,
  X,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";

import {
  destinationService,
  type Destination,
  type DestinationCategory,
  type DestinationRequest,
} from "@/services/destinationService";

import "./Destinations.css";

export default function AdminDestinationsPage() {
  const router = useRouter();

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [categories, setCategories] = useState<DestinationCategory[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [pricingCategoryId, setPricingCategoryId] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [isActive, setIsActive] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

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
      loadData();
    } catch {
      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminUser");
      router.replace("/admin/login");
    }
  }, [router]);

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [destinationResult, categoryResult] = await Promise.all([
        destinationService.getDestinations(),
        destinationService.getCategories(),
      ]);

      setDestinations(destinationResult);
      setCategories(categoryResult);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load destination information.",
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(search.toLowerCase()) ||
        destination.slug.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        String(destination.pricingCategoryId) === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && destination.isActive) ||
        (statusFilter === "inactive" && !destination.isActive);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [destinations, search, categoryFilter, statusFilter]);

  const activeCount = destinations.filter((d) => d.isActive).length;
  const inactiveCount = destinations.length - activeCount;

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const resetForm = () => {
    setPricingCategoryId("");
    setName("");
    setSlug("");
    setDescription("");
    setSortOrder("0");
    setIsActive(true);
    setEditingId(null);
    setShowForm(false);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const openEditForm = (destination: Destination) => {
    setEditingId(destination.id);
    setPricingCategoryId(String(destination.pricingCategoryId));
    setName(destination.name);
    setSlug(destination.slug);
    setDescription(destination.description || "");
    setSortOrder(String(destination.sortOrder));
    setIsActive(destination.isActive);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleNameChange = (value: string) => {
    setName(value);

    if (editingId === null) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!pricingCategoryId) {
      setError("Please select a pricing category.");
      return;
    }

    if (!name.trim() || !slug.trim()) {
      setError("Destination name and slug are required.");
      return;
    }

    const order = Number(sortOrder);

    if (!Number.isInteger(order) || order < 0) {
      setError("Display order must be a valid non-negative number.");
      return;
    }

    const data: DestinationRequest = {
      pricingCategoryId: Number(pricingCategoryId),
      name: name.trim(),
      slug: generateSlug(slug),
      description: description.trim(),
      sortOrder: order,
      isActive,
    };

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (editingId !== null) {
        await destinationService.updateDestination(editingId, data);
        setSuccess("Destination updated successfully.");
      } else {
        await destinationService.createDestination(data);
        setSuccess("New destination created successfully.");
      }

      resetForm();
      await loadData();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save destination.",
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (destination: Destination) => {
    const action = destination.isActive ? "deactivate" : "activate";

    if (
      !window.confirm(
        `Are you sure you want to ${action} ${destination.name}?`,
      )
    ) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const result = await destinationService.updateDestinationStatus(
        destination.id,
        !destination.isActive,
      );

      setSuccess(result.message);
      await loadData();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update destination status.",
      );
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    router.replace("/admin/login");
  };

  return (
    <div className="admin-dashboard destinations-dashboard">
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
            <h1>Destination Management</h1>
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
          <div className="destinations-page-heading">
            <div>
              <button
                className="destinations-back-button"
                onClick={() => router.push("/admin/dashboard")}
              >
                <ArrowLeft size={16} />
                Dashboard Overview
              </button>

              <h2>Manage Destinations</h2>

              <p>
                Add, edit and manage the destinations offered by Twende
                Jambinno Shuttle.
              </p>
            </div>

            <button
              className="destinations-refresh-button"
              onClick={loadData}
              disabled={loading}
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {error && (
            <div className="destinations-message error">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {success && (
            <div className="destinations-message success">
              <ShieldCheck size={18} />
              {success}
            </div>
          )}

          <section className="destinations-stats">
            <div className="destinations-stat-card">
              <div className="destinations-stat-icon">
                <MapPin size={21} />
              </div>
              <div>
                <span>TOTAL DESTINATIONS</span>
                <strong>{destinations.length}</strong>
              </div>
            </div>

            <div className="destinations-stat-card">
              <div className="destinations-stat-icon active-icon">
                <ShieldCheck size={21} />
              </div>
              <div>
                <span>ACTIVE DESTINATIONS</span>
                <strong>{activeCount}</strong>
              </div>
            </div>

            <div className="destinations-stat-card">
              <div className="destinations-stat-icon inactive-icon">
                <Power size={21} />
              </div>
              <div>
                <span>INACTIVE DESTINATIONS</span>
                <strong>{inactiveCount}</strong>
              </div>
            </div>
          </section>

          <section className="admin-panel destinations-table-panel">
            <div className="destinations-panel-heading">
              <div>
                <h3>All Destinations</h3>
                <p>Manage your shuttle service destinations.</p>
              </div>

              <button
                className="destinations-add-button"
                onClick={openAddForm}
                disabled={categories.length === 0}
              >
                <Plus size={17} />
                Add Destination
              </button>
            </div>

            {showForm && (
              <form className="destinations-form" onSubmit={handleSave}>
                <div className="destinations-form-heading">
                  <div>
                    <h3>
                      {editingId !== null
                        ? "Edit Destination"
                        : "Add New Destination"}
                    </h3>
                    <p>Enter the destination information below.</p>
                  </div>

                  <button
                    type="button"
                    className="destinations-close-button"
                    onClick={resetForm}
                    aria-label="Close form"
                  >
                    <X size={19} />
                  </button>
                </div>

                <div className="destinations-form-grid">
                  <label>
                    Destination Name
                    <input
                      type="text"
                      placeholder="e.g. Cape Town International Airport"
                      value={name}
                      onChange={(event) =>
                        handleNameChange(event.target.value)
                      }
                      required
                    />
                  </label>

                  <label>
                    URL Slug
                    <input
                      type="text"
                      placeholder="cape-town-international-airport"
                      value={slug}
                      onChange={(event) => setSlug(event.target.value)}
                      required
                    />
                  </label>

                  <label>
                    Pricing Category
                    <select
                      value={pricingCategoryId}
                      onChange={(event) =>
                        setPricingCategoryId(event.target.value)
                      }
                      required
                    >
                      <option value="">Select a category</option>

                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                          {!category.isActive ? " (Inactive)" : ""}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Display Order
                    <input
                      type="number"
                      min="0"
                      value={sortOrder}
                      onChange={(event) => setSortOrder(event.target.value)}
                      required
                    />
                  </label>

                  <label className="destinations-full-width">
                    Description
                    <textarea
                      rows={4}
                      placeholder="Describe this destination..."
                      value={description}
                      onChange={(event) =>
                        setDescription(event.target.value)
                      }
                    />
                  </label>

                  <label className="destinations-checkbox">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(event) => setIsActive(event.target.checked)}
                    />
                    Destination is active and available
                  </label>
                </div>

                <div className="destinations-form-actions">
                  <button
                    type="button"
                    className="destinations-cancel-button"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="destinations-save-button"
                    disabled={saving}
                  >
                    {saving && (
                      <Loader2 className="destinations-spin" size={17} />
                    )}
                    {saving
                      ? "Saving..."
                      : editingId !== null
                        ? "Update Destination"
                        : "Save Destination"}
                  </button>
                </div>
              </form>
            )}

            <div className="destinations-filters">
              <div className="destinations-search">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {loading ? (
              <div className="destinations-empty-state">
                <Loader2 className="destinations-spin" size={28} />
                <strong>Loading destinations...</strong>
                <p>Retrieving destination records from SQL Server.</p>
              </div>
            ) : filteredDestinations.length === 0 ? (
              <div className="destinations-empty-state">
                <MapPin size={30} />
                <strong>No destinations found</strong>
                <p>
                  Try changing your filters or add a new destination.
                </p>
              </div>
            ) : (
              <div className="destinations-table-wrapper">
                <table className="destinations-table">
                  <thead>
                    <tr>
                      <th>DESTINATION</th>
                      <th>PRICING CATEGORY</th>
                      <th>URL SLUG</th>
                      <th>ORDER</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredDestinations.map((destination) => (
                      <tr key={destination.id}>
                        <td>
                          <strong>{destination.name}</strong>
                          {destination.description && (
                            <span className="destinations-description">
                              {destination.description}
                            </span>
                          )}
                        </td>

                        <td>{destination.categoryName}</td>

                        <td>
                          <code>{destination.slug}</code>
                        </td>

                        <td>{destination.sortOrder}</td>

                        <td>
                          <span
                            className={`destinations-status ${
                              destination.isActive ? "active" : "inactive"
                            }`}
                          >
                            {destination.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td>
                          <div className="destinations-actions">
                            <button
                              title="Edit destination"
                              onClick={() => openEditForm(destination)}
                            >
                              <Edit3 size={16} />
                            </button>

                            <button
                              title={
                                destination.isActive
                                  ? "Deactivate destination"
                                  : "Activate destination"
                              }
                              onClick={() => toggleStatus(destination)}
                              className={
                                destination.isActive
                                  ? "deactivate"
                                  : "activate"
                              }
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
