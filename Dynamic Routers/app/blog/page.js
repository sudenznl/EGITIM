import Link from "next/link";

export default function BlogPage() {
  return (
    <main>
      <h1>BLOG</h1>
      <p>
        <Link href="/blog/post-1">Yazı-1</Link>
      </p>
      <p>
        <Link href="/blog/post-2">Yazı-2</Link>
      </p>
    </main>
  );
}
