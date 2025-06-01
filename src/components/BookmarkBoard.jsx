import React from "react";
import useStore from "../utils/store";
import { IoAddOutline } from "react-icons/io5";

export const BookmarkBoard = () => {
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
            key={idx}
            className={`h-60 p-4 rounded-lg shadow-md ${bookmark.color} transition w-full`}
          >
            <h3 className="text-xl font-bold">{bookmark.title}</h3>
            {bookmark.description && (
              <p className="text-sm mt-1">{bookmark.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
