import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import Product from './components/Product.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import CartContextProvider from './store/shopping-cart-context.jsx';

function App({onAddItemToCart}) {
  

  return (
    <CartContextProvider>
      <Header />
      <Shop>
         {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product} onAddToCart={onAddItemToCart} />
            </li>
          ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
