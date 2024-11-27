"use client";
import { GroupTypes, User } from "@/types";
import { FC, PropsWithChildren } from "react";
import LoadingContainer from "../LoadingContainer";
import MemberTable from "./MemberTable";

const MemberList: FC<
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
    <LoadingContainer className="w-full h-full" isLoading={isLoading}>
      <MemberTable
        isLoading={isLoading}
        admins={admins}
        moderators={moderators}
        members={members}
      />
    </LoadingContainer>
  );
};

export default MemberList;
