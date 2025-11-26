import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect( () => {
    dispatch(fetchCartData());
  }, [dispatch]); //dispatch değişmediği sürece 1 kere çalışıyor.

  useEffect(() => {
    
    if(isInitial)
    {
      isInitial = false;
      return;
    }//ilk render'da fonksiyon erken return yapıyor, böylece veri gönderilmiyor.

    if(cart.changed) 
    {
      dispatch(sendCartData(cart));//ilk render dışında kart değiştiğinde çalışır,Redux Thunk'la sendCartData çağrılır.
    } 
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}{/*notification state'de varsa <Notification /> componenti render ediliyor*/}
      <Layout>
        {showCart && <Cart />}
        <Products />{/*her zaman gösterilir*/}
      </Layout>{/*layout sayfanın ana yapısı, showCart true ise <Cart /> gösteriliyor.*/}
    </Fragment>
  );
}

export default App;
