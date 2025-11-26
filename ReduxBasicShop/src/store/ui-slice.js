import { createSlice } from "@reduxjs/toolkit";

//slice'lar küçük state parçalırıdır.
const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    }, //sepete tıklandığında true/false ile görünürlülüğü açıp kapatıyoruz.
    showNotificatşon(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      }; //playload içerisinden : status, tittle, message bilgisini alır.
    },
  },
});

export const uiActions = uiSlice.actions; //dışa aktarmak için bunu kullanıyoruz.

export default uiSlice;
