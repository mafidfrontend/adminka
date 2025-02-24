import { create } from "zustand";

const useAuthStore = create(() => {
    return {
        token: "",
        user: null,
    };
});

const useLoginStore = create(() => {
    return {
        username: "",
        password: "",
    }
})

export default useAuthStore;
