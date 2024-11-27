"use client";
import Cookies from "js-cookie";
import { useGetAllGroups } from "@/api/group";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Chatroom, GroupTypes, User } from "@/types";
import { useMyContext } from "@/context/MyContext";
export default function Main() {
  const router = useRouter();
  const access_token = Cookies.get("access-token");
  const handleLogout = () => {
    // Here you would typically call your logout function
    // For this example, we'll just redirect to the home page
    router.push("/");
  };
  const { groupNotificationFlag, sendMsgGroupId, groupList, onlineUsers } =
    useMyContext();
  console.log("==============groupList===", groupList);

  useEffect(() => {
    if (!access_token) {
      window.location.href = "/public_pages/signin";
    }
  }, [access_token]);

  return (
    <div className="min-h-screen flex flex-col justify-between p-8 bg-gray-950 ">
      <div className="flex  items-center w-full ml-10 p-8">
        {" "}
        {/* Changed from w-[15%] to w-full */}
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="w-auto bg-[#FDB347] hover:bg-[#E69F35] text-black font-semibold py-6 px-12" // Added w-auto and px-12 for better sizing
        >
          Logout
        </Button>
      </div>
      <div className="flex-grow flex flex-col md:flex-row justify-center items-center gap-8">
        <div
          onClick={() => router.push(`/groups/${groupList?.[0]?.group_id}`)}
          className="w-full md:w-1/4 aspect-square hover:shadow-md hover:cursor-pointer hover:shadow-gray-700 text-yellow-500 bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-4xl font-bold"
        >
          {" "}
          Let's chat here
        </div>
        <div className="w-full md:w-1/4 aspect-square hover:shadow-md hover:cursor-pointer hover:shadow-gray-700 text-yellow-500 bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-4xl font-bold">
          Box
        </div>
        <div className="w-full md:w-1/4 aspect-square hover:shadow-md hover:cursor-pointer hover:shadow-gray-700 text-yellow-500 bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-4xl font-bold">
          Box
        </div>
      </div>
    </div>
  );
}
