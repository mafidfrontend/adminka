import { create } from 'zustand'

const useMyStore = create(() => ({
    token: "",
    user: {}
}))

export default useMyStore