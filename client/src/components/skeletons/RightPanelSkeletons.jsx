import React from "react";

export default function RightPanelSkeletons() {
  return (
    <div
      role="status"
      className="space-x-4 animate-pulse rtl:space-x-reverse flex items-center"
    >
      <div className="flex items-center justify-center w-20 h-9 bg-gray-300 dark:bg-gray-700 rounded-full">
        <svg
          className="w-4 h-4 text-gray-200 dark:text-gray-600 rounded-full"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 10 10"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-28"></div>
        <div className="h-2 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-2 w-20 bg-gray-200 rounded-full dark:bg-gray-700 mt-4"></div>
    </div>
  );
}
