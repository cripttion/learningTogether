import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ title,isOpen, onClose, groupName, onGroupNameChange, onCreateGroup }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">{title}</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-black" />
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="groupName" className="block text-black mb-2">Group Name</label>
          <input
            id="groupName"
            type="text"
            value={groupName}
            onChange={onGroupNameChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-black"
          />
        </div>
        <button
          onClick={()=>onCreateGroup(title.split(" ")[0])}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
         {title.split(" ")[0]}
        </button>
      </div>
    </div>
  );
};

export default Modal;
