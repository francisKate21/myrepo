import type { Metadata } from "next";
import Link from "next/link";
import { CartPage, CheckoutPage, ShopPage, SimpleForm } from "@/components/storefront";

const routes = ["shop", "cart", "checkout", "order-confirmation", "track-order", "our-story", "contact", "faq", "privacy", "terms", "returns"];

const content: Record<string, { eyebrow: string; title: string; description: string; sections: { title: string; body: string }[] }> = {
  "order-confirmation": { eyebrow: "IT’S OFFICIAL", title: "A lovely little order.", description: "Thank you for choosing L&M. Your order details will be on their way to your inbox.", sections: [{ title: "What happens next?", body: "We’ll send an order confirmation and delivery updates to the contact details you provided at checkout. Connect your order system to show your reference number and live status here." }] },
  "our-story": { eyebrow: "A LITTLE ABOUT US", title: "Made with love, right here at home.", description: "L&M began with a simple thought: a scent can change how a day feels.", sections: [{ title: "A small idea with a lovely feeling", body: "We’re a local perfume brand making thoughtful, everyday scents for real life. L&M is built around the little rituals that make ordinary days feel like your own." }, { title: "Made locally, worn everywhere", body: "Our perfumes are made in the Philippines with care. We’re growing this story with our community, one bottle and one lovely moment at a time." }, { title: "Why we make them", body: "We believe fragrance should feel personal, joyful, and easy to reach for. Something you can wear for yourself, not just for a special occasion." }] },
  faq: { eyebrow: "THE LITTLE DETAILS", title: "Good to know.", description: "A few quick answers about finding, paying for, and receiving your new favorite scent.", sections: [{ title: "How long does delivery take?", body: "Orders are prepared in 1–3 business days. Delivery times vary by destination. We’ll share a tracking update once your order ships." }, { title: "Which payment methods can I use?", body: "Checkout is designed for GCash, Maya, and cash on delivery. Payment provider integration and COD availability should be confirmed before launch." }, { title: "Can I shop without an account?", body: "Of course. Checkout and order lookup are designed to work without an account." }, { title: "Can I return or exchange my perfume?", body: "For hygiene and safety, returns are limited to eligible cases such as a damaged or incorrect item. Please contact us within 7 days of delivery. Publish final terms after review." }] },
  privacy: { eyebrow: "THE FINE PRINT", title: "Privacy policy.", description: "We respect your personal information and only use it to help make your L&M experience lovely.", sections: [{ title: "Information we collect", body: "Checkout may collect your name, delivery address, email, phone number, and order details. This starter page is not a substitute for a reviewed privacy notice." }, { title: "How we use it", body: "We use information to process orders, arrange delivery, respond to questions, and share updates where you have opted in." }, { title: "Your choices", body: "Add your contact details and the process for making privacy requests before publishing this policy. Have the final notice reviewed for compliance with applicable Philippine law." }] },
  terms: { eyebrow: "THE FINE PRINT", title: "Terms of service.", description: "A few simple details about shopping with L&M.", sections: [{ title: "Orders and payment", body: "An order is subject to product availability and payment confirmation. Prices, product details, delivery coverage, and promotions must be confirmed before launch." }, { title: "Please note", body: "Product descriptions and site content are provided for general shopping information. Replace this starter text with terms reviewed for your business and applicable law." }] },
  returns: { eyebrow: "THE FINE PRINT", title: "Returns & exchanges.", description: "We want you to feel lovely about your order. If something isn’t right, please let us know.", sections: [{ title: "Something arrived damaged or incorrect?", body: "Contact us within 7 days of delivery with your order number and clear photos so we can help." }, { title: "Perfume returns", body: "For hygiene and safety, opened or used fragrance products may not be eligible for return unless required by law. Replace this starter policy with your final, legally reviewed terms before publishing." }] },
};

const pageTitles: Record<string, string> = {
  shop: "Shop feel-good scents",
  cart: "Your little bag",
  checkout: "Guest checkout",
  "order-confirmation": "Order confirmation",
  "track-order": "Track my order",
  "our-story": "Our story",
  contact: "Contact L&M",
  faq: "FAQ, shipping & payment",
  privacy: "Privacy policy",
  terms: "Terms of service",
  returns: "Returns policy",
};

export function generateStaticParams() {
  return routes.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const title = pageTitles[params.slug] ?? "L&M Perfumes";
  return {
    title,
    description: `Explore ${title.toLowerCase()} at L&M Perfumes. Locally made scents for your kind of lovely.`,
    openGraph: { title: `${title} | L&M Perfumes`, description: "Locally made scents for your kind of lovely.", images: ["/opengraph-image"] },
  };
}

export default function DynamicPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  if (slug === "shop") return <ShopPage />;
  if (slug === "cart") return <CartPage />;
  if (slug === "checkout") return <CheckoutPage />;
  if (slug === "track-order") return <SimpleForm type="track" />;
  if (slug === "contact") return <SimpleForm type="contact" />;
  const data = content[slug];
  if (!data) return <div className="page-wrap simple-page"><div className="eyebrow">A LITTLE DETOUR</div><h1>That page isn’t <em>here.</em></h1><Link className="button button-dark" href="/">Back to home ↗</Link></div>;
  if (slug === "order-confirmation") return <div className="page-wrap confirmation-page"><div className="confirmation-icon">✓</div><div className="eyebrow">{data.eyebrow}</div><h1>{data.title}</h1><p>{data.description}</p><div className="confirmation-next"><h2>{data.sections[0].title}</h2><p>{data.sections[0].body}</p></div><Link className="button button-dark" href="/shop">Keep exploring ↗</Link></div>;
  return <div className="page-wrap editorial-page"><div className="eyebrow">{data.eyebrow}</div><h1>{data.title}</h1><p className="editorial-lede">{data.description}</p><div className="editorial-sections">{data.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}</div>{slug === "our-story" && <div className="small-note">Add real maker, studio, and production photos here when available. No stock photography is used in this design.</div>}{slug === "faq" && <p className="editorial-contact">Still curious? <Link href="/contact">Send us a note ↗</Link></p>}</div>;
}
