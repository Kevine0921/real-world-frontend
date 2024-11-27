"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { mimeTypeToSvg } from "@/constants";
import { Message, Reaction, User } from "@/types";
import { formatMessageDate } from "@/utils/chat-utils";
import EmojiPicker from "emoji-picker-react";
import {
  Bold,
  Download,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pin,
  Plus,
  ReplyAllIcon,
  Smile,
  SmileIcon,
  Strikethrough,
} from "lucide-react";
import React, { FC, PropsWithChildren, RefObject } from "react";

const MessagesList: FC<
  PropsWithChildren<{
    validUserNames?: Array<string>;
    groupedMessages?: { [date: string]: Array<Message> };
    firstUnreadMessageId?: string;
    isEditing?: {
      state: boolean;
      content: string;
      message: Message;
    };
    onContextMenu?: (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      msg: Message
    ) => void;
    editingInputRef?: RefObject<HTMLTextAreaElement>;
    emojiContainerRef?: RefObject<HTMLDivElement>;
    sending?: boolean;
    setIsEditing?: React.Dispatch<
      React.SetStateAction<{
        state: boolean;
        content: string;
        message: Message;
      }>
    >;
    onEdit?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => Promise<void>;
    onAttachments?: (e: FileList) => void;
    showPicker?: boolean;
    setShowPicker?: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser?: User;
    onReactWithEmoji?: (msg?: Message, emoji?: string) => Promise<any>;
    contextMenu?: {
      visible: boolean;
      x: number;
      y: number;
      message: any | null;
    };
    closeContextMenu?: () => void;
    instantActions?: (
      | {
          name: string;
          action: (msg?: Message, emoji?: string) => Promise<any>;
          icon: React.JSX.Element;
          emojis: string[];
        }
      | {
          name: string;
          action: (msg: Message, content?: string) => void;
          icon: React.JSX.Element;
          emojis?: undefined;
        }
    )[];
    quickEmojiSelector?: boolean;
    setQuickEmojiSelector?: React.Dispatch<React.SetStateAction<boolean>>;
  }>
> = ({
  validUserNames = [] as Array<string>,
  groupedMessages = {},
  firstUnreadMessageId = "",
  onContextMenu = () => null,
  isEditing = {
    state: false,
    content: "",
    message: {} as Message,
  },
  editingInputRef,
  emojiContainerRef,
  sending = false,
  setIsEditing = () => null,
  onEdit = () => null,
  onAttachments = () => null,
  showPicker = false,
  setShowPicker = () => null,
  currentUser = {} as User,
  onReactWithEmoji = () => null,
  contextMenu,
  closeContextMenu = () => null,
  instantActions,
  quickEmojiSelector = false,
  setQuickEmojiSelector = () => null,
}) => {
  const getFormattedMessageContent = (content?: string) => {
    return (
      content! &&
      content
        .split("\n")
        .map(
          (line) =>
            line
              .split(/(@\w+)/g)
              .map((part) => {
                const isMention = part.startsWith("@");
                const username = part.slice(1); // Remove "@" for validation
                const isValidMention =
                  isMention && validUserNames.includes(`@${username}`);

                return isMention && isValidMention
                  ? `<span style="background-color: rgba(255, 165, 0, 0.4); padding: 5px; border-radius: 10px;">${part}</span>`
                  : part;
              })
              .join("") // Join parts of each line to keep formatting
        )
        .join("<br />")
    ); // Add line breaks
  };

  return (
    <div>
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <div key={date}>
          <div className="text-neutral-400 text-sm my-2 text-center flex items-center">
            <hr className="flex-grow border-t border-neutral-600" />
            <span className="mx-2">{date}</span>{" "}
            {/* Margin added for spacing */}
            <hr className="flex-grow border-t border-neutral-600" />
          </div>

          {msgs.map((msg, index) => {
            const showAvatarAndName =
              index === 0 || msgs[index - 1]?.sender?._id !== msg?.sender?._id;
            const isUnreadMessage = msg._id === firstUnreadMessageId;

            return (
              <React.Fragment key={msg._id}>
                {isUnreadMessage && (
                  <div className="w-full my-2 flex items-center">
                    <hr className="flex-grow border-t border-red-500" />
                    <span className="mx-2 text-red-500 text-xs">
                      Unread Messages
                    </span>
                    <hr className="flex-grow border-t border-red-500" />
                  </div>
                )}
                <div
                  onContextMenu={(e) => onContextMenu(e, msg)} // Pass the message to the context menu handler
                  className={`flex w-full gap-4 hover:bg-[#cbcbcb2e] cursor-pointer rounded-md items-start mb-1 justify-normal ${
                    index === msgs.length && "mb-5"
                  } ${msg.pinned ? "bg-[rgba(255,193,59,0.42)]" : " "} group `} // Reduced margin between consecutive messages
                >
                  {msg.pinned && <Pin />}
                  {showAvatarAndName ? (
                    <Avatar className=" bg-neutral-200 rounded-full">
                      <AvatarImage src={msg.sender?.profile_pic} />
                      <AvatarFallback />
                    </Avatar>
                  ) : (
                    <div className="w-[40px] p-0 h-0 text-[.5rem] items-center invisible group-hover:visible">
                      {new Date(msg?.createdAt as Date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </div>
                  )}

                  <div className="flex flex-col w-full items-start justify-center ">
                    {showAvatarAndName && (
                      <div className="flex gap-2 items-center">
                        <span>
                          {msg?.sender?.lastName} {msg?.sender?.firstName}
                        </span>
                        <span className="text-[.7rem] text-neutral-400">
                          {formatMessageDate(msg?.createdAt as Date)}
                        </span>
                      </div>
                    )}
                    {isEditing.state && isEditing.message._id === msg._id ? (
                      <div className="w-full flex flex-col items-start">
                        <div className="W-full flex flex-col border-gray-700 border focus-within:border-white rounded-md">
                          <div className="flex gap-2 group-focus-within:border-b-white border-b border-b-gray-500 p-2">
                            <span className="p-1 font-bold hover:bg-gray-50 rounded-full cursor-pointer hover:text-neutral-700 duration-75">
                              <Bold className="size-5" />
                            </span>
                            <span className="p-1 font-bold hover:bg-gray-50 rounded-full cursor-pointer hover:text-neutral-700 duration-75">
                              <Italic className="size-5" />
                            </span>
                            <span className="p-1 font-bold hover:bg-gray-50 rounded-full cursor-pointer hover:text-neutral-700 duration-75">
                              <Strikethrough className="size-5" />
                            </span>
                            <span className="p-1 font-bold hover:bg-gray-50 rounded-full cursor-pointer hover:text-neutral-700 duration-75">
                              <Link2 className="size-5" />
                            </span>
                            <span className="p-1 font-bold hover:bg-gray-50 rounded-full cursor-pointer hover:text-neutral-700 duration-75">
                              <List className="size-5" />
                            </span>
                            <span className="p-1 font-bold hover:bg-gray-50 rounded-full cursor-pointer hover:text-neutral-700 duration-75">
                              <ListOrdered className="size-5" />
                            </span>
                          </div>
                          <div className="">
                            <textarea
                              ref={editingInputRef}
                              disabled={sending}
                              className="flex-grow bg-transparent p-2 rounded-md text-white placeholder-gray-400 focus:outline-none disabled:cursor-not-allowed w-full"
                              value={isEditing.content}
                              onChange={(e) =>
                                setIsEditing((prev) => ({
                                  ...prev,
                                  content: e.target.value,
                                }))
                              }
                              onKeyDown={onEdit}
                            />
                          </div>
                          <div className="w-full flex p-2">
                            <div className="">
                              <Popover>
                                <PopoverTrigger className="p-1 font-bold hover:bg-gray-50 rounded-full cursor-pointer hover:text-neutral-700 duration-75">
                                  <Plus className="size-5" />
                                </PopoverTrigger>
                                <PopoverContent className="text-white bg-[#013a6f] shadow-2xl z-50 gap-1 flex flex-col ">
                                  <input
                                    type="file"
                                    hidden
                                    name="attachment"
                                    id="attachment"
                                    multiple
                                    onChange={(e) =>
                                      onAttachments(e.target.files as FileList)
                                    }
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div
                              ref={emojiContainerRef}
                              className="absolute z-50 bottom-9 right-0"
                            >
                              <EmojiPicker
                                open={showPicker}
                                onEmojiClick={(emoji) => {
                                  setIsEditing((prev) => ({
                                    ...prev,
                                    content: prev.content + emoji.emoji,
                                  }));
                                }}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="p-1 font-bold hover:bg-gray-50 rounded-full cursor-pointer hover:text-neutral-700 duration-75">
                                <Smile
                                  onClick={() => setShowPicker((prev) => !prev)}
                                  className="size-5"
                                />
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={() =>
                            setIsEditing({
                              state: false,
                              content: "",
                              message: {},
                            })
                          }
                          className="underline text-[.7rem]"
                        >
                          cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="text-[#c4c4c4] text-[.9rem] w-[90%] break-words p-0 m-0">
                        {msg.replyingTo ? (
                          <div className="bg-gray-800 p-2 rounded-md mb-1">
                            <div className="flex items-start justify-start gap-2 overflow-hidden italic text-xs text-gray-3000">
                              <ReplyAllIcon className="rotate-180" />
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: getFormattedMessageContent(
                                    msg.replyingTo?.content?.slice(0, 150)
                                  ),
                                }}
                                style={{
                                  transition: "background-color 0.3s ease",
                                }}
                              />
                            </div>
                          </div>
                        ) : null}
                        <div className="text-white flex items-center gap-2 p-2 bg-gray-800 rounded-xl">
                          <div className="w-full flex flex-col gap-2">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: getFormattedMessageContent(
                                  msg?.content
                                ),
                              }}
                              style={{
                                transition: "background-color 0.3s ease",
                              }}
                            ></p>
                            {/* <p
                                  dangerouslySetInnerHTML={{
                                    __html: getFormattedMessageContent(
                                      msg?.content
                                    ),
                                  }}
                                  style={{
                                    transition: "background-color 0.3s ease",
                                  }}
                                /> */}

                            {msg.attachmentUrls && (
                              <div className="w-full flex gap-2 flex-wrap">
                                {msg.attachmentUrls.map((attachment, index) => {
                                  const svgIcon =
                                    mimeTypeToSvg[attachment.type as any] ||
                                    mimeTypeToSvg["default"];

                                  // Check if the attachment is an image
                                  if (
                                    attachment.type &&
                                    attachment.type?.startsWith("image/")
                                  ) {
                                    return (
                                      <a
                                        key={index}
                                        href={attachment.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        className="hover:bg-[rgba(9,15,24,0.39)] p-3 rounded-md"
                                      >
                                        <div className="w-full flex items-center gap-2 justify-between group p-1 mb-5">
                                          <span className="text-[.7rem]">
                                            {attachment?.name?.substr(0, 20)}
                                          </span>
                                          <button className="invisible group-hover:visible">
                                            <Download />
                                          </button>
                                        </div>
                                        <img
                                          key={index}
                                          className="object-fit rounded-md"
                                          src={attachment.url}
                                          alt="attachment"
                                          width={200}
                                          height={200}
                                        />
                                      </a>
                                    );
                                  } else {
                                    // Render non-image files with SVG icon and download link
                                    return (
                                      <a
                                        key={index}
                                        href={attachment.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        className="hover:bg-[rgba(50,139,255,0.39)] p-3 rounded-md "
                                      >
                                        <div className="file-preview flex flex-col w-full justify-between group">
                                          <div className="w-full flex items-center gap-2 p-1 mb-5">
                                            <span className="text-[.7rem]">
                                              {attachment?.name?.substr(0, 20)}
                                            </span>
                                            <button className="invisible group-hover:visible">
                                              <Download />
                                            </button>
                                          </div>
                                          <img
                                            src={svgIcon}
                                            alt={attachment.type}
                                            width={100}
                                            height={100}
                                            className="mr-2"
                                          />
                                        </div>
                                      </a>
                                    );
                                  }
                                })}
                              </div>
                            )}
                          </div>
                          <span>
                            {msg.edited && (
                              <span className="text-[.7rem] text-gray-200">
                                (edited)
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center w-full justify-start p-1 gap-1">
                          {msg.reactions?.length! > 0 &&
                            (() => {
                              const emojiCounts = msg.reactions!.reduce(
                                (acc, reaction: Reaction) => {
                                  const emoji = reaction.emoji!;
                                  if (emoji !== "0") {
                                    acc[emoji] = (acc[emoji] || 0) + 1;
                                  }
                                  return acc;
                                },
                                {} as Record<string, number>
                              );

                              return Object.entries(emojiCounts).map(
                                ([emoji, count], index) => {
                                  // Check if the current user has reacted with this emoji
                                  const hasUserReacted = msg.reactions?.some(
                                    (reaction) =>
                                      reaction.emoji === emoji &&
                                      reaction.user_id === currentUser?._id
                                  );

                                  return (
                                    <span
                                      key={index}
                                      // If the user has reacted, add a background color
                                      className={`${
                                        hasUserReacted ? "bg-gray-800" : ""
                                      } p-1 rounded-md cursor-pointer`}
                                      onClick={() =>
                                        onReactWithEmoji(msg, emoji)
                                      } // Add react/remove logic here
                                    >
                                      {emoji}{" "}
                                      {count > 1 && (
                                        <span className="ml-1">x{count}</span>
                                      )}
                                    </span>
                                  );
                                }
                              );
                            })()}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Context Menu */}
                  {contextMenu?.visible &&
                    contextMenu?.message?._id === msg._id && ( // Show the context menu for the correct message
                      <div
                        className="absolute bg-gray-700 text-white rounded-md shadow-sm w-auto p-1 z-50"
                        style={{ left: contextMenu?.y, top: contextMenu?.y }}
                        onMouseLeave={closeContextMenu}
                      >
                        {instantActions?.map((action, index) => {
                          if (
                            (action.name === "Edit" &&
                              `${msg.sender_id}` !== `${currentUser?._id}`) ||
                            (action.name === "Delete" &&
                              `${msg.sender_id}` !== `${currentUser?._id}`)
                          ) {
                            return null;
                          }
                          if (action.name === "React") {
                            return (
                              <div className="flex items-center w-full justify-around p-2 gap-3">
                                {action.emojis!.map((emoji, index) => (
                                  <span
                                    key={index}
                                    className="p-1 cursor-pointer rounded-md"
                                    onClick={() => onReactWithEmoji(msg, emoji)}
                                  >
                                    {emoji}
                                  </span>
                                ))}

                                <span
                                  className="p-1 rounded-md cursor-pointer"
                                  onClick={() =>
                                    setQuickEmojiSelector((prev) => !prev)
                                  }
                                >
                                  <SmileIcon />
                                </span>
                              </div>
                            );
                          }
                          if (action.name === "Pin" && msg.pinned) {
                            return (
                              <button
                                key={index}
                                className={`w-full text-left p-2 hover:bg-blue-600 ${
                                  action.name === "Pin" ? "text-orange-500" : ""
                                } flex items-center gap-2`}
                                onClick={() => {
                                  if (action.name === "Edit") {
                                    action.action(msg, msg.content);
                                  } else {
                                    action.action(msg);
                                  }
                                }}
                              >
                                {action.icon}
                                Unpin
                              </button>
                            );
                          }

                          return (
                            <button
                              key={index}
                              className={`w-full text-left p-2 hover:bg-blue-600 ${
                                action.name === "Delete"
                                  ? "text-red-500 hover:text-white hover:bg-red-500"
                                  : ""
                              } flex items-center gap-2`}
                              onClick={() => {
                                if (action.name === "Edit") {
                                  action.action(msg, msg.content);
                                } else {
                                  action.action(msg);
                                }
                              }}
                            >
                              {action.icon}
                              {action.name}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  <div
                    ref={emojiContainerRef}
                    className="absolute z-50 bottom-9 right-5"
                  >
                    <EmojiPicker
                      open={quickEmojiSelector}
                      onEmojiClick={(emoji) => {
                        onReactWithEmoji(msg, emoji.emoji);
                        setQuickEmojiSelector(false);
                      }}
                    />
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
