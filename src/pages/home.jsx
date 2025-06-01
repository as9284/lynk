import React, { useState } from "react";
import { Header } from "../components/Header";
import { BookmarkBoard } from "../components/BookmarkBoard";
import { CreateBookmark } from "../components/CreateBookmark";
import { AnimatePresence } from "framer-motion";

export const Home = () => {
  const [addBookmarkPopup, setAddBookmarkPopup] = useState(false);

  return (
    <>
      <AnimatePresence>
        {addBookmarkPopup && (
          <CreateBookmark setAddBookmarkPopup={setAddBookmarkPopup} />
        )}
      </AnimatePresence>

      <div className="w-full min-h-svh flex flex-col justify-start items-center p-4 gap-4">
        <Header setAddBookmarkPopup={setAddBookmarkPopup} />
        <BookmarkBoard />
      </div>
    </>
  );
};
