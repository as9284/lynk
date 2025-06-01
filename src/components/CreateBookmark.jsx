import React, { useState } from "react";
import { motion } from "framer-motion";
import useStore from "../utils/store";

const colorRingMap = {
  "bg-sky-200": "ring-sky-400",
  "bg-teal-200": "ring-teal-400",
  "bg-emerald-200": "ring-emerald-400",
  "bg-indigo-200": "ring-indigo-400",
  "bg-fuchsia-200": "ring-fuchsia-400",
  "bg-red-200": "ring-red-400",
  "bg-neutral-200": "ring-neutral-400",
};

export const CreateBookmark = ({ setAddBookmarkPopup }) => {
  const addBookmark = useStore((state) => state.addBookmark);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-sky-200");
  const [errors, setErrors] = useState({});

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;

    if (newDescription.length <= 80) {
      setDescription(newDescription);
      setErrors((prev) => ({ ...prev, description: "" }));
    }
  };

  const handleCreate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Required";
    }

    if (!link.trim()) {
      newErrors.link = "Required";
    }

    if (description.length > 80) {
      newErrors.description = `${description.length}/80 characters`;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    addBookmark({
      id: crypto.randomUUID(),
      title,
      description,
      link,
      color: selectedColor,
    });

    setTitle("");
    setDescription("");
    setLink("");
    setSelectedColor("bg-sky-200");
    setErrors({});
    setAddBookmarkPopup(false);
  };

  return (
    <motion.div
      onClick={() => setAddBookmarkPopup(false)}
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
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 min-h-[38rem] bg-white rounded-lg shadow-md flex flex-col justify-start items-center gap-4"
      >
        <h2 className="w-full text-2xl font-semibold text-center pt-8 select-none">
          Create Bookmark
        </h2>

        <div className="w-full flex flex-col items-center px-8 gap-6">
          <div className="w-full flex flex-col items-start gap-2">
            <div className="w-full flex justify-between items-center">
              <p className="text-xl select-none">Title</p>
              {errors.title && (
                <p className="text-red-400 text-xs opacity-75 select-none">
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
                if (errors.title) {
                  setErrors((prev) => ({ ...prev, title: "" }));
                }
              }}
            />
          </div>

          <div className="w-full flex flex-col items-start gap-2">
            <div className="w-full flex justify-between items-center">
              <p className="text-xl select-none">Description</p>
              <p
                className={`text-xs ${
                  description.length > 80 ? "text-red-400" : "text-gray-400"
                } opacity-75 select-none`}
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

          <div className="w-full flex flex-col items-start gap-2">
            <div className="w-full flex justify-between items-center">
              <p className="text-xl select-none">Link</p>
              {errors.link && (
                <p className="text-red-400 text-xs opacity-75 select-none">
                  {errors.link}
                </p>
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
                if (errors.link) {
                  setErrors((prev) => ({ ...prev, link: "" }));
                }
              }}
            />
          </div>

          <div className="w-full flex flex-col items-center gap-3">
            <p className="text-xl select-none">Bookmark Color</p>
            <div className="w-full flex justify-evenly flex-wrap">
              {Object.keys(colorRingMap).map((colorClass) => (
                <div
                  key={colorClass}
                  className={`color-picker ${colorClass} ${
                    selectedColor === colorClass
                      ? `ring-2 ring-offset-2 ring-offset-white ${colorRingMap[colorClass]} duration-200`
                      : ""
                  }`}
                  onClick={() => setSelectedColor(colorClass)}
                />
              ))}
            </div>
          </div>

          <div className="w-full flex justify-center gap-4">
            <button onClick={handleCreate} className="tool-txt-btn">
              Create
            </button>
            <button
              onClick={() => setAddBookmarkPopup(false)}
              className="tool-txt-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
