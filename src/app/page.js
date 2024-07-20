"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Lock, LogIn, UserPlus } from 'lucide-react';

export default function Home() {
  const [togetherID, setTogetherID] = useState("");
  const [password, setPassword] = useState("");
  const [registerClick, setRegisterClick] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/userLogin', {
        togetherID: togetherID,
        password: password
      });
      if (response.data.statusCode === 200) {
        await sessionStorage.setItem('GrowID', JSON.stringify(response.data.data));
        push('/Home')
      } else {
        setError(data.data.error)
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const handleRegisterClick = async () => {
    setLoading(true);
    try {
      const newUserData = {
        name: togetherID,
        password: password
      }
      const url = '/api/user';
      const response = await axios.post(url, newUserData);
      if (response.data.statusCode === 200) {
        alert("You are registered");
        setRegisterClick(false);
      } else {
        setError("Unable to register")
      }
    } catch (error) {
      console.log(error);
      setError("Unable to register, try after some time");
    } finally {
      setLoading(false);
      setTogetherID('');
      setPassword('');
    }
  }

  return (
    <main className="h-screen flex flex-col justify-center items-center bg-black">
      <div className="border border-white rounded-lg w-80 p-8 bg-black text-white">
        <h2 className="text-center font-bold text-3xl mb-6">GROW TOGETHER</h2>
        <form className="flex flex-col gap-4" >
          <div>
            <label htmlFor="login" className="block mb-1">{registerClick ? 'Your Full Name' : 'Together ID'}</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
              <input 
                type="text" 
                value={togetherID} 
                name="login" 
                placeholder={registerClick ? 'Your Full Name' : 'Together ID'} 
                className="w-full p-2 pl-10 bg-gray-900 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white" 
                onChange={(e) => setTogetherID(e.target.value)} 
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
              <input 
                type="password" 
                value={password} 
                name="password" 
                placeholder="*******" 
                className="w-full p-2 pl-10 bg-gray-900 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white" 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>
          {!registerClick && (
            <button 
              type="button" 
              onClick={handleLoginClick} 
              className="mt-4 w-full bg-white text-black py-2 rounded-md flex items-center justify-center hover:bg-gray-300"
            >
              <LogIn className="mr-2" /> Login
            </button>
          )}
          {registerClick && (
            <button 
              type="button" 
              onClick={handleRegisterClick} 
              className="mt-4 w-full bg-white text-black py-2 rounded-md flex items-center justify-center hover:bg-gray-300"
            >
              <UserPlus className="mr-2" /> Register me
            </button>
          )}
        </form>
        <button 
          className="mt-4 w-full text-center text-sm text-white hover:underline" 
          onClick={() => setRegisterClick(!registerClick)}
        >
          {registerClick ? 'Login' : 'Register'}
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </main>
  );
}
