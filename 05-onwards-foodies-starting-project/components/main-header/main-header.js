import Link from "next/link";
import Image from "next/image";

import MainHeaderBackground from "./main-header-background";
import logoImg from "@/assets/logo.png";

import classes from "./main-header.module.css";

export default function MainHeader() {
  return (
    <>
    <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image
            src={logoImg}
            alt="Tabağın içindeki yemekler görseli"
            priority
          />{" "}
          {/*priority ile öncelikli yükleme yapılıyor.*/}
          Sude's Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href="/meals">Browse Meals</Link>
            </li>
            <li>
              <Link href="/community">Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
