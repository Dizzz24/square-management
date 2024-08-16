import { create } from 'zustand';

export interface TypeCustomer {
    id: number;
    name: string;
    level: string;
    totalTransaction: number;
    favoriteMenuName: string;
}

interface CustomerState {
    data: {
        customers: TypeCustomer[];
        totalPages: number;
        totalCustomers: number;
        page: number;
        limit: number;
        search: string;
        sortBy: string;
        sortOrder: 'ASC' | 'DESC';
        level: string;
    };
    isLoading: boolean;
    error: string | null;
    setCustomers: (customers: TypeCustomer[], totalPages: number, totalCustomers: number, page: number) => void;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setSearch: (search: string) => void;
    setSortBy: (sortBy: string) => void;
    setSortOrder: (sortOrder: 'ASC' | 'DESC') => void;
    setLevel: (level: string) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

const useStore = create<CustomerState>((set) => ({
    data: {
        customers: [],
        totalPages: 0,
        totalCustomers: 0,
        page: 1,
        limit: 10,
        search: '',
        sortBy: 'name',
        sortOrder: 'ASC',
        level: '',
    },
    isLoading: false,
    error: null,

    setCustomers: (customers, totalPages, totalCustomers, page) =>
        set((state) => ({
            data: { 
                ...state.data,
                customers, 
                totalPages, 
                totalCustomers, 
                page 
            },
            isLoading: false,
            error: null,
        })),

    setPage: (page) =>
        set((state) => ({
            data: { ...state.data, page },
        })),

    setLimit: (limit) =>
        set((state) => ({
            data: { ...state.data, limit },
        })),

    setSearch: (search) =>
        set((state) => ({
            data: { ...state.data, search },
        })),

    setSortBy: (sortBy) =>
        set((state) => ({
            data: { ...state.data, sortBy },
        })),

    setSortOrder: (sortOrder) =>
        set((state) => ({
            data: { ...state.data, sortOrder },
        })),

    setLevel: (level) =>
        set((state) => ({
            data: { ...state.data, level },
        })),

    setLoading: (isLoading) =>
        set({ isLoading }),

    setError: (error) =>
        set({ error }),
}));

export default useStore;
