import { create } from "zustand";

const useAuthStore = create((set) => {
    const local = localStorage.getItem("auth")
    console.log(local.token)
    return {
        token: '',
        user: null,
        setAuth: (data) => set(data),
    };
});

export default useAuthStore;
