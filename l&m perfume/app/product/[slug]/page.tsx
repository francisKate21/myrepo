import type { Metadata } from "next";
import { ProductPage } from "@/components/storefront";

const products = [
  { slug: "sunday-in-bloom", name: "Sunday in Bloom" },
  { slug: "golden-hour", name: "Golden Hour" },
  { slug: "after-the-rain", name: "After the Rain" },
];

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = products.find((item) => item.slug === params.slug) ?? products[0];
  return {
    title: product.name,
    description: `${product.name}: a locally made feel-good perfume from L&M.`,
    openGraph: { title: `${product.name} | L&M Perfumes`, description: "A locally made scent for your kind of lovely.", images: ["/opengraph-image"] },
  };
}

export default function ProductRoute({ params }: { params: { slug: string } }) {
  return <ProductPage slug={params.slug} />;
}
