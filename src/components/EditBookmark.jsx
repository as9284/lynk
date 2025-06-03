import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useStore from "../utils/store";
import {
  COLOR_NAMES,
  DEFAULT_COLOR,
  getColorClasses,
} from "../constants/colors";

export const EditBookmark = ({ setEditPopup, bookmark }) => {
  const updateBookmark = useStore((state) => state.updateBookmark);
  const [title, setTitle] = useState(bookmark.title);
  const [description, setDescription] = useState(bookmark.description || "");
  const [link, setLink] = useState(bookmark.link);
  const [selectedColor, setSelectedColor] = useState(
    bookmark.color || DEFAULT_COLOR
  );
  const [errors, setErrors] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const checkDarkMode = () => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDarkMode(dark);
    };

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleDescriptionChange = (e) => {
    const desc = e.target.value;
    if (desc.length <= 80) {
      setDescription(desc);
      setErrors((prev) => ({ ...prev, description: "" }));
    }
  };

  const handleUpdate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Required";
    if (!link.trim()) newErrors.link = "Required";
    if (description.length > 80)
      newErrors.description = `${description.length}/80 characters`;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    updateBookmark({
      ...bookmark,
      title,
      description,
      link,
      color: selectedColor,
    });

    setEditPopup(null);
  };

  return (
    <motion.div
      onClick={() => setEditPopup(null)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute w-full min-h-svh flex flex-col justify-center items-center z-50 bg-black/20 backdrop-blur-xs p-2 md:p-4"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.1 }}
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 min-h-[37rem] bg-white dark:bg-black rounded-lg shadow-md flex flex-col justify-start items-center gap-4"
      >
        <h2 className="w-full text-2xl font-semibold text-center pt-8 select-none dark:text-white">
          Edit Bookmark
        </h2>

        <div className="w-full flex flex-col items-center px-8 gap-6">
          {/* Title Field */}
          <div className="w-full flex flex-col items-start gap-2">
            <div className="w-full flex justify-between items-center">
              <p className="text-xl dark:text-white">Title</p>
              {errors.title && (
                <p className="text-red-400 text-xs opacity-75">
                  {errors.title}
                </p>
              )}
            </div>
            <input
              className={`simple-input ${
                errors.title ? "ring-1 ring-red-300" : ""
              }`}
              type="text"
              placeholder="Enter bookmark title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
              }}
            />
          </div>

          {/* Description Field */}
          <div className="w-full flex flex-col items-start gap-2">
            <div className="w-full flex justify-between items-center">
              <p className="text-xl dark:text-white">Description</p>
              <p
                className={`text-xs ${
                  description.length > 80
                    ? "text-red-400"
                    : "text-gray-400 dark:text-gray-500"
                } opacity-75`}
              >
                {errors.description || `${description.length}/80`}
              </p>
            </div>
            <input
              className={`simple-input ${
                errors.description ? "ring-1 ring-red-300" : ""
              }`}
              type="text"
              placeholder="Enter description (optional)"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>

          {/* Link Field */}
          <div className="w-full flex flex-col items-start gap-2">
            <div className="w-full flex justify-between items-center">
              <p className="text-xl dark:text-white">Link</p>
              {errors.link && (
                <p className="text-red-400 text-xs opacity-75">{errors.link}</p>
              )}
            </div>
            <input
              className={`simple-input ${
                errors.link ? "ring-1 ring-red-300" : ""
              }`}
              type="text"
              placeholder="Enter website link"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
                if (errors.link) setErrors((prev) => ({ ...prev, link: "" }));
              }}
            />
          </div>

          {/* Color Picker */}
          <div className="w-full flex flex-col items-center gap-3">
            <p className="text-xl dark:text-white">Bookmark Color</p>
            <div className="w-full flex justify-evenly flex-wrap">
              {COLOR_NAMES.map((colorName) => {
                const colorClasses = getColorClasses(colorName, isDarkMode);
                return (
                  <div
                    key={colorName}
                    className={`color-picker ${colorClasses.bg} ${
                      selectedColor === colorName
                        ? `ring-2 ring-offset-2 ring-offset-white dark:ring-offset-black ${colorClasses.ring}`
                        : ""
                    }`}
                    onClick={() => setSelectedColor(colorName)}
                  />
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex justify-center gap-4">
            <button onClick={handleUpdate} className="tool-txt-btn">
              Update
            </button>
            <button onClick={() => setEditPopup(null)} className="tool-txt-btn">
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
