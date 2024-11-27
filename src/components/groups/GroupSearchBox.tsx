import { GroupContext } from "@/context/GroupContext";
import { Search, X } from "lucide-react";
import { useContext, useState } from "react";

const GroupSearchBox = () => {
  const {
    group,
    privateChannelMembers,
    isSideBarOpen,
    setIsSideBarOpen,
    windowWidth,
  } = useContext(GroupContext);
  const [searchWord, setSearchWord] = useState("");

  return (
    <div className="w-full flex justify-between items-center py-2 px-4   rounded-full bg-gray-900 text-neutral-200 overflow-hidden">
      {isSideBarOpen && (
        <span
          className="p-2 cursor-pointer"
          onClick={() => setIsSideBarOpen(false)}
        >
          <X />
        </span>
      )}
      <input
        name="q"
        onChange={(e) => setSearchWord(e.target.value)}
        className="bg-transparent outline-none w-full"
        placeholder="Search"
      />
      <Search />
    </div>
  );
};

export default GroupSearchBox;
