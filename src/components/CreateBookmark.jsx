import React from "react";
import { motion } from "framer-motion";

export const CreateBookmark = ({ setAddBookmarkPopup }) => {
  return (
    <motion.div
      onClick={() => setAddBookmarkPopup(false)}
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
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-[25rem] bg-white rounded-lg shadow-md flex justify-center items-center relative"
      >
        <h2 className="absolute top-8 left-8 text-2xl font-medium select-none">
          Create Bookmark
        </h2>
      </motion.div>
    </motion.div>
  );
};
