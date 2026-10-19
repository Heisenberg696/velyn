import { createContext, useState, useEffect} from "react";
import perfumes from "../perfumes";

export const CartContext = createContext(null);

const restoreCart = () => {
    try {
        const savedCart = localStorage.getItem("cart");
        if (!savedCart) return [];

        const parsed = JSON.parse(savedCart);
        if (!Array.isArray(parsed)) return [];

        return parsed.reduce((validItems, item) => {
            if (!item || typeof item !== "object") return validItems;

            const product = item.slug
                ? perfumes.find((perfume) => perfume.slug === item.slug)
                : undefined;

            if (!product) return validItems;

            const quantity = Number(item.quantity);
            validItems.push({
                ...product,
                quantity: Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1,
            });
            return validItems;
        }, []);
    } catch {
        return [];
    }
};

const stockOf = (product) => {
    const stock = Number(product?.stock);
    return Number.isFinite(stock) && stock > 0 ? stock : Infinity;
};

const clampQuantity = (quantity, stock) => {
    const qty = Math.floor(Number(quantity));
    const safeQty = Number.isFinite(qty) && qty > 0 ? qty : 1;
    return Math.min(safeQty, stock);
};

export function CartProvider ({children}) {

    const [cart, setCart] = useState(restoreCart);


    const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen((prev) => !prev);
   


    const addToCart = (product, quantity = 1) => {
        const stock = stockOf(product);

        setCart((prevCart) => {
            const existingProduct = prevCart.find((cartProduct) =>
                cartProduct.id === product.id
            );

            if (existingProduct) {
                return prevCart.map((cartProduct) =>
                    cartProduct.id === product.id
                    ? {...cartProduct, quantity: clampQuantity(cartProduct.quantity + quantity, stock)}
                    : cartProduct   
                ); 
            } else {
                return [...prevCart, { ...product, quantity: clampQuantity(quantity, stock) }]; 
            }
        })

        openCart();
    }


    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((cartProduct) => cartProduct.id !== id));
    }

    const updateQuantity = (id, quantity) => {
        setCart((prevCart) =>
        prevCart.map((cartProduct) =>
            cartProduct.id === id
                ? { ...cartProduct, quantity: clampQuantity(quantity, stockOf(cartProduct)) }
                : cartProduct)
        )
    }

    const clearCart = () => {
        setCart([]);
    }

    // calculating the total in terms of quantity
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    // calculating the total in terms of item
    
    const cartTotal = cart.reduce((total, item) => {
        const priceToUse = item.salePrice ?? item.price;
        return total + (priceToUse * item.quantity)
    }, 0)
    


    const value = { cart, cartCount, cartTotal, isCartOpen, setCart, addToCart, removeFromCart, updateQuantity, clearCart, openCart,
        closeCart, toggleCart}

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}