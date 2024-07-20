// Notification.js
import React from 'react';
import {CheckCircle2Icon, XCircleIcon} from 'lucide-react';

const Notification = ({ type, message }) => {
  return (
    <div
      className={`fixed top-4 right-4 w-80 p-4 rounded-lg shadow-lg ${
        type === 'error' ? 'bg-red-100 text-red-700 border-red-300' : 'bg-green-100 text-green-700 border-green-300'
      } border`}
    >
      <div className="flex items-center">
        {type === 'error' ? (
          <XCircleIcon className="h-6 w-6 mr-2" />
        ) : (
          <CheckCircle2Icon className="h-6 w-6 mr-2" />
        )}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Notification;
