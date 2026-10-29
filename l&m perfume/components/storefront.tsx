"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductBottle } from "@/components/site";

const products = [
  { name: "Sunday in Bloom", mood: "Soft & romantic", price: "₱890", shade: "coral", tag: "SOFT FLORAL", slug: "sunday-in-bloom" },
  { name: "Golden Hour", mood: "Bright & happy", price: "₱890", shade: "yellow", tag: "SUNNY CITRUS", slug: "golden-hour" },
  { name: "After the Rain", mood: "Calm & cozy", price: "₱890", shade: "lilac", tag: "CALM & COZY", slug: "after-the-rain" },
];

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-star">✳</span> SCENTS FOR YOUR KIND OF LOVELY</div>
          <h1>A little lovely<br />goes a <em>long way.</em></h1>
          <p>Meet the scent that feels a little more like you. Thoughtfully made here at home, for wherever life takes you.</p>
          <Link className="button button-dark" href="/shop">Find your feel-good scent <span aria-hidden="true">↗</span></Link>
          <div className="hero-note"><span className="tiny-sun">✳</span> Your everyday scent, made special.</div>
        </div>
        <div className="hero-art" aria-label="L&M perfume bottle among playful coral and yellow shapes">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="hero-sun">✳</div><div className="hero-sparkle sparkle-one">✦</div><div className="hero-sparkle sparkle-two">✳</div>
          <ProductBottle />
          <div className="hero-caption"><span>01 / 03</span><span>SUNDAY IN BLOOM</span></div>
          <div className="hero-roundel">MADE<br />WITH<br />LOVE <span>♡</span></div>
        </div>
      </section>

      <div className="trust-strip">
        <div><span className="trust-icon">✿</span><span><b>Made locally</b><small>Created with care at home</small></span></div>
      <div><span className="trust-icon">↗</span><span><b>Little parcel, big joy</b><small>Delivery options at checkout</small></span></div>
        <div><span className="trust-icon">♡</span><span><b>Pay your way</b><small>GCash · Maya · COD</small></span></div>
        <div><span className="trust-icon">✦</span><span><b>Made for real life</b><small>Everyday wear, easy love</small></span></div>
      </div>

      <section className="section bestsellers" id="bestsellers">
        <div className="section-heading"><div><div className="eyebrow">THE CROWD-PLEASERS</div><h2>Love at first <em>spritz.</em></h2></div><Link className="text-link" href="/shop">Shop all scents <span>↗</span></Link></div>
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </section>

      <section className="mood-section" id="moods">
        <div className="mood-header"><div className="eyebrow">WHAT’S YOUR MOOD TODAY?</div><h2>There’s a scent<br />for <em>that.</em></h2><p>Go with your gut. Pick a feeling, find your fragrance.</p></div>
        <div className="mood-grid">
          <Link href="/shop?mood=bright" className="mood-card mood-peach"><span className="mood-number">01 / SUNNY SIDE</span><span className="mood-emoji">☀</span><span className="mood-name">Bright &amp; happy <b>↗</b></span></Link>
          <Link href="/shop?mood=soft" className="mood-card mood-lilac"><span className="mood-number">02 / SOFT SPOT</span><span className="mood-emoji">✿</span><span className="mood-name">Soft &amp; romantic <b>↗</b></span></Link>
          <Link href="/shop?mood=calm" className="mood-card mood-sage"><span className="mood-number">03 / DEEP BREATH</span><span className="mood-emoji">☁</span><span className="mood-name">Calm &amp; cozy <b>↗</b></span></Link>
        </div>
      </section>

      <section className="quote-section">
        <span className="quote-mark">“</span><div className="eyebrow">A LOVE NOTE FROM THE COMMUNITY</div>
        <blockquote>Your kind words<br className="desktop-break" /> belong here.</blockquote>
        <p className="review-coming-soon">Verified customer reviews will appear here as they come in.</p>
        <Link className="text-link" href="/shop">Find your new favorite <span>↗</span></Link>
      </section>

      <section className="newsletter">
        <div><div className="eyebrow">NEED A LITTLE HAND?</div><h2>We’re here to help you <em>find your scent.</em></h2><p>Questions before you spritz? Our team would love to help.</p></div>
        <Link className="button button-coral" href="/contact">Talk to us <span>↗</span></Link>
      </section>
    </>
  );
}

function ProductCard({ product, size = "30ml" }: { product: (typeof products)[number]; size?: string }) {
  const price = size === "10ml" ? "₱390" : size === "50ml" ? "₱1,390" : product.price;
  return (
    <article className="product-card">
      <Link href={`/product/${product.slug}`} className={`product-image image-${product.shade}`} aria-label={`View ${product.name}`}>
        <span className="product-tag">{product.tag}</span><span className="quick-view">↗</span><ProductBottle color={product.shade} small />
      </Link>
      <div className="product-info"><div><Link href={`/product/${product.slug}`} className="product-name">{product.name}</Link><span className="product-mood">{product.mood} · {size}</span></div><span className="product-price">{price}</span></div>
      <p className="real-photo-note">Product photo coming soon</p>
    </article>
  );
}

export function ShopPage() {
  const [mood, setMood] = useState("All moods");
  const [size, setSize] = useState("All sizes");
  const [priceRange, setPriceRange] = useState("All prices");
  useEffect(() => {
    const requestedMood = new URLSearchParams(window.location.search).get("mood");
    const moodBySlug: Record<string, string> = {
      bright: "Bright & happy",
      soft: "Soft & romantic",
      calm: "Calm & cozy",
    };
    if (requestedMood && moodBySlug[requestedMood]) setMood(moodBySlug[requestedMood]);
  }, []);
  const displaySize = size !== "All sizes"
    ? size
    : priceRange === "Under ₱700"
      ? "10ml"
      : priceRange === "₱1,000+"
        ? "50ml"
        : "30ml";
  const visibleProducts = products.filter((product) => {
    if (mood !== "All moods" && product.mood !== mood) return false;
    const selectedPrice = displaySize === "10ml" ? 390 : displaySize === "50ml" ? 1390 : 890;
    if (priceRange === "Under ₱700" && selectedPrice >= 700) return false;
    if (priceRange === "₱700–₱1,000" && (selectedPrice < 700 || selectedPrice > 1000)) return false;
    if (priceRange === "₱1,000+" && selectedPrice < 1000) return false;
    return true;
  });
  return (
    <div className="page-wrap">
      <div className="page-intro shop-intro"><div className="eyebrow">THE L&amp;M SCENT WARDROBE</div><h1>Find your <em>feel-good.</em></h1><p>Everyday scents for every little version of you.</p></div>
      <div className="shop-tools"><span>Showing {visibleProducts.length} lovely scent{visibleProducts.length === 1 ? "" : "s"}</span><div className="filter-controls"><label>Size <select value={size} onChange={(event) => setSize(event.target.value)} aria-label="Filter by size"><option>All sizes</option><option>10ml</option><option>30ml</option><option>50ml</option></select></label><label>Price <select value={priceRange} onChange={(event) => setPriceRange(event.target.value)} aria-label="Filter by price"><option>All prices</option><option>Under ₱700</option><option>₱700–₱1,000</option><option>₱1,000+</option></select></label><label>Mood <select value={mood} onChange={(event) => setMood(event.target.value)} aria-label="Filter by scent mood"><option>All moods</option><option>Bright &amp; happy</option><option>Soft &amp; romantic</option><option>Calm &amp; cozy</option></select></label></div></div>
      {visibleProducts.length > 0 ? <div className="product-grid shop-grid">{visibleProducts.map((product) => <ProductCard key={product.slug} product={product} size={displaySize} />)}</div> : <div className="empty-cart"><h2>No scents match just yet.</h2><p>Try adjusting your filters to find your feel-good.</p><button className="button button-dark" onClick={() => { setSize("All sizes"); setPriceRange("All prices"); setMood("All moods"); }}>Clear filters ↗</button></div>}
      <div className="small-note">Sizes and prices shown are design placeholders. Confirm product details before publishing.</div>
    </div>
  );
}

export function ProductPage({ slug }: { slug: string }) {
  const product = products.find((item) => item.slug === slug) ?? products[0];
  const [size, setSize] = useState("30ml");
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    const cart = JSON.parse(localStorage.getItem("lm-cart") ?? "[]") as { name: string; size: string; price: string; quantity: number }[];
    const existing = cart.find((item) => item.name === product.name && item.size === size);
    if (existing) existing.quantity += 1;
    else cart.push({ name: product.name, size, price: size === "10ml" ? "₱390" : size === "50ml" ? "₱1,390" : product.price, quantity: 1 });
    localStorage.setItem("lm-cart", JSON.stringify(cart));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };
  return (
    <div className="page-wrap product-detail">
      <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/shop">Shop all</Link> / {product.name}</div>
      <div className="detail-layout">
        <div className={`detail-image image-${product.shade}`}><span className="product-tag">{product.tag}</span><ProductBottle color={product.shade} /></div>
        <div className="detail-copy"><div className="eyebrow">{product.mood.toUpperCase()}</div><h1>{product.name}</h1><p className="detail-lede">A little reminder that the best days are the ones that feel like you. Fresh, soft, and wonderfully easy to wear.</p><div className="detail-price">{size === "10ml" ? "₱390" : size === "50ml" ? "₱1,390" : product.price} <span> · inclusive of taxes</span></div><fieldset className="size-picker"><legend>Choose your size</legend>{["10ml", "30ml", "50ml"].map((item) => <button key={item} type="button" className={size === item ? "size-option selected" : "size-option"} onClick={() => setSize(item)}>{item}<small>{item === "10ml" ? "₱390" : item === "50ml" ? "₱1,390" : product.price}</small></button>)}</fieldset><p className="detail-callout"><span>✳</span> Your new signature scent might be one spritz away.</p><button className="button button-coral add-button" type="button" onClick={handleAdd}>{added ? "Added to your bag ✓" : "Add to bag"} <span>↗</span></button><div className="shipping-note">♡ Delivery options at checkout · GCash, Maya &amp; COD</div><div className="product-details-list"><details open><summary>The feeling &amp; the notes</summary><p>{product.mood}. Opens with bright citrus, settles into soft florals, and leaves a warm, cozy finish.</p></details><details><summary>Ingredients</summary><p>Ingredient list to be supplied by L&amp;M before launch. Please verify the final product label.</p></details><details><summary>Product registration</summary><p>FDA CPN: to be confirmed by L&amp;M. Add the verified Cosmetic Product Notification number before publishing.</p></details></div><div className="small-note">Product imagery and product claims are illustrative placeholders.</div></div>
      </div>
      <div className="mobile-sticky-add"><span>{product.name}<b>{size === "10ml" ? "₱390" : size === "50ml" ? "₱1,390" : product.price}</b></span><button type="button" onClick={handleAdd}>Add to bag ↗</button></div>
    </div>
  );
}

export function CartPage() {
  const [items, setItems] = useState<{ name: string; size: string; price: string; quantity: number }[] | null>(null);
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("lm-cart") ?? "[]") as NonNullable<typeof items>;
    setItems(stored);
  }, []);
  const cartItems = items ?? [];
  return <div className="page-wrap cart-page"><div className="eyebrow">YOUR LITTLE BAG</div><h1>A lovely choice.</h1><p>Here’s what’s coming your way.</p>{cartItems.length === 0 ? <div className="empty-cart"><span>♡</span><h2>Your bag is taking a little breather.</h2><p>Find a scent that feels like you.</p><Link className="button button-dark" href="/shop">Shop all scents ↗</Link></div> : <div className="cart-layout"><div className="cart-items">{cartItems.map((item, index) => <div className="cart-item" key={`${item.name}-${item.size}`}><div className="cart-thumb"><ProductBottle small /></div><div className="cart-item-info"><b>{item.name}</b><span>{item.size} · Qty {item.quantity}</span><button onClick={() => { const updated = cartItems.filter((_, i) => i !== index); localStorage.setItem("lm-cart", JSON.stringify(updated)); setItems(updated); }}>Remove</button></div><b>{item.price}</b></div>)}</div><div className="cart-summary"><h2>Order summary</h2><p>Shipping <span>Calculated at checkout</span></p><Link href="/checkout" className="button button-coral">Continue to checkout ↗</Link><small>Secure checkout · Guest checkout available</small></div></div>}</div>;
}

export function CheckoutPage() {
  const [method, setMethod] = useState("GCash");
  return <div className="page-wrap checkout-page"><div className="eyebrow">JUST A FEW LITTLE DETAILS</div><h1>Let’s get it <em>to you.</em></h1><p>No account needed. We’ll only ask what we need to deliver your order.</p><form className="checkout-form" onSubmit={(event) => { event.preventDefault(); window.location.assign("/order-confirmation"); }}><div className="checkout-fields"><h2>1. Your details</h2><div className="form-grid"><label>First name<input name="firstName" required autoComplete="given-name" /></label><label>Last name<input name="lastName" required autoComplete="family-name" /></label><label className="full-field">Email address<input name="email" type="email" required autoComplete="email" /></label><label className="full-field">Mobile number<input name="phone" type="tel" required autoComplete="tel" /></label><label className="full-field">Delivery address<input name="address" required autoComplete="street-address" /></label><label>City / municipality<input name="city" required autoComplete="address-level2" /></label><label>Postal code<input name="postalCode" required autoComplete="postal-code" /></label></div><h2>2. How would you like to pay?</h2><div className="payment-options">{["GCash", "Maya", "Cash on delivery"].map((option) => <label key={option} className={method === option ? "payment-option checked" : "payment-option"}><input type="radio" name="payment" value={option} checked={method === option} onChange={() => setMethod(option)} />{option}<span>{method === option ? "●" : "○"}</span></label>)}</div><button className="button button-coral checkout-submit" type="submit">Place my order <span>↗</span></button><small>Demo checkout only — connect a payment provider and order service before accepting real orders.</small></div><aside className="checkout-aside"><div className="eyebrow">A LITTLE REMINDER</div><h2>Made with love.<br />On its way to you.</h2><p>Review your bag before placing your order.</p><Link href="/cart">← Back to bag</Link></aside></form></div>;
}

export function SimpleForm({ type }: { type: "track" | "contact" }) {
  const [submitted, setSubmitted] = useState(false);
  if (type === "track") return <div className="page-wrap simple-page"><div className="eyebrow">NO ACCOUNT NEEDED</div><h1>Where’s my <em>order?</em></h1><p>Pop in your order number and the email address or phone number you used at checkout.</p><form className="simple-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>Order number<input required placeholder="e.g. LM-1042" /></label><label>Email or mobile number<input required placeholder="Email address or phone number" /></label><button className="button button-dark" type="submit">Find my order ↗</button>{submitted && <p className="form-feedback">Order lookup is ready to connect. Add your order system integration to show live tracking details.</p>}</form></div>;
  return <div className="page-wrap simple-page"><div className="eyebrow">WE’RE HERE FOR YOU</div><h1>Say <em>hello.</em></h1><p>A scent question, an order question, or just want to say hi? We’d love to hear from you.</p><form className="simple-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>Your name<input required autoComplete="name" /></label><label>Email address<input required type="email" autoComplete="email" /></label><label>Your message<textarea required rows={5} /></label><button className="button button-dark" type="submit">Send us a note ↗</button>{submitted && <p className="form-feedback">Thanks for reaching out. Connect this form to your inbox to receive messages.</p>}</form></div>;
}
