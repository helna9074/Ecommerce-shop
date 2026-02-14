import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
     

      setCart: (items) =>{
         if(!Array.isArray(items)) return;
        set({
         
           cartItems:items
        });
      },

      addToCart: (item) => {
        const cart = get().cartItems;

        const existing = cart.find(
          (i) =>
            String(i.productId) === String(item.productId) &&
            i.size === item.size
        );

        if (existing) {
          set({
            cartItems: cart.map((i) =>
              String(i.productId) === String(item.productId) &&
              i.size === item.size
                ? {
                    ...i,
                    quantity: Math.min(
                      i.quantity + item.quantity,
                      i.maxStock
                    ),
                  }
                : i
            ),
          });
        } else {
          set({
            cartItems: [
              ...cart,
              {
                ...item,
                quantity: Math.min(item.quantity, item.maxStock),
              },
            ],
          });
        }
      },

      decreaseQty: (productId, size) => {
        const cart = get().cartItems;

        set({
          cartItems: cart
            .map((i) =>
              String(i.productId) === String(productId) && i.size === size
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        });
      },
      // totalCount:()=>get().cartItems.length,

      removeFromCart: (productId, size) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (i) =>
              !(
                String(i.productId) === String(productId) &&
                i.size === size
              )
          ),
        })),
      

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
    
      
    }
  )
);

export default useCartStore;
