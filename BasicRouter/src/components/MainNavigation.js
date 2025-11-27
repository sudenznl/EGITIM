import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              /*style={({isActive}) => ({ 
                textAlign: isActive ? 'center' : 'left', 
              })}*/
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

//navlink' özel bir davranış vardır : sınıf adı prop'unu eklersek, aslında bie dize alan sınıf adı prop'u değil, bunun yerine bir işlev alan bir prop olur.
