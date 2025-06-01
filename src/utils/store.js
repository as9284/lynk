import { create } from "zustand";

const useStore = create((set) => ({
  bookmarks: JSON.parse(localStorage.getItem("bookmarks") || "[]"),
  addBookmark: (entry) =>
    set((state) => {
      const updated = [...state.bookmarks, entry];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return { bookmarks: updated };
    }),
}));

export default useStore;
