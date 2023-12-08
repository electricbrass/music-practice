import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Scale, { scaleType, Key } from "../components/scale";
import { getPageSession } from '../auth/lucia';
import Preferences, { IPreferences } from '../models/preferences';
import toast from 'react-hot-toast';

// make it so some days it says hey do all 12 major scales (in order like, fourths, or descending whole steps)
// on other days its heres one of each type of scale, all on the same root
// other days the minors are relative to the major instead of parallel

export default async function Scales() {
  const session = await getPageSession();
  let isTreble: boolean;
  let preferences: IPreferences | undefined;
  if (session) {
    try {
      preferences = await Preferences.findOne({ user_id: session.user.userId }).lean() as IPreferences;
    } catch (e) {
      toast.error('Error loading user data');
    }
    isTreble = preferences?.clef !== 'bass';
  } else {
    isTreble = getCookie('clef', { cookies }) !== 'bass';
  }
  return (
    <main className='grid grid-cols-2 justify-center'>
      {([
        ['Major Scale', 'major', preferences?.major_keys],
        ['Natural Minor Scale', 'natural minor', preferences?.n_minor_keys],
        ['Harmonic Minor Scale', 'harmonic minor', preferences?.h_minor_keys],
        ['Melodic Minor Scale', 'melodic minor', preferences?.m_minor_keys],
        ['Major Pentatonic Scale -- NOT IMPLEMENTED', 'major', preferences?.major_keys],
        ['Minor Pentatonic Scale -- NOT IMPLEMENTED', 'major', preferences?.major_keys],
        ['Minor Blues Scale -- NOT IMPLEMENTED', 'major', preferences?.major_keys],
        ['Half-Whole Diminished Scale -- NOT IMPLEMENTED', 'major', preferences?.major_keys],
        ['Dorian Scale -- NOT IMPLEMENTED', 'major', preferences?.major_keys],
        ['Altered Dominant Scale -- NOT IMPLEMENTED', 'major', preferences?.major_keys]
      ] as [string, scaleType, Key[] | undefined][]).map(([name, type, db]) => (
        <div className='my-12 mx-auto w-fit' key={name}>
          <h1 className='text-lg'>{name}</h1>
          <Scale isTreble={isTreble} mode={type} userKeys={db}/>
        </div>
      ))
    }
    </main>
  );
}