import { createContext, useContext, useState, useMemo } from "react";
import { initialProducts } from "../data/product";

const CartContext = createContext();

export const CartProvider = (props) => {

    const [cart, setCart] = useState([]);

    const products = initialProducts;

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId, removeAll = false) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === productId);
            if (!existingItem) return prevCart;

            if (removeAll || existingItem.quantity === 1) {
                return prevCart.filter((item) => item.id !== productId);
            }

            return prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        });
    };

    const clearCart = () => setCart([]);

    const cartCount = useMemo(
        () => cart.reduce((total, item) => total + item.quantity, 0),
        [cart]
    );

    const cartTotal = useMemo(
        () => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]
    )

    // console.log("my cart=", cart);
    return (
        <CartContext.Provider
            value={{
                products,
                cart,
                addToCart,
                cartTotal,
                removeFromCart,
                clearCart,
                cartCount,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
