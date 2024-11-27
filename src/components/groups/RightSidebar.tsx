"use client";
import { GroupTypes, User } from "@/types";
import { FC, PropsWithChildren } from "react";
import Tabs from "../custom-ui/tabs";
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
        <Tabs
          data={[
            { label: "Inbox", content: <div></div> },
            {
              label: "Member",
              content: (
                <MemberList
                  groupId={groupId}
                  group={group}
                  admins={admins}
                  moderators={moderators}
                  members={members}
                  isLoading={isLoading}
                />
              ),
            },
            { label: "Search", content: <div></div> },
          ]}
        />
      </div>
    </div>
  );
};

export default RightSidebar;
