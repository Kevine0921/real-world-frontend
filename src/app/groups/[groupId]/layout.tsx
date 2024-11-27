"use client";
import { useGetProfileData } from "@/api/auth";
import { useGetGroupChannels } from "@/api/channel";
import { useGetGroup } from "@/api/group";
import Error from "@/components/Error";
import MainLoader from "@/components/MainLoader";
import RightSidebar from "@/components/groups/RightSidebar";
import { GroupContext } from "@/context/GroupContext";
import { useMyContext } from "@/context/MyContext";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { toast } from "sonner";
import Aside from "./Aside";

type Props = {
  children: React.ReactNode;
};

function GroupIdLayout({ children }: Props) {
  const { getGroup, isError, isLoading: groupsLoading } = useGetGroup();
  const { getChannels, isLoading: channelsLoading } = useGetGroupChannels();
  const { groupId } = useParams();
  const { group, setGroup, admins, moderators, members, isLoading } =
    useContext(GroupContext);
  const { setChannelList, setCurrentChannel, channelList } = useMyContext();
  const { currentUser } = useGetProfileData();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchGroup = async () => {
      const res = await getGroup(groupId as string);
      if (res.group !== null) {
        setGroup(res.group);
      }
    };

    fetchGroup();
  }, [groupId]);

  useEffect(() => {
    const getChannelsList = async (userId: string) => {
      const res = await getChannels({ userId, groupId: groupId as string });
      if (!res.status) toast.error(res.errors || res.message);
      setChannelList(res.channels);
    };

    if (group && currentUser) getChannelsList(currentUser?._id as string);
  }, [group]);

  useEffect(() => {
    if (channelList) {
      setCurrentChannel(channelList[0]);
      if (channelList[0]?._id) {
        router.push(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/groups/${groupId}/room/${channelList[0]?._id}`
        );
      }
    }
  }, [channelList]);

  return isError ? (
    <Error />
  ) : !group?._id || groupsLoading ? (
    <MainLoader />
  ) : (
    <div className="flex w-full text-neutral-200">
      <Aside />
      <div className="flex-grow bg-gray-900 flex">
        <div className="w-full sm:w-[75%] md:w-[70%] lg:w-[65%] xl:w-[85%] overflow-auto flex-grow relative">
          {children}
        </div>
        {!pathname.includes("/dashboard") ? (
          <RightSidebar
            groupId={groupId}
            group={group}
            admins={admins}
            moderators={moderators}
            members={members}
            isLoading={isLoading}
          />
        ) : // <LeftSideBar />
        null}
      </div>
    </div>
  );
}

export default GroupIdLayout;
