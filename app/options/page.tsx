'use client'

import { getCookie, setCookie } from 'cookies-next';

// put options like bass clef or treble clef here
export default function Options() {
  const selectedClef = getCookie('clef');
  return (
    <div className='h-screen'>
      <input type='radio' name='clef' id='treble' value='Treble' onClick={() => setCookie('clef', 'treble')} defaultChecked={selectedClef !== 'bass'}/>
      <label htmlFor='treble'>Treble</label>
      <input type='radio' name='clef' id='bass' value='Bass' onClick={() => setCookie('clef', 'bass')} defaultChecked={selectedClef === 'bass'}/>
      <label htmlFor='bass'>Bass</label>
    </div>
  );
}