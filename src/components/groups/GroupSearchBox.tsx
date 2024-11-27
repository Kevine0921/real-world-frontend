import { GroupContext } from "@/context/GroupContext";
import { Search, X } from "lucide-react";
import { ChangeEventHandler, useContext } from "react";

const GroupSearchBox = () => {
  const { isSideBarOpen, setIsSideBarOpen, setSearchWord } =
    useContext(GroupContext);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (setSearchWord) {
      setSearchWord(e.target.value);
    }
  };

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
        onChange={handleChange}
        className="bg-transparent outline-none w-full"
        placeholder="Search"
      />
      <Search />
    </div>
  );
};

export default GroupSearchBox;
