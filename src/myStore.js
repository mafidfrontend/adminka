import { create } from "zustand";

const useAuthStore = create((set) => {
    const local = JSON.parse(localStorage.getItem("auth")) || {};

    return {
        token: local.token || null,
        user: local.user || null,
        setAuth: (data) => {
            set(data);
            localStorage.setItem("auth", JSON.stringify(data));
        },
        logout: () => {
            set({ token: null, user: null });
            localStorage.removeItem("auth");
        }
    };
});

export default useAuthStore;