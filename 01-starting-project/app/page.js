import Link from 'next/link';

import Header from '@/components/header'; //burada kök projeye için içe aktarma yolu olan '@' kullandık. (dosya derinliği arttıkça işimiz zorlaşacaktı.)
export default function Home() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p>
        <Link href="/about">About Us</Link>
      </p>
    </main>
  );
}
