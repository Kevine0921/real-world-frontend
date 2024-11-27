import { GroupContext } from "@/context/GroupContext";
import React, { useContext } from "react";
import ChannelDetails from "./GroupChannelDetails";

function Aside() {
  const { isSideBarOpen, isMemberListOpen, windowWidth } =
    useContext(GroupContext);

  return (
    <div
      className={`bg-gray-800 h-full text-neutral-200 capitalize transition-all duration-300 border-x-2 border-gray-600
                ${
                  isMemberListOpen && windowWidth! <= 1025
                    ? "w-full absolute top-0 left-0 h-full bg-blue-500 z-50"
                    : "relative hidden w-[300px]"
                }
                md:block`}
    >
      <ChannelDetails />
    </div>
  );
}

export default Aside;
