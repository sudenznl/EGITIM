import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        <ul>
          <li>
            <a href='/'>Ürünlerim</a>
          </li>
          <li>
            <a href='/'>Satışlarım</a>
          </li>
          <li>
            <button>Çıkış</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
