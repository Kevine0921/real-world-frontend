import { GroupTypes, Message } from "@/types";
import React, { FC, PropsWithChildren } from "react";
import MessagesList from "../chat/MessagesList";

const GroupInbox: FC<PropsWithChildren<{ group?: GroupTypes }>> = ({
  group = {} as GroupTypes,
}) => {
  return (
    <div className="p-2">
      <MessagesList
        groupedMessages={
          {
            "November 27, 2024": [
              {
                _id: "674670129a11a33e26998ec7",
                sender: {
                  _id: "6745cbd7d7767d4fac6742f8",
                  email: "tun1@gmail.com",
                  password:
                    "$2a$10$sS56o8G58I17yJREArS1c.FT110r1vXqJLGVotVgy/fMeKpC/bhDq",
                  firstName: "Tu",
                  lastName: "Lay",
                  phone: "7136365780",
                  profile_pic:
                    "https://res.cloudinary.com/djehh7gum/image/upload/v1729056803/k6eviapycaxss3e12v5e.png",
                  is_demo: 0,
                  is_active: false,
                  del_falg: 0,
                  verified: false,
                  otp: 105339,
                  suspended: false,
                  otpExpiryTime: "2024-11-26T13:53:35.175Z",
                  salt: "$2a$10$sS56o8G58I17yJREArS1c.",
                  active_status: "online",
                  role: "User",
                  securityQuestions: [
                    {
                      _id: "6745cbd7d7767d4fac6742f6",
                      question: "What was the name of your first pet?",
                      answer: "",
                    },
                    {
                      _id: "6745cbd7d7767d4fac6742f7",
                      question:
                        "What is the name of the street you grew up on?",
                      answer: "",
                    },
                  ],
                  is_complete: false,
                  date_joined: "2024-11-26T13:23:35.196Z",
                  createdAt: "2024-11-26T13:23:35.201Z",
                  updatedAt: "2024-11-26T13:23:35.254Z",
                  __v: 0,
                  wallet: "26110000900010",
                },
                sender_id: "6745cbd7d7767d4fac6742f8",
                content: "Hi!",
                createdAt: "2024-11-27T01:04:18.584Z",
                edited: false,
                attachmentUrls: null,
                updatedAt: "2024-11-27T01:04:18.584Z",
                pinned: false,
                reactions: [],
              },
              {
                _id: "6746e3477d96329ab65b774c",
                sender: {
                  _id: "6746e1297d96329ab65b75ae",
                  email: "hdreamdev@gmail.com",
                  password:
                    "$2a$10$wlTIPPhrthuyHF/Z3lUkv.SXPl4NaYU.mB0J4DsbRpLNuGBD6aLza",
                  firstName: "Rowell",
                  lastName: "Camero",
                  phone: "6395924568",
                  profile_pic:
                    "https://res.cloudinary.com/djehh7gum/image/upload/v1729056803/k6eviapycaxss3e12v5e.png",
                  is_demo: 0,
                  is_active: false,
                  del_falg: 0,
                  verified: false,
                  otp: 780420,
                  suspended: false,
                  otpExpiryTime: "2024-11-27T09:36:49.662Z",
                  salt: "$2a$10$wlTIPPhrthuyHF/Z3lUkv.",
                  active_status: "online",
                  role: "User",
                  securityQuestions: [
                    {
                      _id: "6746e1297d96329ab65b75ac",
                      question: "What was the name of your first pet?",
                      answer: "",
                    },
                    {
                      _id: "6746e1297d96329ab65b75ad",
                      question:
                        "What is the name of the street you grew up on?",
                      answer: "",
                    },
                  ],
                  is_complete: false,
                  date_joined: "2024-11-27T09:06:49.674Z",
                  createdAt: "2024-11-27T09:06:49.676Z",
                  updatedAt: "2024-11-27T09:06:49.726Z",
                  __v: 0,
                  wallet: "27110001100012",
                },
                sender_id: "6746e1297d96329ab65b75ae",
                content: "HI",
                createdAt: "2024-11-27T09:15:51.587Z",
                edited: false,
                attachmentUrls: null,
                updatedAt: "2024-11-27T09:15:51.587Z",
                pinned: false,
                reactions: [],
              },
            ],
          } as unknown as { [date: string]: Message[] }
        }
      />
    </div>
  );
};

export default GroupInbox;
