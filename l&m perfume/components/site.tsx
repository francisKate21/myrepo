import Link from "next/link";

const navItems = [
  { href: "/shop", label: "Shop all" },
  { href: "/#moods", label: "Find your mood" },
  { href: "/our-story", label: "Our story" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="L&M Perfumes home">
          <span className="wordmark-main">L<span>&amp;</span>M</span>
          <span className="wordmark-sub">PERFUMES</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <Link href={item.href} key={`${item.label}-${index}`}>{item.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="icon-link account-link" href="/track-order" aria-label="Track my order">Track order</Link>
          <Link className="bag-link" href="/cart" aria-label="Shopping bag">
            <span className="bag-icon" aria-hidden="true">♧</span><span className="bag-text">Bag</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="wordmark footer-wordmark" href="/">
            <span className="wordmark-main">L<span>&amp;</span>M</span>
            <span className="wordmark-sub">PERFUMES</span>
          </Link>
          <p>Little moments, lovely scents.<br />Made with love, right here at home.</p>
        </div>
        <div className="footer-column"><strong>Explore</strong><Link href="/shop">Shop all</Link><Link href="/our-story">Our story</Link><Link href="/faq">FAQs</Link></div>
        <div className="footer-column"><strong>Here to help</strong><Link href="/contact">Contact us</Link><Link href="/track-order">Track your order</Link><Link href="/faq">Shipping &amp; payment</Link></div>
        <div className="footer-column"><strong>The fine print</strong><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of service</Link><Link href="/returns">Returns policy</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 L&amp;M Perfumes. Made locally, worn everywhere.</span><span>GCash · Maya · Cash on delivery</span></div>
    </footer>
  );
}

export function ProductBottle({ color = "coral", small = false }: { color?: string; small?: boolean }) {
  return (
    <div className={`bottle-art bottle-${color}${small ? " bottle-small" : ""}`} role="img" aria-label="Illustration of an L&M perfume bottle">
      <div className="bottle-shadow" />
      <div className="bottle-cap" />
      <div className="bottle-neck" />
      <div className="bottle-glass">
        <div className="bottle-liquid" />
        <div className="bottle-label"><b>L&amp;M</b><span>PERFUMES</span><i>made for your mood</i></div>
      </div>
    </div>
  );
}
