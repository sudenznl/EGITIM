import { useContext, useActionState } from "react";

import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    error,
    sendRequest,
    clearData
  } = useHttp('http://localhost:3000/orders', requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

   async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries()); 

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  const [formState, formAction, isSending] = useActionState(checkoutAction,null);

  let action = (
    <>
      <Button type='button' textOnly onClick={handleClose}>
        Kapat
      </Button>
      <Button>Siparişi Tamamla</Button>
    </>
  );

  if (isSending) {
    action = <span>Sipariş verileri gönderiliyor...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinish}
      >
        <h2>Tamamlandı!</h2>
        <p>Siperişiniz başarılı bir şekilde tamamlandı.</p>
        <p>
          Önümüzdeki birkaç dakika içinde e-posta kutunuzu kontrol ediniz, daha
          fazla bilgi ile geri dönüş yapacağız.
        </p>
        <p className='modal-actions'>
          <Button onClick={handleFinish}>Tamam</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      <form action={(fd) => formAction(fd)}>
        <h2>Adres Bilgileri</h2>
        <p>Toplam Miktar: {currencyFormatter.format(cartTotal)}</p>

        <Input label="İsim - Soy İsim" type="text" id="name" />
        <Input label="Mail Addresi" id="email" type="email" />
        <Input label="Sokak" type="text" id="street" />

        <div className="control-row">
          <Input label="Posta Kodu" type="" id="postal-code" />
          <Input label="Şehir" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}
