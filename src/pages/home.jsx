import React, { useState } from "react";
import { Header } from "../components/Header";
import { BookmarkBoard } from "../components/BookmarkBoard";
import { CreateBookmark } from "../components/CreateBookmark";
import { DeleteBookmark } from "../components/DeleteBookmark";
import { AnimatePresence } from "framer-motion";

export const Home = () => {
  const [addBookmarkPopup, setAddBookmarkPopup] = useState(false);
  const [deleteBookmarkPopup, setDeleteBookmarkPopup] = useState(false);
  const [bookmarkToDelete, setBookmarkToDelete] = useState(null);

  const handleDeleteClick = (bookmark) => {
    setBookmarkToDelete(bookmark);
    setDeleteBookmarkPopup(true);
  };

  return (
    <>
      <AnimatePresence>
        {addBookmarkPopup && (
          <CreateBookmark setAddBookmarkPopup={setAddBookmarkPopup} />
        )}
        {deleteBookmarkPopup && bookmarkToDelete && (
          <DeleteBookmark
            bookmark={bookmarkToDelete}
            setDeleteBookmarkPopup={setDeleteBookmarkPopup}
          />
        )}
      </AnimatePresence>
      <div className="w-full min-h-svh flex flex-col justify-start items-center p-4 gap-4">
        <Header setAddBookmarkPopup={setAddBookmarkPopup} />
        <BookmarkBoard handleDeleteClick={handleDeleteClick} />
      </div>
    </>
  );
};
