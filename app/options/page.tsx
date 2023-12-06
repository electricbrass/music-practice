'use client'

import { getCookie, setCookie } from 'cookies-next';

// instead of saving settings to cookie or db when making changes, have a save button that saves all changes and forces navigation to home page + refresh

const optionHeaderClass = 'font-bold';

// put options like bass clef or treble clef here
export default function Options() {
  const selectedClef = getCookie('clef');
  return (
    <main className='min-h-full w-full bg-red-100 p-1'>
      <div>
        <h1 className={optionHeaderClass}>Clef</h1>
        <input type='radio' name='clef' id='treble' value='Treble' onClick={() => setCookie('clef', 'treble', { sameSite: true })} defaultChecked={selectedClef !== 'bass'}/>
        <label htmlFor='treble'>Treble</label>
        <input type='radio' name='clef' id='bass' value='Bass' onClick={() => setCookie('clef', 'bass', { sameSite: true })} defaultChecked={selectedClef === 'bass'}/>
        <label htmlFor='bass'>Bass</label>
      </div>
    </main>
  );
}