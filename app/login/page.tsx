import Form from "../components/lucia-form";
import Link from "next/link";
import { getPageSession } from "../auth/lucia";
import { redirect } from "next/navigation";

export default async function Signup() {
	const session = await getPageSession();
	if (session) redirect("/");
	return (
		<main className='min-h-full w-full bg-red-100 p-1'>
			<div className='m-10 w-64'>
      	<Form action='/api/login'>
      	  <input className='m-1 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' name='username' placeholder={'username'} id='username'/>
      	  <input className='m-1 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='password' name='password' placeholder={'password'} id='password'/>
      	  <input className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1' type="submit" value="Log In" />
      	</Form>
				<div className='m-1'>Don&apos;t have an account?</div>
				<Link className='hover:underline m-1' href='/signup'>Sign up here!</Link>
			</div>
    </main>
	);
};