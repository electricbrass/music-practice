'use client'

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const toastHandler = async (error: boolean, message?: string) => {
	if (error && message) {
		try {
			const body = JSON.parse(message);
			toast.error(body.error as string);
		} catch (e) {
			toast.error(message);
		}	
	} else if (error) {
		toast.error('An error occurred.');
	} else if (message) {
		toast.success(message);
	}
}

export default function Form({ children, action, successMessage }: { children: React.ReactNode, action: string, successMessage?: string }) {
	const router = useRouter();
	return (
		<form
			action={action}
			method="post"
			onSubmit={async (e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				const response = await fetch(action, {
					method: "POST",
					body: formData,
					redirect: "manual"
				});
				const contentType = response.headers.get("content-type");
				const ok = response.status === 0 || response.ok;
				console.log(contentType)
				if (contentType === 'application/json') {
					toastHandler(!ok, JSON.stringify(await response.json()));
				} else if (contentType === 'text/plain;charset=UTF-8') {
					toastHandler(!ok, await response.text());
				} else {
					toastHandler(!ok, successMessage)
				}

				if (response.status === 0) {
					// redirected
					// when using `redirect: "manual"`, response status 0 is returned
					return router.refresh();
				}
			}}
		>
			{children}
		</form>
	);
};