"use client";
import { useWebSocket } from "@/app/context/WebSocket";
import { MessageInitialState, TextMessage } from "@/app/types/Message";
import { TargetUser, User, UserInfoProps } from "@/app/types/User";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

function MessageInput({
  user,
  targetUser,
}: {
  user: User;
  targetUser: TargetUser;
}) {
  const formRef = useRef(null);
  const socket = useWebSocket();

  const initialState: MessageInitialState = {
    type: "message",
    payload: {
      email: user?.email,
      toEmail: targetUser.email,
      name: user?.name,
      message: null,
      date: new Date().toISOString().split("T")[0],
    },
  };

  const [state, dispatch] = useFormState(sendMessage, initialState);

  async function sendMessage(
    prevState: MessageInitialState,
    formData: FormData
  ) {
    const message = formData.get("message");

    const data: MessageInitialState = {
      ...prevState,
    };

    data.payload.message = message as string;
    data.payload.toEmail = targetUser.email;
    socket.send(JSON.stringify(data));

    if (formRef.current) {
      formRef.current.reset();
    }
    return prevState;
  }

  return (
    <form action={dispatch} ref={formRef}>
      <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>

        <input
          type="text"
          placeholder="Message"
          className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
          name="message"
          id="message"
          required
        />

        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>
        <button type="submit">
          <svg
            className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
