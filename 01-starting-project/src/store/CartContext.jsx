import { createContext, useReducer } from 'react';

const CartContext =  createContext({
    items: [],   //sepet öğelerinin listesi.
    addItem: (item) => {},
    removeItem: (id) => {},
});

function cartReducer(state, action) {

    if(action.type === 'ADD_ITEM') 
    {
        // "ADD_ITEM" işlemi: sepete bir öğe eklemek için kullanacağız

        // state.items.push(action.item); // Bu şekilde doğrudan state'i değiştirmek reducer içinde önerilmez. 
        // Başka bir durum fonksiyonu olsaydı çakışabilirdi.

        // Eklenmek istenen öğenin sepette mevcut olup olmadığını bulmak için bunu kullanıyoruz :
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        // Mevcut öğeleri kopyala (güncelleme için):
        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) 
        {
            // Öğelerden biri zaten varsa, miktarını 1 artır
            const existingCartItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else 
        {
            // Öğeler arasında yoksa, ögeyi 1 ile ekle
            updatedItems.push({...action.item, quantity: 1});
        }

        // Yeni state'i döndürüyoruz :
        return {...state, items: updatedItems};
    }

    if(action.type === 'REMOVE_ITEM') 
    {
        // "REMOVE_ITEM" işlemi: sepetteki bir ürünü azaltmak veya tamamen silmek için kullanacağız

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        // Mevcut ürünü al
        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items]; // mevcut listeyi kopyala

        if(existingCartItem.quantity === 1) 
        {
            // Ürün adedi 1 ise, tamamen listeden kaldır
            updatedItems.splice(existingCartItemIndex, 1); // ürünü listeden çıkart
        }
        else 
        {
            // Ürün adedi 1'den büyükse, adetini 1 azalt
            const updatedItem = {
                ...existingCartItem, 
                quantity: existingCartItem.quantity - 1
            };

            updatedItems[existingCartItemIndex] = updatedItem; // güncellenmiş ürün 
        }

        // Güncellenmiş items ile yeni state'i döndürüyor :
        return { ...state, items: updatedItems }
    } 

    // Action tanımlı değilse state'i aynen geri döndür
    return state;
    }

 export function CartContextProvider({ children }) {

    // useReducer ile cart (sepet) state'ini ve bu state'i güncelleyen  fonksiyon :
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    // Sepete ürün eklemek için kullanılan fonksiyon :
    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item }); // reducer'a "ADD_ITEM" action gönder
    }

    // Sepetten ürün silmek için kullanılan fonksiyon :
    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id }); // reducer'a "REMOVE_ITEM" action gönder
    }

    // Context içinde paylaşılacak değerler: sepetteki ürünler ve ekleme/silme fonksiyonları
    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    };

    return (
        // Context.Provider sayesinde alt bileşenler cart verisine ve fonksiyonlara erişebilir
        <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    );
}
 
export default CartContext;