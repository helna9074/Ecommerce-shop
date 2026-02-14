import { create } from "zustand";
import { persist } from "zustand/middleware";


const useAdminStore = create(
  persist(
    (set) => ({
        isAuthenticated:false,
      token: null,
      admin: null,

      login: (token,admin) => {
        

        set({
            isAuthenticated:true,
          token,
          admin
        });
      },

      logout: () => {
        set({ token: null, admin: null ,isAuthenticated:false});
        window.location.replace("/admin/login");
      },
    }),
    {
      name: "admin-auth", // localStorage key
    }
  )
);

export default useAdminStore;
