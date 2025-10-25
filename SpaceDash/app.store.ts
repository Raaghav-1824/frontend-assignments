import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  login: () => {
    localStorage.setItem("token", "yourtoken");
    set({ isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false });
  },
}));




interface TableState<T> {
  search: string;
  filterColumn: string;
  sortKey: string | null;
  sortDirection: "asc" | "desc";
  currentPage: number;
  itemsPerPage: number;
  setSearch: (search: string) => void;
  setFilterColumn: (filter: string) => void;
  setSortKey: (key: string) => void;
  toggleSortDirection: () => void;
  setCurrentPage: (page: number) => void;
}

export const useTableStore = create<TableState<any>>((set) => ({
  search: "",
  filterColumn: "All",
  sortKey: null,
  sortDirection: "asc",
  currentPage: 1,
  itemsPerPage: 10,
  setSearch: (search) => set({ search }),
  setFilterColumn: (filterColumn) => set({ filterColumn }),
  setSortKey: (sortKey) => set({ sortKey }),
  toggleSortDirection: () =>
    set((state) => ({
      sortDirection: state.sortDirection === "asc" ? "desc" : "asc",
    })),
  setCurrentPage: (currentPage) => set({ currentPage }),
}));



export default useAuthStore;
