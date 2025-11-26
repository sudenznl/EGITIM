import { createSlice } from '@reduxjs/toolkit'; 

//slice'lar küçük state parçalırıdır.
const uiSlice = createSlice({
    name: 'ui',
    initialState: { cartIsVisible : false },
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        } //sepete tıklandığında true/false ile görünürlülüğü açıp kapatıyoruz.
    }
});

export const uiActions = uiSlice.actions; //dışa aktarmak için bunu kullanıyoruz.

export default uiSlice;
