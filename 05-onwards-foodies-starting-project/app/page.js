import Link from "next/link";

import classes from './page.module.css';
import ImageSlideshow from "../components/images/image-slideshow";

//localhost:3000/
export default function Home() {
  return (
    /*<main>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Time to get started!
      </h1>
      <p>
        <Link href="/meals">Meals</Link>
      </p>
      <p>
        <Link href="/meals/share">Share Meals</Link>
      </p>
      <p>
        <Link href="/community">Community</Link>
      </p>
    </main>*/
     <>
      <header className={classes.header}>
        <div className={classes.slideshow}></div>
          <ImageSlideshow />
        <div>
          <div className={classes.hero}>
            <h1>Sude's Food for NextLevel Foodies</h1>
            <p>Taste & share food from all over the world.</p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Join the Community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            Sude's Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            Sude's Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            Sude's Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            Sude's Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}
