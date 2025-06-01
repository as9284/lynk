import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useStore from "../utils/store";

export const Settings = ({ setSettingsPopup }) => {
  const darkMode = useStore((state) => state.darkMode);
  const setDarkMode = useStore((state) => state.setDarkMode);
  const [clickCount, setClickCount] = React.useState(0);
  const resetTimer = useRef(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleClearClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (resetTimer.current) clearTimeout(resetTimer.current);

    if (newClickCount >= 2) {
      localStorage.clear();
      window.location.reload();
    } else {
      resetTimer.current = setTimeout(() => {
        setClickCount(0);
      }, 2000);
    }
  };

  return (
    <motion.div
      onClick={() => setSettingsPopup(false)}
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
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 min-h-[15rem] bg-white dark:bg-black rounded-lg shadow-md flex flex-col justify-center items-center gap-6 p-8 transition-colors"
      >
        <h2 className="w-full text-2xl font-semibold text-center pt-4 select-none dark:text-white">
          Settings
        </h2>

        <div className="flex items-center justify-between w-full">
          <label className="text-lg dark:text-white select-none">
            Dark Mode
          </label>
          <button
            onClick={toggleDarkMode}
            className={`w-12 h-6 flex items-center rounded-full px-1 transition-colors ${
              darkMode ? "bg-neutral-700" : "bg-neutral-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="w-full text-center">
          <button
            onClick={handleClearClick}
            className={`relative px-4 py-2 rounded cursor-pointer duration-200 ${
              clickCount === 1
                ? "bg-red-600 hover:bg-red-400 text-white"
                : "bg-red-500 hover:bg-red-400 text-white"
            }`}
          >
            {clickCount === 0 ? "Clear Data" : "Click Again to Confirm"}
          </button>
          <p className="text-sm text-neutral-500 mt-1 dark:text-neutral-300 select-none">
            {clickCount === 0
              ? "Double click to clear all local data"
              : "Click again within 2 seconds to confirm"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
