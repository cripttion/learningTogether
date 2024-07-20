import React, { useEffect, useState } from 'react';
import { AddSectionModal } from './AddSectionModal';
import { PlusCircle, ChevronDown, ChevronUp, SendHorizonal } from 'lucide-react';
import QuestionSection from './QuestionSection';
import Notification from '@/app/components/Notification';
import axios from 'axios';
import Loader from '@/app/components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupsData } from '@/app/lib/reduxManager/Slices/groupsSlice';
import ChatSection from './ChatSection';

const MainSection = ({ groupID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [groupData, setGroupData] = useState([]);
//   const [isLoading, setLoading] = useState(false);
   const{isLoading,groupData} = useSelector((state)=>state.group);
  const sections = ['Section 1', 'Section 2', 'Section 3'];
  const [notification, setNotification] = useState(null);
   const dispatch = useDispatch();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const showSuccess = (msg) => {
    setNotification({ type: 'success', message: msg });
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };

  const showError = (msg) => {
    setNotification({ type: 'error', message: msg });
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };

  const getGroupData = async () => {
   
    try {
        const response = await dispatch(getGroupsData(groupID));
     
      if (response.statusCode !== 200) {
        showError('Failed to fetch group data');
      }
    } catch (error) {
      showError('Unable to fetch records');
    } 
  };

  useEffect(() => {
   
      getGroupData();
    
  }, [groupID]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col h-screen bg-white text-black">
          <header className="p-4 border-b border-gray-300 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">{groupData?.[0]?.groupname}</h1>
              <p className="text-sm text-gray-600">ID: {groupData?.[0]?.GroupID}</p>
            </div>
            <button 
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
              onClick={openModal}
            >
              Add Section
            </button>
          </header>
          <div className="flex flex-grow overflow-hidden">
            <ChatSection />
            <QuestionSection onAdded={()=>getGroupData()} groupId={groupID}   />
          </div>
          <div className="fixed bottom-4 right-10">
            <button
              className="flex items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Sections {isDropdownOpen ? <ChevronUp className="w-5 h-5 ml-2" /> : <ChevronDown className="w-5 h-5 ml-2" />}
            </button>
            {isDropdownOpen && (
              <div className="mt-2 bg-white border border-gray-300 rounded shadow-lg">
                {sections.map((section, index) => (
                  <div key={index} className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                    {section}
                  </div>
                ))}
              </div>
            )}
          </div>
          {isModalOpen && <AddSectionModal onClose={closeModal} />}
          {notification && <Notification type={notification.type} message={notification.message} />}
        </div>
      )}
    </>
  );
};



export default MainSection;
