'use client'
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Loader from "../components/Loader";

const Homepage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
 const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  setLoading(true);
    try {
      const res = await fetch(`/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(data.redirect); // Redirect based on role
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong.');
    }finally {
    setLoading(false);
  }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg flex max-w-5xl w-full overflow-hidden">
        
        {/* Left Side - Form */}
        <div className="w-1/2 p-10">
          <div className="mb-6 text-center">
            <button className="w-full flex items-center justify-center border rounded-md py-2 px-4 gap-2 hover:bg-gray-50 transition">
              
              <Image src="/google.svg" alt="" width={20} height={20}/>
              Sign in with Google
            </button>
            <div className="my-4 flex items-center justify-between">
              <hr className="w-1/3 border-gray-300" />
              <span className="text-sm text-gray-500">Or sign in with email</span>
              <hr className="w-1/3 border-gray-300" />
            </div>
          </div>

          <form className="space-y-4"  onSubmit={handleLogin}>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
          onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                 value={password}
          onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-indigo-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          <button
  type="submit"
  disabled={loading}
  className={`w-full bg-indigo-600 text-white py-2 rounded-md transition ${
    loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
  }`}
>
  {loading ? 'Signing In...' : 'Sign In'}
</button>
          </form>

          <p className="mt-4 text-center text-sm">
            Don't have any account?{' '}
            <a href="#" className="text-indigo-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>

        {/* Right Side - Info */}
        <div className="w-1/2 bg-gradient-to-br from-indigo-100 to-white p-10 flex flex-col justify-center text-center">
          <div className="  flex flex-col items-center">
            <p><Image src={`/uploads/school/logo.png`} alt="logo" width={150} height={150} /></p>

          <h2 className="text-2xl font-extrabold mb-2">Welcome To Knowledge Pitch !</h2>
          <p className="text-gray-600">
            Knowledge Pitch is a provider of STEM and Robotics education, 
dedicated to equipping schools with cutting-edge learning 
solutions. Our mission is to inspire young minds through hands-on 
learning experiences, preparing them for future technological 
advancements. 
         </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
