import Form from "../components/luciaForm";
import Link from "next/link";
import { getPageSession } from "../auth/lucia";
import { redirect } from "next/navigation";

export default async function Signup() {
	const session = await getPageSession();
	if (session) redirect("/account");
	return (
		<main>
			<div className='m-10 w-64'>
      	<Form action='/api/signup'>
      	  <input className='m-1 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' name='username' placeholder={'username'} id='username'/>
      	  <input className='m-1 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='password' name='password' placeholder={'password'} id='password'/>
      	  <input className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1' type="submit" value="Sign Up" />
      	</Form>
				<div className='m-1'>Already have an account?</div>
				<Link className='hover:underline m-1' href='/login'>Log in here!</Link>
			</div>
    </main>
	);
};