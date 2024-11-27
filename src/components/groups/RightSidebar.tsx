"use client";
import { GroupTypes, User } from "@/types";
import { FC, PropsWithChildren } from "react";
import GroupSearchBox from "./GroupSearchBox";
import MemberList from "./MemberList";

const RightSidebar: FC<
  PropsWithChildren<{
    groupId?: string | string[];
    group?: GroupTypes;
    admins?: Array<User>;
    moderators?: Array<User>;
    members?: Array<User>;
    isLoading?: boolean;
  }>
> = ({
  groupId = "",
  group = {} as GroupTypes,
  admins = [],
  moderators = [],
  members = [],
  isLoading = false,
}) => {
  return (
    <div className="flex-grow flex flex-col items-stretch gap-2 p-2  bg-gray-800">
      <GroupSearchBox />
      <div className="flex-grow">
        <MemberList
          groupId={groupId}
          group={group}
          admins={admins}
          moderators={moderators}
          members={members}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default RightSidebar;
