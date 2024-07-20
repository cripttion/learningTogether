'use client'
import React, { useEffect, useState } from 'react';
import { GroupIcon, PlusCircle, Trophy, User2Icon } from 'lucide-react';
import Modal from './../components/Modal'; // Ensure this path is correct based on your project structure
import axios from "axios";
import Notification from '../components/Notification';
import MainSection from './components/MainSection';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { getgroups } from '../lib/reduxManager/Slices/groupsSlice';

function Page() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [notification, setNotification] = useState(null);
  // const[groupdata,setGroupData] = useState([]);
  const[modaltitle,setModaltitle] = useState('Create New Group');
  const[selectedGroupId,setSelectedGroupId]=useState(null);
  const{groups} = useSelector((state)=>state.group)
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleGroupNameChange = (e) => setGroupName(e.target.value);
  const showSuccess = (msg) => {
    setNotification({ type: 'success', message: msg });
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };

  const showError = (msg) => {
    setNotification({ type: 'error', message: msg });
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };
  
   const getGroupData = async(memberId)=>{
      try{
          const response = dispatch(getgroups());
      }catch(error)
      {
        console.log(error);
      }
   }
  const createGroup = async(_data_) => {
  

    let userData = await sessionStorage.getItem('GrowID');
     userData = JSON.parse(userData);
     console.log(userData);
    const data = {
      groupname:groupName,
      members:[userData._id]
    };
    console.log(data);
    try{
      const URL = _data_==='Create'?'/api/group':'/api/joinGroup'
      const response = await axios.post(URL,data);
      if(response.data.statusCode===200){
        getGroupData(userData._id);
        closeModal();
        showSuccess("Group greated sucessfully")
       }
    }catch(error)
    {
      console.log(error);
      showError("Unable to create the group")
    }finally{
      setGroupName('');
      closeModal();

    }
  
    
    
  };
  useEffect(()=>{
       getGroupData();
  },[])

  return (
    <div className="flex h-screen bg-black">
      {/* Left Side */}
      <div className="w-1/5 border-r border-gray-700 overflow-y-auto bg-black">
        {/* Profile and Name List */}
        <div className="p-4  rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Grow Together Groups</h2>
      
      <div className="space-y-5 mt-10">
  
      {groups && groups.length > 0 ? (
        groups.map((data, index) => (
          <button
            key={index}
            className="flex items-center p-5 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 w-full text-left"
          onClick={()=>{
            setSelectedGroupId(data.GroupID)
          }}
         >
            <User2Icon className="text-gray-300 mr-3" /> {/* Icon color */}
            <span className="text-gray-300">
              {data.groupname + ' (' + data.GroupID + ')'}
            </span>
          </button>
        ))
      ) : (
        <div className="text-center text-gray-300">
          <p className="mb-4">No groups found. You can:</p>
          <div className="flex justify-center gap-4">
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition duration-300">
              Create New Group
            </button>
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition duration-300">
              Join Another Group
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 p-5 bg-black">
        <div className="flex justify-between mb-4">
          <div className='flex items-center gap-5 justify-center'>
          <button
            className="flex items-center bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            onClick={()=>{
              openModal()
              setModaltitle('Create New Group')
            }}
          >
            <PlusCircle className="w-5 h-5 mr-2" /> Create New Group
          </button>
          <button
            className="flex items-center bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            onClick={()=>{
              openModal()
              setModaltitle('Join Group')
            }}
          >
            <PlusCircle className="w-5 h-5 mr-2" /> Join Group
          </button>
          </div>
          <button className="flex items-center bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
            <Trophy className="w-5 h-5 mr-2" /> Host a Competition
          </button>
        </div>
        {/* Main Content */}
        <div className="mt-4">
      {selectedGroupId ? (
        <MainSection groupID={selectedGroupId} />
      ) : (
        <div className='flex flex-col gap-20 justify-center items-center'>
          <h2 className='text-center text-3xl mt-20'>WE ARE GROW TOGETHER ENHANCE YOUR COLLABORARIVE LEARNING WITH US !</h2>
          <span className='text-center'>@cripttion</span>
        </div>
      )}
      {/* Add more content as needed */}
    </div>
      </div>

      {/* Modal */}
      <Modal
        title={modaltitle}
        isOpen={isModalOpen}
        onClose={closeModal}
        groupName={groupName}
        onGroupNameChange={handleGroupNameChange}
        onCreateGroup={data=>createGroup(data)}
      />
      {notification&&
      <Notification type={notification.type} message={notification.message} />
      }
    </div>
  );
}

export default Page;
