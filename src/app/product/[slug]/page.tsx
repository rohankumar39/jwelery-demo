import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductDetail from '@/components/product/ProductDetail';
import { getProductBySlug, products, formatPrice } from '@/data/products';

interface Props { params: { slug: string }; }

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: { title: product.name, description: `${formatPrice(product.price)} · ${product.material}` },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return (
    <main>
      <Navbar />
      <ProductDetail product={product} />
      <Footer />
    </main>
  );
}
