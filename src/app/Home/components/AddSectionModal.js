import React from 'react';

import { XIcon } from 'lucide-react';

export const AddSectionModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="text-lg font-semibold">Add Section</h3>
          <button onClick={onClose}>
            <XIcon className="w-6 h-6 text-black" />
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-black mb-2">Section Name</label>
            <input 
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button 
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
