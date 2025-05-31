import React from "react";
import { Header } from "../components/Header";

export const Home = () => {
  return (
    <>
      <div className="w-full min-h-svh flex flex-col justify-center items-start p-4 gap-4">
        <Header />

        <div className="w-full flex flex-3/4 justify-center items-center">
          <div className="w-full flex justify-center items-center select-none">
            <h2 className="text-lg text-neutral-500">
              Press + to create a new bookmark
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};
