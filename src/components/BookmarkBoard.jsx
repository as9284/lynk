import React from "react";
import useStore from "../utils/store";
import { IoAddOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";

export const BookmarkBoard = ({ handleDeleteClick }) => {
  const bookmarks = useStore((state) => state.bookmarks);

  if (bookmarks.length === 0) {
    return (
      <div className="w-full flex justify-center items-center select-none">
        <h2 className="text-lg text-neutral-500 flex items-center gap-1">
          Press <IoAddOutline /> to create a new bookmark
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full px-2 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {bookmarks.map((bookmark, idx) => (
          <div
            key={bookmark.id}
            className={`relative h-60 p-6 rounded-lg shadow-sm ${bookmark.color} w-full hover:shadow-md hover:scale-[1.02] duration-200`}
          >
            <h3 className="text-2xl font-bold truncate select-none">
              {bookmark.title}
            </h3>
            {bookmark.description && (
              <p className="text-base mt-1 line-clamp-4 leading-relaxed select-none">
                {bookmark.description}
              </p>
            )}
            <button
              onClick={() => handleDeleteClick(bookmark)}
              className="card-btn absolute bottom-4 right-4 group"
            >
              <FaTrash size={24} />
              <span className="tooltip">Delete</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
