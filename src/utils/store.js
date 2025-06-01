import { create } from "zustand";

const useStore = create((set) => {
  const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  const savedTheme = localStorage.getItem("theme") || "light";

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return {
    bookmarks: savedBookmarks,
    darkMode: savedTheme === "dark",

    setDarkMode: (enabled) => {
      localStorage.setItem("theme", enabled ? "dark" : "light");
      document.documentElement.classList.toggle("dark", enabled);
      set({ darkMode: enabled });
    },

    addBookmark: (entry) =>
      set((state) => {
        const updated = [...state.bookmarks, entry];
        localStorage.setItem("bookmarks", JSON.stringify(updated));
        return { bookmarks: updated };
      }),

    removeBookmark: (id) =>
      set((state) => {
        const updated = state.bookmarks.filter(
          (bookmark) => bookmark.id !== id
        );
        localStorage.setItem("bookmarks", JSON.stringify(updated));
        return { bookmarks: updated };
      }),
  };
});

export default useStore;
