import "./Navbar.css";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "Services", href: "/services" },
  { label: "Destinations", href: "/destinations" },
  { label: "Contact", href: "/contact" },
];

function UserIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand-logo" aria-label="Jambinno home">
          <Image
            src="/images/jambinno-logo.png"
            alt="Jambinno Shuttle Services"
            width={190}
            height={75}
            priority
            className="header-logo"
          />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/login" className="login-link">
            <span className="login-icon">
              <UserIcon />
            </span>
            <span>Login</span>
          </Link>

          <Link href="/booking" className="header-booking">
            <span>Book a Journey</span>
            <ArrowIcon />
          </Link>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">
            <span />
            <span />
            <span />
          </summary>

          <div className="mobile-menu-panel">
            {navigation.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}

            <Link href="/login" className="mobile-login">
              <UserIcon />
              Admin Login
            </Link>

            <Link href="/booking" className="mobile-booking">
              Book a Journey <ArrowIcon />
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
