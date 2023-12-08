import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Scale, { scaleType } from "../components/scale";
import { getPageSession } from '../auth/lucia';
import Preferences, { IPreferences } from '../models/preferences';

// make it so some days it says hey do all 12 major scales (in order like, fourths, or descending whole steps)
// on other days its heres one of each type of scale, all on the same root
// other days the minors are relative to the major instead of parallel

export default async function Scales() {
  const session = await getPageSession();
  let isTreble: boolean;
  if (session) {
    const preferences = await Preferences.findOne({ user_id: session.user.userId }).lean() as IPreferences;
    isTreble = preferences?.clef !== 'bass';
  } else {
    isTreble = getCookie('clef', { cookies }) !== 'bass';
  }
  return (
    <main className='grid grid-cols-2 justify-center'>
      {([
        ['Major Scale', 'major'],
        ['Natural Minor Scale', 'natural minor'],
        ['Harmonic Minor Scale', 'harmonic minor'],
        ['Melodic Minor Scale', 'melodic minor'],
        ['Major Pentatonic Scale -- NOT IMPLEMENTED', 'major'],
        ['Minor Pentatonic Scale -- NOT IMPLEMENTED', 'major'],
        ['Minor Blues Scale -- NOT IMPLEMENTED', 'major'],
        ['Half-Whole Diminished Scale -- NOT IMPLEMENTED', 'major'],
        ['Dorian Scale -- NOT IMPLEMENTED', 'major'],
        ['Altered Dominant Scale -- NOT IMPLEMENTED', 'major']
      ] as [string, scaleType][]).map(([name, type]) => (
        <div className='my-12 mx-auto w-fit' key={name}>
          <h1 className='text-lg'>{name}</h1>
          <Scale isTreble={isTreble} mode={type}/>
        </div>
      ))
      }
    </main>
  );
}