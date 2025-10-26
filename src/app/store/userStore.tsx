import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserStore {
	user: boolean;
	setUser: (value: boolean) => void;
	userType: 'normal' | 'empresa' | null;
	setUserType: (type: 'normal' | 'empresa' | null) => void;
}

export const useUserStore = create<UserStore>()(
	persist(
		(set) => ({
			user: false,
			setUser: (value) => set({ user: value }),
			userType: null,
			setUserType: (type) => set({ userType: type }),
		}),
		{
			name: 'user-storage', // nombre de la clave en localStorage
			storage: createJSONStorage(() => localStorage), // usa localStorage
		}
	)
);
