import { LoaderIcon } from 'lucide-react';
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-12 w-12"></div>
    </div>
  );
};

export default Loader;
