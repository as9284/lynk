import React, { useState } from "react";
import useStore from "../utils/store";
import { IoAddOutline } from "react-icons/io5";
import { FaPen, FaTrash } from "react-icons/fa6";
import { getColorClasses } from "../constants/colors";

export const BookmarkBoard = ({ handleDeleteClick, setEditPopup }) => {
  const bookmarks = useStore((state) => state.bookmarks);
  const darkMode = useStore((state) => state.darkMode);
  const [failedFavicons, setFailedFavicons] = useState({});

  const handleFaviconError = (id) => {
    setFailedFavicons((prev) => ({ ...prev, [id]: true }));
  };

  const getFaviconUrl = (link) => {
    try {
      const hostname = new URL(link).hostname;
      return `https://icons.duckduckgo.com/ip3/${hostname}.ico`;
    } catch {
      return "";
    }
  };

  if (bookmarks.length === 0) {
    return (
      <div className="w-full flex-1 flex justify-center items-center select-none">
        <h2 className="text-lg text-neutral-500 flex items-center gap-1">
          Press <IoAddOutline /> to create a new bookmark
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full px-2 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {bookmarks.map((bookmark) => {
          const colorClasses = getColorClasses(bookmark.color, darkMode);
          const showFavicon = !failedFavicons[bookmark.id];
          const faviconUrl = getFaviconUrl(bookmark.link);

          return (
            <div
              onClick={() => window.open(bookmark.link, "_blank")}
              key={bookmark.id}
              className={`relative h-60 p-6 rounded-lg shadow-sm ${colorClasses.bg} w-full hover:shadow-md hover:scale-[1.02] duration-200 cursor-pointer`}
            >
              <h3 className="text-2xl font-bold truncate select-none">
                {bookmark.title}
              </h3>

              {bookmark.description && (
                <p className="text-base mt-1 line-clamp-4 leading-relaxed select-none">
                  {bookmark.description}
                </p>
              )}

              <div className="absolute bottom-4 right-4 flex items-center justify-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditPopup(bookmark);
                  }}
                  className="card-btn group"
                >
                  <FaPen size={24} />
                  <span className="tooltip">Edit</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(bookmark);
                  }}
                  className="card-btn group"
                >
                  <FaTrash size={24} />
                  <span className="tooltip">Delete</span>
                </button>
              </div>

              <p className="text-sm opacity-70 truncate select-none">
                {bookmark.link}
              </p>

              {showFavicon && faviconUrl && (
                <img
                  src={faviconUrl}
                  alt="favicon"
                  className="absolute bottom-4 left-4 w-10 h-10"
                  onError={() => handleFaviconError(bookmark.id)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
