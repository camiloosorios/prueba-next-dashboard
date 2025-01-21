import { Product } from '@/types';
import { create } from 'zustand';


type Theme = 'light' | 'dark';

interface AppState {
    theme: Theme,
    categories: string[],
    products: Product[],
    setProducts: (products: Product[]) => void
    toggleTheme: (theme: Theme) => void,
    setCategories: (categories: string[]) => void,
    loadInitialData: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
    theme: 'light' as Theme,
    products: [],
    categories: [],
    setProducts: (products) => {
        set({ products })
    },
    toggleTheme: (theme) => {
        set({ theme });
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },
    setCategories: (categories) => {
        set({ categories })
    },
    loadInitialData: async () => {
        try {
            const productsResponse = await fetch('https://fakestoreapi.com/products');
            const productsData = await productsResponse.json();
            set({ products: productsData });

            const categoriesResponse = await fetch('https://fakestoreapi.com/products/categories');
            const categoriesData = await categoriesResponse.json();
            set({ categories: categoriesData });
        } catch (error) {
            console.error('Error loading initial data:', error);
        }
    },
}));