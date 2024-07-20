import React, { useState,useEffect } from 'react';
import { PlusCircle, ChevronDown, ChevronUp, FileText, EyeIcon } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Notification from '@/app/components/Notification';
import CodeBlock from '@/app/components/CodeBlock';

const QuestionSection = ({ onAdded, groupId }) => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [topic, setTopic] = useState('');
  const [finalSolution, setFinalSolution] = useState('');
  const [notification, setNotification] = useState(null);
  const { groupData } = useSelector((state) => state.group);
  const [showSolution, setShowSolution] = useState(Array(groupData&&groupData.length).fill(false));
  const [timers, setTimers] = useState([]);
  useEffect(() => {
    // Initialize showSolution and timers
    if (groupData) {
    //   const newShowSolution = Array(groupData[0]?.question?.length).fill(false);
    //   setShowSolution(newShowSolution);

      const newTimers = groupData[0]?.question?.map(question => ({
        endTime: new Date(question.endingTime),
        remainingTime: getRemainingTime(new Date(question.endingTime))
      })) || [];
      setTimers(newTimers);
    }
  }, [groupData]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => prevTimers.map(timer => ({
        ...timer,
        remainingTime: getRemainingTime(timer.endTime)
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRemainingTime = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const difference = end - now;

    if (difference <= 0) {
      return 'Time is up!';
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const showSuccess = (msg) => {
    setNotification({ type: 'success', message: msg });
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };

  const showError = (msg) => {
    setNotification({ type: 'error', message: msg });
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const openSolutionModal = () => {
    setIsSolutionModalOpen(true);
  };

  const closeSolutionModal = () => {
    setIsSolutionModalOpen(false);
  };

  const openAddQuestionModal = () => {
    setIsAddQuestionModalOpen(true);
  };

  const closeAddQuestionModal = () => {
    setIsAddQuestionModalOpen(false);
  };

  const handleAddQuestion = async (e) => {
    try {
      const data = {
        groupID: groupId,
        question: {
          heading: heading,
          description: description,
          startingTime: startDate,
          endingTime: endDate,
          solvedBy: [],
          points: points,
          topic: topic.split(' '),
          finalSotuion: finalSolution,
        },
      };
      const response = await axios.post('/api/addQuestion', data);
      if (response.data.statusCode === 200) {
        showSuccess('Question Added Successfully');
        onAdded();
        closeAddQuestionModal();
      }
    } catch (error) {
      showError('Unable to add the question');
    }
  };
const handleSubmitSolution = async()=>{
    
}
  return (
    <div className="w-2/3 p-4 border-r border-gray-300 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Questions</h2>
      <div className="mb-4">
        <button
          className="flex items-center text-black bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
          onClick={openAddQuestionModal}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Question
        </button>
      </div>
      {groupData && groupData[0]?.question?.map((question, index) => (
        <div key={question.id} className="mb-4">
          <div
            className="flex justify-between items-center text-black bg-gray-100 px-4 py-2 rounded cursor-pointer hover:bg-gray-200 transition duration-300"
            onClick={() => toggleQuestion(index)}
          >
            <p>{question.heading}</p>
            <p><strong>Time Remaining:</strong> {timers[index]?.remainingTime}</p>

            {expandedQuestion === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
          {expandedQuestion === index && (
            <div className="mt-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded">
              {/* Display Start and End Time */}
              <div className="mb-2 text-gray-600">
                <p><strong>Start Time:</strong> {new Date(question.startingTime).toLocaleString()}</p>
                <p><strong>End Time:</strong> {new Date(question.endingTime).toLocaleString()}</p>
              </div>
              
              {/* Display Topics */}
              <div className="flex flex-row gap-5 items-center mb-5">
                {question.topic.map((topic, idx) => (
                  <div key={idx} className="flex flex-row justify-center border-2 border-black p-1 rounded-md">
                    <p>{topic}</p>
                  </div>
                ))}
              </div>
              
              {/* Display Description */}
              <p className="text-justify" dangerouslySetInnerHTML={{ __html: question.description.replace(/\n/g, '&nbsp;<br>&nbsp;')} }/>
              
              {/* Display Final Solution if Show Solution is true */}
              {showSolution[index] && (
                <div className='mt-5'>
                <CodeBlock language="java" value={question.finalSotuion} />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-row gap-5 items-center">
                <button
                  className="flex items-center mt-2 text-white bg-black px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
                  onClick={openSolutionModal}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Add Solution
                </button>
                <button
                  className="flex items-center mt-2 text-white bg-black px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
                  onClick={() => {
                    const newShowSolution = [...showSolution];
                    newShowSolution[index] = !newShowSolution[index];
                    setShowSolution(newShowSolution);
                  }}
                >
                  <EyeIcon className="w-5 h-5 mr-2" />
                  {showSolution[index] ? 'Hide Solution' : 'Show Solution'}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {isSolutionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">Submit Solution</h3>
            <textarea className="w-full p-2 border border-gray-300 rounded mb-4" rows="4" placeholder="Write your solution here..."></textarea>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition duration-300"
                onClick={closeSolutionModal}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-300" onClick={handleSubmitSolution}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {isAddQuestionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <div className="bg-white p-6 rounded shadow-lg w-1/2 max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add Question</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Question Heading</label>
              <input
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter question heading"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                rows="4"
                placeholder="Enter description"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Starting Time</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Ending Time</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Points</label>
              <input
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                type="number"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter points"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Topic</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter topic"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Final Solution</label>
              <textarea
                value={finalSolution}
                onChange={(e) => setFinalSolution(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                rows="4"
                placeholder="Enter final solution"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition duration-300"
                onClick={closeAddQuestionModal}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-300" onClick={handleAddQuestion}>
                Add Question
              </button>
            </div>
          </div>
        </div>
      )}
      {notification && <Notification type={notification.type} message={notification.message} />}
    </div>
  );
};

export default QuestionSection;
