import { UserDataSimplified } from '@/types/user/user.types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserStore {
	user: UserDataSimplified | null ;
	setUser: (value: UserDataSimplified | null ) => void;
	clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
	persist(
		(set) => ({
			user: null,
			setUser: (value) => set({ user: value }),
			clearUser: () => set({ user: null }),
		}),
		{
			name: 'user-storage', 
			storage: createJSONStorage(() => localStorage), 
		}
	)
);

interface CompanyStore {
	company: UserDataSimplified | null;
	setCompany: (value: UserDataSimplified | null) => void;
	clearCompany: () => void;
}

export const useCompanyStore = create<CompanyStore>()(
	persist(
		(set) => ({
			company: null,
			setCompany: (value) => set({ company: value }),
			clearCompany: () => set({ company: null }),
		}),
		{
			name: 'company-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
);
