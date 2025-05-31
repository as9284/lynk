import React from "react";
import { Header } from "../components/Header";
import { BookmarkBoard } from "../components/BookmarkBoard";

export const Home = () => {
  return (
    <>
      <div className="w-full min-h-svh flex flex-col justify-center items-start p-4 gap-4">
        <Header />
        <BookmarkBoard />
      </div>
    </>
  );
};
