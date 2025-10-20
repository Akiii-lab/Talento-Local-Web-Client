import { create } from 'zustand';

interface UserStore {
	user: boolean;
	setUser: (value: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
	user: false,
	setUser: (value) => set({ user: value }),
}));
