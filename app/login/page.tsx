'use client'

import Link from "next/link";
import { useState } from "react";

// all just placeholder stuff from previous project

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <main className='min-h-full w-full bg-red-100 p-1'>
      <form className='m-10 w-64'>
        <input className='m-1 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' name='username' placeholder={'username'} value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input className='m-1 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='password' name='password' placeholder={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1' type="submit" value="Log In" />
        <div className='m-1'>Don&apos;t have an account?</div>
        <Link className='hover:underline m-1' href='/signup'>Sign up here!</Link>
      </form>
    </main>
  );
}