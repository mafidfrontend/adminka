import { create } from "zustand";

const useAuthStore = create((set) => ({
    token: "",
    user: undefined,
    setAuth: (data) => set(data),
}));

export default useAuthStore;
