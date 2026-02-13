import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import React from 'react'
import useCartStore from './Cartstore';
import useWishliststore from './Wishliststore';



const useAuthstore = create(
  persist(
    (set) => ({
      username: null,
      useremail: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,

      setHasHydrated: () => set({ hasHydrated: true }),

      login: (token, username, useremail) => {
        set({
          token,
          username,
          useremail,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          token: null,
          username: null,
          useremail: null,
          isAuthenticated: false,
        });
        useCartStore.getState().clearCart();
    useWishliststore.getState().clearWishlist();
      },
    }),
    {
      name: "auth-storage",
    merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        hasHydrated: true,
      }),
    }
  )
);



export default useAuthstore
