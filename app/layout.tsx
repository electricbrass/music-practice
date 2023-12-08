import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Form from './components/luciaForm'
import { getPageSession } from './auth/lucia'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaxoServer',
  description: 'Your favorite jazz practice tool',
}

const linkClass = 'block p-4 text-center hover:underline';
const lineClass = 'w-36 h-1 mx-auto rounded border-0 bg-red-400';

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const session = await getPageSession();
  return (
    <html lang="en">
      <body className='text-black'>
        <Toaster position='bottom-center' />
        <div className='fixed w-full h-12 m-0 p-0 bg-red-400 border-2 border-black overflow-auto top-0 z-50 flex justify-center items-center'>
          <span className='font-bold text-2xl font-serif text-red-900 italic'>SaxoServer</span>
          <div className='fixed right-6 my-auto w-fit h-fit'>
          { 
            session ?
            (<Form action='/api/logout'>
              <input type='submit' className='hover:underline cursor-pointer' value='Logout'/>
            </Form>) :
            <Link href='/login' className='hover:underline'>Login</Link>
          }
          </div>
        </div>
        <div className='fixed h-full w-48 m-0 p-0 bg-red-600 border-x-2 border-black overflow-auto'>
          <Link href='/' className={linkClass}>Home</Link>
          <hr className={lineClass}></hr>
          <Link href='/warmup' className={linkClass}>Warmup</Link>
          <Link href='/scales' className={linkClass}>Scales</Link>
          <Link href='/technical-exercises' className={linkClass}>Technical Exercises</Link>
          <Link href='/songs' className={linkClass}>Songs</Link>
          <hr className={lineClass}></hr>
          <Link href='/options' className={linkClass}>Options</Link>
          <Link href='/account' className={linkClass}>Account</Link>
          <div className='fixed block w-48 text-center bottom-4 text-sm'>&copy; 2023</div>
        </div>
        <div className={inter.className + 'fixed ml-48 mt-12'} style={{ height: 'calc(100vh - 48px)', width: 'calc(100% - 192px)' }}>{children}</div>
      </body>
    </html>
  )
}
