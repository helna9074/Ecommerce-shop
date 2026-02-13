
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNotifyStore = create(
  persist(
    (set, get) => ({
      notifications: [],
      count: 0,

      // ➕ add a notification
      setNotification: (notifications) =>
set({
          notifications,
          count: notifications.length,
        }),
      // ❌ remove one notification
      removeNotification: (id) =>
        set((state) => {
          const updated = state.notifications.filter(
            (n) => n._id !== id
          );
          return {
            notifications: updated,
            count: updated.length,
          };
        }),

      // 🧹 clear all
      clearNotifications: () =>
        set({
          notifications: [],
          count: 0,
        }),
        markAllRead: () =>
  set((state) => ({
    ...state,
    count: 0,
  })),

    }),
    {
      name: "notifications",
    }
  )
);

export default useNotifyStore;
