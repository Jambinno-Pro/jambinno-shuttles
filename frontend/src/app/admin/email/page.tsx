"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  ArrowLeft,
  ArrowUpRight,
  File,
  Inbox,
  Mail,
  MailOpen,
  Paperclip,
  Plus,
  RefreshCw,
  Search,
  Send,
  SendHorizonal,
  Star,
  Trash2,
  X,
  Menu,
  ChevronDown,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import "./EmailCenter.css";

type Folder = "Inbox" | "Sent" | "Drafts" | "Starred" | "Archive";
type EmailMessage = {
  id: number;
  from: string;
  email: string;
  to: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  folder: Folder;
  unread?: boolean;
  starred?: boolean;
  attachment?: string;
};

const initialMessages: EmailMessage[] = [
  {
    id: 1,
    from: "Thandi Moyo",
    email: "thandi.moyo@example.com",
    to: "booking@jambinnoshuttles.com",
    subject: "Airport transfer enquiry",
    preview: "Good afternoon, I would like to enquire about an airport transfer...",
    body: "Good afternoon,\n\nI would like to enquire about an airport transfer from Cape Town International Airport to Stellenbosch on 24 November. There will be two passengers with luggage.\n\nCould you please let me know your availability and pricing?\n\nKind regards,\nThandi",
    date: "10:42",
    folder: "Inbox",
    unread: true,
    starred: true,
  },
  {
    id: 2,
    from: "Michael Dube",
    email: "michael.dube@example.com",
    to: "info@jambinnoshuttles.com",
    subject: "Private wine tour",
    preview: "We are visiting Cape Town next month and are interested in...",
    body: "Hello Jambinno team,\n\nWe are visiting Cape Town next month and are interested in arranging a private wine tour for four people. Please share the available packages.\n\nThank you,\nMichael",
    date: "Yesterday",
    folder: "Inbox",
    unread: true,
  },
  {
    id: 3,
    from: "Jambinno Shuttles",
    email: "booking@jambinnoshuttles.com",
    to: "sarah@example.com",
    subject: "Your shuttle booking enquiry",
    preview: "Thank you for contacting Jambinno Shuttles. We have received...",
    body: "Dear Sarah,\n\nThank you for contacting Jambinno Shuttles. We have received your booking enquiry and our team will be in touch shortly.\n\nKind regards,\nJambinno Shuttles",
    date: "Yesterday",
    folder: "Sent",
  },
  {
    id: 4,
    from: "Sipho Ndlovu",
    email: "sipho.ndlovu@example.com",
    to: "booking@jambinnoshuttles.com",
    subject: "Group transport quotation",
    preview: "Please find attached the itinerary for our group trip...",
    body: "Good day,\n\nPlease find attached the itinerary for our group trip. We would appreciate a quotation for transport for 12 passengers.\n\nRegards,\nSipho",
    date: "12 Nov",
    folder: "Inbox",
    attachment: "Group itinerary.pdf",
  },
];

const folders: { label: Folder; icon: typeof Inbox }[] = [
  { label: "Inbox", icon: Inbox },
  { label: "Sent", icon: Send },
  { label: "Drafts", icon: File },
  { label: "Starred", icon: Star },
  { label: "Archive", icon: Archive },
];

export default function EmailCenterPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState<Folder>("Inbox");
  const [messages, setMessages] = useState<EmailMessage[]>(initialMessages);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [search, setSearch] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [notice, setNotice] = useState("Demo mode — connect your business mailbox to send and receive real emails.");

  const visibleMessages = useMemo(() => {
    const term = search.trim().toLowerCase();
    return messages.filter((message) => {
      const inFolder =
        activeFolder === "Starred"
          ? message.starred
          : message.folder === activeFolder;
      const matches =
        !term ||
        [message.from, message.email, message.to, message.subject, message.preview]
          .some((value) => value.toLowerCase().includes(term));
      return inFolder && matches;
    });
  }, [messages, activeFolder, search]);

  const selectedMessage = messages.find((message) => message.id === selectedId) ?? null;
  const unreadCount = messages.filter((message) => message.folder === "Inbox" && message.unread).length;

  function selectFolder(folder: Folder) {
    setActiveFolder(folder);
    setSelectedId(null);
    setComposeOpen(false);
  }

  function openMessage(message: EmailMessage) {
    setSelectedId(message.id);
    setComposeOpen(false);
    if (message.unread) {
      setMessages((current) =>
        current.map((item) => item.id === message.id ? { ...item, unread: false } : item)
      );
    }
  }

  function toggleStar(id: number) {
    setMessages((current) =>
      current.map((item) => item.id === id ? { ...item, starred: !item.starred } : item)
    );
  }

  function startCompose() {
    setTo("");
    setSubject("");
    setBody("");
    setComposeOpen(true);
    setSelectedId(null);
  }

  function saveDraft() {
    if (!to.trim() && !subject.trim() && !body.trim()) {
      setComposeOpen(false);
      return;
    }
    const draft: EmailMessage = {
      id: Date.now(),
      from: "Jambinno Shuttles",
      email: "info@jambinnoshuttles.com",
      to,
      subject: subject || "(No subject)",
      preview: body.slice(0, 100),
      body,
      date: "Just now",
      folder: "Drafts",
    };
    setMessages((current) => [draft, ...current]);
    setComposeOpen(false);
    setActiveFolder("Drafts");
    setNotice("Draft saved in this preview. It is not stored on a mail server.");
  }

  function sendDemoEmail() {
    if (!to.trim() || !subject.trim() || !body.trim()) {
      setNotice("Please complete the recipient, subject and message.");
      return;
    }
    const sent: EmailMessage = {
      id: Date.now(),
      from: "Jambinno Shuttles",
      email: "info@jambinnoshuttles.com",
      to,
      subject,
      preview: body.slice(0, 100),
      body,
      date: "Just now",
      folder: "Sent",
    };
    setMessages((current) => [sent, ...current]);
    setComposeOpen(false);
    setActiveFolder("Sent");
    setNotice("Preview only: this message has not been sent. Connect SMTP to enable delivery.");
  }

  return (
    <div className="admin-dashboard email-dashboard">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => {
          sessionStorage.removeItem("adminToken");
          sessionStorage.removeItem("adminUser");
          window.location.href = "/admin/login";
        }}
      />

      <main className="admin-dashboard-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>
          <div className="admin-topbar-title">
            <span>BUSINESS ADMINISTRATION</span>
            <h1>Email Center</h1>
          </div>
          <div className="email-topbar-account">
            <div className="email-account-avatar">TJ</div>
            <div><strong>Jambinno Shuttles</strong><span>Business mailbox</span></div>
            <ChevronDown size={16} />
          </div>
        </header>

        <div className="admin-dashboard-content email-page-content">
          <div className="email-page-heading">
            <div>
              <button className="email-back-button" onClick={() => window.location.href = "/admin/dashboard"}>
                <ArrowLeft size={16} /> Dashboard Overview
              </button>
              <h2>Business Email</h2>
              <p>Manage customer enquiries and business conversations in one place.</p>
            </div>
            <button className="email-compose-button" onClick={startCompose}>
              <Plus size={17} /> Compose Email
            </button>
          </div>

          <div className="email-notice"><Mail size={16} /><span>{notice}</span></div>

          <section className="email-workspace">
            <aside className="email-folders">
              <div className="email-mailbox-label">MAILBOX</div>
              <div className="email-address-card">
                <div className="email-address-icon"><Mail size={18} /></div>
                <div><strong>Jambinno Shuttles</strong><span>jambinnoshuttles.com</span></div>
              </div>
              <button className="email-sidebar-compose" onClick={startCompose}>
                <Plus size={17} /> Compose
              </button>
              <nav className="email-folder-nav">
                {folders.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    className={`email-folder-item ${activeFolder === label ? "active" : ""}`}
                    onClick={() => selectFolder(label)}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                    {label === "Inbox" && unreadCount > 0 && <b>{unreadCount}</b>}
                  </button>
                ))}
              </nav>
              <div className="email-storage-note">
                <ShieldIcon />
                <div><strong>Mailbox connection</strong><span>Not configured yet</span></div>
              </div>
            </aside>

            <section className="email-list-panel">
              <div className="email-list-header">
                <div><h3>{activeFolder}</h3><span>{visibleMessages.length} messages</span></div>
                <button className="email-icon-button" onClick={() => setNotice("Preview data refreshed.")} aria-label="Refresh messages">
                  <RefreshCw size={17} />
                </button>
              </div>
              <label className="email-search">
                <Search size={17} />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search emails..." />
              </label>
              <div className="email-message-list">
                {visibleMessages.length === 0 ? (
                  <div className="email-list-empty"><MailOpen size={27} /><strong>No emails found</strong><span>Try another folder or search term.</span></div>
                ) : visibleMessages.map((message) => (
                  <article
                    key={message.id}
                    className={`email-message-row ${selectedId === message.id ? "selected" : ""} ${message.unread ? "unread" : ""}`}
                    onClick={() => openMessage(message)}
                  >
                    <div className="email-message-row-top">
                      <strong>{message.from}</strong>
                      <span>{message.date}</span>
                    </div>
                    <div className="email-message-subject">
                      <span>{message.subject}</span>
                      <button
                        className={`email-star-button ${message.starred ? "starred" : ""}`}
                        onClick={(event) => { event.stopPropagation(); toggleStar(message.id); }}
                        aria-label="Toggle starred"
                      ><Star size={15} fill={message.starred ? "currentColor" : "none"} /></button>
                    </div>
                    <p>{message.preview}</p>
                    {message.attachment && <small className="email-attachment-chip"><Paperclip size={12} /> {message.attachment}</small>}
                  </article>
                ))}
              </div>
            </section>

            <section className="email-reading-panel">
              {composeOpen ? (
                <div className="email-compose-view">
                  <div className="email-reading-heading">
                    <div><span>NEW MESSAGE</span><h3>Compose Email</h3></div>
                    <button className="email-icon-button" onClick={() => setComposeOpen(false)} aria-label="Close compose"><X size={18} /></button>
                  </div>
                  <div className="email-compose-fields">
                    <label>From<input value="info@jambinnoshuttles.com" readOnly /></label>
                    <label>To<input value={to} onChange={(event) => setTo(event.target.value)} placeholder="Recipient email address" type="email" /></label>
                    <label>Subject<input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Enter subject" /></label>
                    <label className="email-compose-body-label">Message<textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write your message..." rows={10} /></label>
                  </div>
                  <div className="email-compose-actions">
                    <button className="email-send-button" onClick={sendDemoEmail}><SendHorizonal size={16} /> Send</button>
                    <button className="email-save-button" onClick={saveDraft}>Save Draft</button>
                  </div>
                  <p className="email-compose-disclaimer">Sending is disabled until a real mailbox and SMTP connection are configured.</p>
                </div>
              ) : selectedMessage ? (
                <div className="email-reading-view">
                  <div className="email-reading-heading">
                    <div><span>{selectedMessage.folder.toUpperCase()}</span><h3>{selectedMessage.subject}</h3></div>
                    <button className="email-icon-button" onClick={() => toggleStar(selectedMessage.id)} aria-label="Toggle starred">
                      <Star size={17} fill={selectedMessage.starred ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="email-sender-details">
                    <div className="email-sender-avatar">{selectedMessage.from.charAt(0).toUpperCase()}</div>
                    <div className="email-sender-copy"><strong>{selectedMessage.from}</strong><span>{selectedMessage.email}</span></div>
                    <time>{selectedMessage.date}</time>
                  </div>
                  <div className="email-recipient-line">To: {selectedMessage.to}</div>
                  <div className="email-message-body">{selectedMessage.body}</div>
                  {selectedMessage.attachment && (
                    <div className="email-attachment-preview"><Paperclip size={17} /><div><strong>{selectedMessage.attachment}</strong><span>Attachment preview (demo)</span></div><ArrowUpRight size={16} /></div>
                  )}
                  <div className="email-reading-actions">
                    <button onClick={() => { setTo(selectedMessage.email); setSubject(`Re: ${selectedMessage.subject}`); setBody(`\n\n--- Original message ---\n${selectedMessage.body}`); setComposeOpen(true); }}><ArrowLeft size={15} /> Reply</button>
                    <button onClick={startCompose}><Send size={15} /> New Email</button>
                    <button onClick={() => { setMessages((current) => current.filter((item) => item.id !== selectedMessage.id)); setSelectedId(null); }}><Trash2 size={15} /> Delete</button>
                  </div>
                </div>
              ) : (
                <div className="email-reading-empty">
                  <div><MailOpen size={34} /></div>
                  <h3>Select an email</h3>
                  <p>Choose a message from your list to read it here, or compose a new email.</p>
                  <button onClick={startCompose}><Plus size={16} /> Compose Email</button>
                </div>
              )}
            </section>
          </section>

          <footer className="admin-dashboard-footer">
            <span>TWENDE JAMBINNO SHUTTLE</span>
            <span>Administration Portal · Email Center</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function ShieldIcon() {
  return <span className="email-shield-mark">!</span>;
}
