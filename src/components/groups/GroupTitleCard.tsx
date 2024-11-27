import { GroupTypes } from "@/types";
import { FC, PropsWithChildren } from "react";
import { BsCart3 } from "react-icons/bs";

const GroupTitleCard: FC<PropsWithChildren<{ group?: GroupTypes }>> = ({
  group = {} as GroupTypes,
}) => {
  return (
    <div className="flex items-center gap-4 p-6 ">
      <div>
        <BsCart3 size={"30px"} />
      </div>
      <div>
        <div>{group?.group_name ?? "N/A"}</div>
        <div className="text-sm">
          <span className="text-green-600">⬤</span> 123,325 members
        </div>
      </div>
    </div>
  );
};

export default GroupTitleCard;
