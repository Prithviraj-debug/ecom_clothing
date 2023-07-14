import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    
    const newArr = [...cartItems, {...productToAdd, quantity: 1}];

    const exArr = cartItems.map(cartItem =>
        cartItem.id === productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1} :
        cartItem);

    if (existingCartItem) {
        return exArr;
    } else {
        return newArr;
    }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        const cartItemsArr = addCartItem(cartItems, productToAdd);
        setCartTotal(cartTotal + 1);
        setCartItems(cartItemsArr);
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartTotal };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}