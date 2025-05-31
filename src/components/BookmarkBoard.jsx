import React from "react";
import { IoAddOutline } from "react-icons/io5";

export const BookmarkBoard = () => {
  return (
    <>
      <div className="w-full flex flex-3/4 justify-center items-center">
        <div className="w-full flex justify-center items-center select-none">
          <h2 className="text-lg text-neutral-500 flex justify-center items-center gap-1">
            Press
            <span>
              <IoAddOutline />
            </span>
            to create a new bookmark
          </h2>
        </div>
      </div>
    </>
  );
};
