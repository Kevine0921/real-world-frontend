import GroupMemberItem from "@/components/groups/GroupMemberItem";
import { GroupContext } from "@/context/GroupContext";
import { User } from "@/types";
import { useContext, useState } from "react";

type Props = {
  isLoading: boolean;
  admins: User[];
  moderators: User[];
  members: User[];
};

function MemberTable({ admins, moderators, members, isLoading }: Props) {
  const {
    group,
    privateChannelMembers,
    isSideBarOpen,
    setIsSideBarOpen,
    windowWidth,
  } = useContext(GroupContext);
  const [q, setQ] = useState("");

  return (
    <div
      className={`w-full h-full overflow-hidden ${
        isSideBarOpen && windowWidth! <= 1025
          ? "block absolute w-full top-0 left-0 bg-blue-500 h-full"
          : "hidden"
      } lg:block`}
    >
      <div className="text-center p-2">{group?.group_name}</div>
      <div className="text-center ">{members?.length}</div>
      <>
        {q ? (
          members?.map((member, index) => {
            if (
              member.lastName.toLowerCase().includes(q.toLowerCase()) ||
              member.firstName.toLowerCase().includes(q.toLowerCase())
            ) {
              return <GroupMemberItem key={index} {...member} />;
            } else {
              return null;
            }
          })
        ) : isLoading ? (
          <div className="w-full p-2 grid place-content-center">
            loading ...
          </div>
        ) : privateChannelMembers?.length > 0 ? (
          // <div className='p-2'>
          //     <h1 className='p-1   text-[0.9rem] mb-2 capitalize'>Channel members ({privateChannelMembers.length})</h1>
          //     {
          //         privateChannelMembers?.length === 0 ? "No members" : privateChannelMembers.map((admin, index) => (
          //             <GroupMemberItem key={index} {...admin} />
          //         ))
          //     }
          // </div>
          <>
            <div className="w-full p-2 mb-3 ">
              <h1 className="p-1   text-[0.9rem] mb-2 capitalize">
                Admins (
                {
                  privateChannelMembers.filter(
                    (member) => member.role.role_name === "ChannelAdmin"
                  ).length
                }
                )
              </h1>
              {privateChannelMembers.filter(
                (member) => member.role.role_name === "ChannelAdmin"
              ).length === 0 ? (
                <div className="text-sm pl-8">No admins</div>
              ) : (
                privateChannelMembers
                  .filter((member) => member.role.role_name === "ChannelAdmin")
                  .map((admin, index) => (
                    <GroupMemberItem key={index} {...admin} />
                  ))
              )}
            </div>

            <div className="w-full p-2 mb-3 ">
              <h1 className="p-1 text-[0.9rem] mb-2 capitalize">
                Moderators (
                {
                  privateChannelMembers.filter(
                    (member) => member.role.role_name === "ChannelModerator"
                  ).length
                }
                )
              </h1>
              {privateChannelMembers.filter(
                (member) => member.role.role_name === "ChannelModerator"
              ).length === 0 ? (
                <div className="text-sm pl-8">No moderators</div>
              ) : (
                privateChannelMembers
                  .filter(
                    (member) => member.role.role_name === "ChannelModerator"
                  )
                  .map((moderator, index) => (
                    <GroupMemberItem key={index} {...moderator} />
                  ))
              )}
            </div>

            <div className="w-full p-2 mb-3 ">
              <h1 className="p-1   text-[0.9rem] mb-2 capitalize">
                All Members (
                {privateChannelMembers.filter((member) => member).length})
              </h1>
              {privateChannelMembers.length === 0
                ? "No other members"
                : privateChannelMembers
                    .filter((member) => member)
                    .map((member, index) => (
                      <GroupMemberItem key={index} {...member} />
                    ))}
            </div>
          </>
        ) : (
          <>
            <div className="w-full p-2 mb-3 ">
              <h1 className="p-1   text-[0.9rem] mb-2 capitalize">
                Admins ({admins.length})
              </h1>
              {admins.length === 0 ? (
                <div className="text-xs pl-8">No moderators</div>
              ) : (
                admins.map((admin, index) => (
                  <GroupMemberItem key={index} {...admin} />
                ))
              )}
            </div>

            <div className="w-full p-2 mb-3 ">
              <h1 className="p-1   text-[0.9rem] mb-2 capitalize">
                Moderators ({moderators.length})
              </h1>
              {moderators.length === 0
                ? "No moderators"
                : moderators.map((moderator, index) => (
                    <GroupMemberItem key={index} {...moderator} />
                  ))}
            </div>

            <div className="w-full p-2 mb-3 ">
              <h1 className="p-1   text-[0.9rem] mb-2 capitalize">
                All Members ({members.length})
              </h1>
              {members.length === 0
                ? "No other members"
                : members.map((member, index) => (
                    <GroupMemberItem key={index} {...member} />
                  ))}
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default MemberTable;
