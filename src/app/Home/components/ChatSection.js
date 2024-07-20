import React from 'react'
import {  SendHorizonal } from 'lucide-react';

export default function ChatSection() {
  return (
    <div className="w-1/3 p-4 flex flex-col">
    <h2 className="text-lg font-semibold mb-4">Chat</h2>
    <div className="bg-gray-100 overflow-y-auto p-4 flex-grow rounded shadow-inner">
      {/* Chat content goes here */}
    </div>
    <div className="relative">
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300 flex items-center">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <button className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-800 transition duration-300">
          <SendHorizonal className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
  )
}
