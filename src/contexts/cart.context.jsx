import { createContext, useEffect, useState } from "react";

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

const removeItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map(cartItem =>
        cartItem.id === productToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1} :
        cartItem);
}

const deleteItem = (cartItems, productToDelete) => {
    return cartItems.filter(cartItem => cartItem.id !== productToDelete.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartTotal: 0,
    removeItemFromCart: () => {},
    deleteItemFromCart: () => {},
    cartTotalPrice: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => {
        const cartTotal = cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
        setCartTotal(cartTotal);
    }, [cartItems]);

    useEffect(() => {
        const cartTotalPrice = cartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);
        setCartTotalPrice(cartTotalPrice);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        const cartItemsArr = addCartItem(cartItems, productToAdd);
        setCartItems(cartItemsArr);
    }

    const removeItemFromCart = (productToRemove) => {
        const cartItemsArr = removeItem(cartItems, productToRemove);
        setCartTotal(cartTotal - 1);
        setCartItems(cartItemsArr);
    }

    const deleteItemFromCart = (productToDelete) => {
        const cartItemsArr = deleteItem(cartItems, productToDelete);
        setCartTotal(cartTotal - productToDelete.quantity);
        setCartItems(cartItemsArr);
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, deleteItemFromCart, cartItems, cartTotal, cartTotalPrice };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}