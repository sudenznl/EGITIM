import Link from 'next/link';

import Header from './header';
export default function Home() {
  return (
    <main>
      <Header />
      <h1>Welcome to this NextJS Course!</h1>
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p>
        <Link href="/about">About Us</Link>
      </p>
    </main>
  );
}
