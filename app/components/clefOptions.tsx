'use client'

import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const optionHeaderClass = 'font-bold';

export default function ClefOptions() {
  const router = useRouter();
  const selectedClef = getCookie('clef');
  const [clef, setClef] = useState(selectedClef);
  const saveCookie = () => {
    setCookie('clef', clef || 'treble', { sameSite: true });
    router.refresh();
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