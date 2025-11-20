import { useContext } from "react";

import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); //email: test@example.com

    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items, 
          customer: customerData
        }
      })
    });
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Adres Bilgileri</h2>
        <p>Toplam Miktar: {currencyFormatter.format(cartTotal)}</p>

        <Input label="İsim - Soy İsim" type="text" id="name" />
        <Input label="Mail Addresi" id="email" type="email" />
        <Input label="Sokak" type="text" id="street" />

        <div className="control-row">
          <Input label="Posta Kodu" type="" id="postal-code" />
          <Input label="Şehir" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Kapat
          </Button>
          <Button>Siparişi Tamamla</Button>
        </p>
      </form>
    </Modal>
  );
}
