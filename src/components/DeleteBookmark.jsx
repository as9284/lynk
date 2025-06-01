import React from "react";
import { motion } from "framer-motion";
import useStore from "../utils/store";

export const DeleteBookmark = ({ bookmark, setDeleteBookmarkPopup }) => {
  const removeBookmark = useStore((state) => state.removeBookmark);

  const handleDelete = () => {
    removeBookmark(bookmark.id);
    setDeleteBookmarkPopup(false);
  };

  return (
    <motion.div
      onClick={() => setDeleteBookmarkPopup(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute w-full min-h-svh flex flex-col justify-center items-center z-50 bg-black/20 backdrop-blur-xs p-4"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.1 }}
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 min-h-[15rem] bg-white dark:bg-black rounded-lg shadow-md flex flex-col justify-center items-center gap-6 p-8"
      >
        <h2 className="text-2xl font-semibold text-center select-none">Delete Bookmark</h2>

        <p className="text-lg text-center select-none">
          Are you sure you want to delete "{bookmark.title}"?
        </p>

        <div className="w-full flex justify-center gap-4">
          <button onClick={handleDelete} className="tool-txt-btn">
            Delete
          </button>
          <button
            onClick={() => setDeleteBookmarkPopup(false)}
            className="tool-txt-btn"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
