import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { TiCog } from "react-icons/ti";

export const Header = ({ setAddBookmarkPopup }) => {
  return (
    <>
      <div className="w-full h-20 flex justify-between items-center px-2 md:px-8">
        <h1 className="text-3xl font-medium select-none">Lynk</h1>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setAddBookmarkPopup(true)}
            className="tool-btn relative group"
          >
            <IoAddOutline size={30} />
            <span className="tooltip">New</span>
          </button>

          <button className="tool-btn relative group">
            <TiCog size={30} />
            <span className="tooltip">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};
