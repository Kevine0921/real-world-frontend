"use client";
import { GroupTypes, User } from "@/types";
import { FC, PropsWithChildren } from "react";
import { BsInbox, BsSearch } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import Tabs from "../custom-ui/tabs";
import GroupSearchBox from "./GroupSearchBox";
import MemberList from "./MemberList";
import GroupTitleCard from "./GroupTitleCard";
import GroupInbox from "./GroupInbox";

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
        <GroupTitleCard group={group} />

        <Tabs
          data={[
            {
              label: <BsInbox size={"20px"} />,
              content: <GroupInbox group={group} />,
            },
            {
              label: <FiUsers size={"20px"} />,
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
            {
              label: <BsSearch size={"20px"} />,
              content: (
                <div>
                  <MemberList
                    groupId={groupId}
                    group={group}
                    admins={admins}
                    moderators={moderators}
                    members={members}
                    isLoading={isLoading}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default RightSidebar;
