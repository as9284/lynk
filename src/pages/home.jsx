import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { BookmarkBoard } from "../components/BookmarkBoard";
import { CreateBookmark } from "../components/CreateBookmark";
import { DeleteBookmark } from "../components/DeleteBookmark";
import { AnimatePresence } from "framer-motion";
import { Settings } from "../components/Settings";
import { EditBookmark } from "../components/EditBookmark";

export const Home = () => {
  const [addBookmarkPopup, setAddBookmarkPopup] = useState(false);
  const [deleteBookmarkPopup, setDeleteBookmarkPopup] = useState(false);
  const [settingsPopup, setSettingsPopup] = useState(false);
  const [bookmarkToDelete, setBookmarkToDelete] = useState(null);
  const [editPopup, setEditPopup] = useState(null);

  const handleDeleteClick = (bookmark) => {
    setBookmarkToDelete(bookmark);
    setDeleteBookmarkPopup(true);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

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
        {settingsPopup && <Settings setSettingsPopup={setSettingsPopup} />}
        {editPopup && (
          <EditBookmark setEditPopup={setEditPopup} bookmark={editPopup} />
        )}
      </AnimatePresence>

      <div className="w-full min-h-svh flex flex-col justify-start items-center p-4 gap-4">
        <Header
          setAddBookmarkPopup={setAddBookmarkPopup}
          setSettingsPopup={setSettingsPopup}
        />
        <BookmarkBoard
          handleDeleteClick={handleDeleteClick}
          setEditPopup={setEditPopup}
        />
      </div>
    </>
  );
};
