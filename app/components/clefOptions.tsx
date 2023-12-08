'use client'
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// instead of saving settings to cookie or db when making changes, have a save button that saves all changes and forces navigation to home page + refresh

const optionHeaderClass = 'font-bold';

// put options like bass clef or treble clef here
export default function ClefOptions({ session }: { session: unknown }) {
  const router = useRouter();
  let selectedClef;
  if (session) {
    // get clef from database
  } else {
   selectedClef = getCookie('clef');
  }
  const [clef, setClef] = useState(selectedClef);
  const saveCookie = () => {
    // TODO: also save clef to database
    setCookie('clef', clef, { sameSite: true });
    router.refresh();
    alert('Settings saved!');
  }
  return (
    <div>
      <h1 className={optionHeaderClass}>Clef</h1>
      <div>
      <input type='radio' name='clef' id='treble' value='treble' defaultChecked={selectedClef !== 'bass'} onChange={(e) => setClef(e.target.value)}/>
      <label htmlFor='treble'>Treble</label>
      <input type='radio' name='clef' id='bass' value='bass' defaultChecked={selectedClef === 'bass'} onChange={(e) => setClef(e.target.value)}/>
      <label htmlFor='bass'>Bass</label>
      </div>
      <input type='button' value='Save' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1' onClick={saveCookie}/>
    </div>
  );
}