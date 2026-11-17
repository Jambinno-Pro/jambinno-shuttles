"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  RefreshCw,
  Edit3,
  Power,
  ArrowLeft,
  ShieldCheck,
  ChevronDown,
  Menu,
  Users,
  Search,
  X,
  Loader2,
  AlertCircle,
  Mail,
  UserRound,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  adminAccountsService,
  type AdminAccount,
} from "@/services/adminAccountsService";

import "./Accounts.css";

export default function AdminAccountsPage() {
  const router = useRouter();

  const [accounts, setAccounts] = useState<AdminAccount[]>([]);

  const [adminName, setAdminName] = useState("Administrator");
  const [adminRole, setAdminRole] = useState("Super Administrator");
  const [token, setToken] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Administrator");

  // Load accounts from the backend.
  const loadAccounts = useCallback(async (authToken: string) => {
    setLoading(true);
    setError("");

    try {
      const data = await adminAccountsService.getAccounts(authToken);
      setAccounts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load accounts.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Verify the administrator session.
  useEffect(() => {
    const savedToken = sessionStorage.getItem("adminToken");
    const savedAdmin = sessionStorage.getItem("adminUser");

    if (!savedToken || !savedAdmin) {
      router.replace("/admin/login");
      return;
    }

    try {
      const admin = JSON.parse(savedAdmin);

      setAdminName(admin.fullName || "Administrator");
      setAdminRole(admin.role || "Administrator");
      setToken(savedToken);
    } catch {
      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminUser");
      router.replace("/admin/login");
    }
  }, [router]);

  // Fetch accounts after authentication is available.
  useEffect(() => {
    if (token) {
      loadAccounts(token);
    }
  }, [token, loadAccounts]);

  const activeAccounts = accounts.filter((account) => account.isActive).length;

  const inactiveAccounts = accounts.length - activeAccounts;

  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        account.fullName.toLowerCase().includes(search) ||
        account.email.toLowerCase().includes(search) ||
        account.role.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && account.isActive) ||
        (statusFilter === "inactive" && !account.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [accounts, searchTerm, statusFilter]);

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setRole("Administrator");
    setEditingId(null);
    setShowForm(false);
  };

  const openAddForm = () => {
    resetForm();
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const openEditForm = (account: AdminAccount) => {
    setEditingId(account.id);
    setFullName(account.fullName);
    setEmail(account.email);
    setPassword("");
    setRole(account.role);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // Create or update an account.
  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail) {
      setError("Please complete all required fields.");
      return;
    }

    if (editingId === null && password.length < 12) {
      setError("Password must contain at least 12 characters.");
      return;
    }

    if (!token) {
      setError("Your session has expired. Please sign in again.");
      return;
    }

    setSaving(true);

    try {
      if (editingId !== null) {
        await adminAccountsService.updateAccount(token, editingId, {
          fullName: cleanName,
          email: cleanEmail,
          role,
        });

        setSuccess("Account updated successfully.");
      } else {
        await adminAccountsService.createAccount(token, {
          fullName: cleanName,
          email: cleanEmail,
          password,
          role,
        });

        setSuccess("Account created successfully.");
      }

      resetForm();
      await loadAccounts(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save account.");
    } finally {
      setSaving(false);
    }
  };

  // Activate or deactivate an account.
  const toggleStatus = async (account: AdminAccount) => {
    const action = account.isActive ? "deactivate" : "activate";

    if (
      !window.confirm(
        `Are you sure you want to ${action} ${account.fullName}'s account?`,
      )
    ) {
      return;
    }

    if (!token) {
      setError("Your session has expired. Please sign in again.");
      return;
    }

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const result = await adminAccountsService.updateAccountStatus(
        token,
        account.id,
        !account.isActive,
      );

      setSuccess(result.message || "Account saved successfully.");
      await loadAccounts(token);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update account status.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    router.replace("/admin/login");
  };

  const refreshAccounts = async () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSuccess("");
    setError("");

    if (token) {
      await loadAccounts(token);
    }
  };

  return (
    <div className="admin-dashboard accounts-dashboard">
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
            <h1>Accounts Management</h1>
          </div>

          <div className="admin-topbar-actions">
            <div className="admin-profile">
              <div className="admin-profile-avatar">
                {adminName.charAt(0).toUpperCase()}
              </div>

              <div className="admin-profile-info">
                <strong>{adminName}</strong>
                <span>{adminRole}</span>
              </div>

              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <div className="admin-dashboard-content">
          <div className="accounts-page-heading">
            <div>
              <button
                className="accounts-back-button"
                onClick={() => router.push("/admin/dashboard")}
              >
                <ArrowLeft size={16} />
                Dashboard Overview
              </button>

              <h2>Manage Administrator Accounts</h2>

              <p>
                Create, update and manage access to the Jambinno Shuttles
                administration portal.
              </p>
            </div>

            <button
              className="accounts-refresh-button"
              onClick={refreshAccounts}
              disabled={loading}
            >
              <RefreshCw size={16} className={loading ? "accounts-spin" : ""} />
              Refresh
            </button>
          </div>

          {error && (
            <div className="accounts-message error">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {success && (
            <div className="accounts-message success">
              <ShieldCheck size={18} />
              {success}
            </div>
          )}

          <section className="accounts-stats-grid">
            <div className="accounts-stat-card">
              <div className="accounts-stat-icon total">
                <Users size={22} />
              </div>
              <div>
                <span>TOTAL ACCOUNTS</span>
                <h3>{accounts.length}</h3>
                <p>Registered administrators</p>
              </div>
            </div>

            <div className="accounts-stat-card">
              <div className="accounts-stat-icon active">
                <ShieldCheck size={22} />
              </div>
              <div>
                <span>ACTIVE ACCOUNTS</span>
                <h3>{activeAccounts}</h3>
                <p>Currently active</p>
              </div>
            </div>

            <div className="accounts-stat-card">
              <div className="accounts-stat-icon inactive">
                <Power size={22} />
              </div>
              <div>
                <span>INACTIVE ACCOUNTS</span>
                <h3>{inactiveAccounts}</h3>
                <p>Access deactivated</p>
              </div>
            </div>
          </section>

          <section className="admin-panel accounts-table-panel">
            <div className="accounts-table-heading">
              <div>
                <h3>Administrator Accounts</h3>
                <p>Manage the people who have access to the admin portal.</p>
              </div>

              <button className="accounts-add-button" onClick={openAddForm}>
                <Plus size={17} />
                Add Account
              </button>
            </div>

            <div className="accounts-toolbar">
              <div className="accounts-search">
                <Search size={18} />

                <input
                  type="search"
                  placeholder="Search name, email or role..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter accounts by status"
              >
                <option value="all">All Accounts</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {loading ? (
              <div className="accounts-empty-state">
                <Loader2 className="accounts-spin" size={27} />
                <strong>Loading accounts...</strong>
              </div>
            ) : filteredAccounts.length === 0 ? (
              <div className="accounts-empty-state">
                <Users size={32} />
                <strong>No accounts found</strong>
                <p>Try another search or add a new administrator account.</p>
              </div>
            ) : (
              <div className="accounts-table-wrapper">
                <table className="accounts-table">
                  <thead>
                    <tr>
                      <th>ADMINISTRATOR</th>
                      <th>EMAIL ADDRESS</th>
                      <th>ROLE</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredAccounts.map((account) => (
                      <tr key={account.id}>
                        <td>
                          <div className="accounts-user-cell">
                            <div className="accounts-user-avatar">
                              {account.fullName.charAt(0).toUpperCase()}
                            </div>
                            <strong>{account.fullName}</strong>
                          </div>
                        </td>

                        <td>
                          <span className="accounts-email-cell">
                            <Mail size={15} />
                            {account.email}
                          </span>
                        </td>

                        <td>
                          <span className="accounts-role">
                            <UserRound size={14} />
                            {account.role}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`accounts-status ${
                              account.isActive ? "active" : "inactive"
                            }`}
                          >
                            {account.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td>
                          <div className="accounts-actions">
                            <button
                              title="Edit account"
                              onClick={() => openEditForm(account)}
                              disabled={saving}
                            >
                              <Edit3 size={16} />
                            </button>

                            <button
                              title={
                                account.isActive ? "Deactivate" : "Activate"
                              }
                              onClick={() => toggleStatus(account)}
                              className={
                                account.isActive ? "deactivate" : "activate"
                              }
                              disabled={saving}
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

          {showForm && (
            <div
              className="accounts-modal-overlay"
              onClick={(event) => {
                if (event.target === event.currentTarget && !saving) {
                  resetForm();
                }
              }}
            >
              <form className="accounts-modal" onSubmit={handleSave}>
                <div className="accounts-modal-heading">
                  <div>
                    <span>ADMINISTRATION</span>

                    <h3>
                      {editingId !== null ? "Edit Account" : "Add New Account"}
                    </h3>

                    <p>Enter the administrator's account information below.</p>
                  </div>

                  <button
                    type="button"
                    onClick={resetForm}
                    aria-label="Close form"
                    disabled={saving}
                  >
                    <X size={21} />
                  </button>
                </div>

                <label>
                  Full Name
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    required
                  />
                </label>

                <label>
                  Email Address
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </label>

                {editingId === null && (
                  <label>
                    Initial Password
                    <input
                      type="password"
                      placeholder="Minimum 12 characters"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      minLength={12}
                      autoComplete="new-password"
                      required
                    />
                  </label>
                )}

                <label>
                  Account Role
                  <select
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <option value="Administrator">Administrator</option>
                    <option value="Manager">Manager</option>
                    <option value="Super Administrator">
                      Super Administrator
                    </option>
                  </select>
                </label>

                <div className="accounts-modal-note">
                  <ShieldCheck size={17} />
                  {editingId === null
                    ? "The initial password will be securely hashed before being stored."
                    : "Account changes will be saved directly to the database."}
                </div>

                <div className="accounts-modal-actions">
                  <button
                    type="button"
                    className="accounts-cancel-button"
                    onClick={resetForm}
                    disabled={saving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="accounts-save-button"
                    disabled={saving}
                  >
                    {saving ? (
                      <Loader2 className="accounts-spin" size={17} />
                    ) : (
                      <Plus size={17} />
                    )}

                    {saving
                      ? "Saving..."
                      : editingId !== null
                        ? "Update Account"
                        : "Add Account"}
                  </button>
                </div>
              </form>
            </div>
          )}

          <footer className="admin-dashboard-footer">
            <span>TWENDE JAMBINNO SHUTTLE</span>
            <span>Administration Portal</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
