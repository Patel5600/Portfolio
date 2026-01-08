import { create } from 'zustand'

interface State {
    modalContent: string | null
    setModalContent: (content: string | null) => void
}

export const useStore = create<State>((set) => ({
    modalContent: null,
    setModalContent: (content) => set({ modalContent: content }),
}))
