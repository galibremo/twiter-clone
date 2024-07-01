import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col border-r border-gray-700 min-h-screen w-full lg:w-[750px]">
      Profile
    </div>
  );
}
