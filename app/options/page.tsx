import ClefOptions from '../components/clefOptions';
import { getPageSession } from '../auth/lucia';
import Form from '../components/luciaForm';
import Preferences from "@/app/models/preferences";
import { IPreferences } from '@/app/models/preferences';
import toast from 'react-hot-toast';

const optionHeaderClass = 'font-bold';

// put options like bass clef or treble clef here
export default async function Options() {
  const session = await getPageSession();
  if (!session) {
    return (
    <main>
      <ClefOptions/>
    </main>
    );
  }
  let preferences: IPreferences | undefined;
  try {
    preferences = await Preferences.findOne({ user_id: session.user.userId }).lean() as IPreferences;
  } catch (e) {
    toast.error('Error loading user preferences.')
  }
  const selectedClef = preferences?.clef || 'bass';
  return (
    <main>
      <Form action='/api/preferences' successMessage='Settings saved!'>
        <div>
          <h1 className={optionHeaderClass}>Clef</h1>
          <input className='mr-1' type='radio' name='clef' id='treble' value='treble' defaultChecked={selectedClef !== 'bass'}/>
          <label className='mr-1' htmlFor='treble'>Treble</label>
          <input className='mr-1' type='radio' name='clef' id='bass' value='bass' defaultChecked={selectedClef === 'bass'}/>
          <label className='mr-1' htmlFor='bass'>Bass</label>
        </div>
        {[
          ['Major Scale Keys', 'major', preferences?.major_keys, [
            ['C', 'C'],
            ['D', 'D'],
            ['E', 'E'],
            ['F', 'F'],
            ['G', 'G'],
            ['A', 'A'],
            ['B', 'B'],
            ['Cb', 'C-flat'],
            ['Db', 'D-flat'],
            ['Eb', 'E-flat'],
            ['Gb', 'G-flat'],
            ['Ab', 'A-flat'],
            ['Bb', 'B-flat'],
            ['C#', 'C-sharp'],
            ['F#', 'F-sharp'],
          ]],
          ['Natural Minor Scale Keys', 'natural minor', preferences?.n_minor_keys, [
            ['Cm', 'C'],
            ['Dm', 'D'],
            ['Em', 'E'],
            ['Fm', 'F'],
            ['Gm', 'G'],
            ['Am', 'A'],
            ['Bm', 'B'],
            ['Ebm', 'E-flat'],
            ['Abm', 'A-flat'],
            ['Bbm', 'B-flat'],
            ['C#', 'C-sharp'],
            ['D#', 'D-sharp'],
            ['F#', 'F-sharp'],
            ['G#', 'G-sharp'],
            ['A#m', 'A-sharp'],
          ]],
          ['Harmonic Minor Scale Keys', 'harmonic minor', preferences?.h_minor_keys, [
            ['Cm', 'C'],
            ['Dm', 'D'],
            ['Em', 'E'],
            ['Fm', 'F'],
            ['Gm', 'G'],
            ['Am', 'A'],
            ['Bm', 'B'],
            ['Ebm', 'E-flat'],
            ['Abm', 'A-flat'],
            ['Bbm', 'B-flat'],
            ['C#', 'C-sharp'],
            ['D#', 'D-sharp'],
            ['F#', 'F-sharp'],
            ['G#', 'G-sharp'],
            ['A#m', 'A-sharp'],
          ]],
          ['Melodic Minor Scale Keys', 'melodic minor', preferences?.m_minor_keys, [
            ['Cm', 'C'],
            ['Dm', 'D'],
            ['Em', 'E'],
            ['Fm', 'F'],
            ['Gm', 'G'],
            ['Am', 'A'],
            ['Bm', 'B'],
            ['Ebm', 'E-flat'],
            ['Abm', 'A-flat'],
            ['Bbm', 'B-flat'],
            ['C#', 'C-sharp'],
            ['D#', 'D-sharp'],
            ['F#', 'F-sharp'],
            ['G#', 'G-sharp'],
            ['A#m', 'A-sharp'],
          ]],
        ].map(([section, scale, db, keys]) => (
          <div key={section as string}>
          <h1 className={optionHeaderClass}>{section}</h1>
          <div className='my-2 border-2 border-black rounded w-fit shadow'>
            {(keys as string[][]).map(([keySig, label]) => (
              <span className='m-1 p-0.5' key={keySig}>
                <input type='checkbox' name={scale as string} className='mr-1' value={keySig} id={`${keySig} ${scale}`} defaultChecked={(db as string[])?.includes(keySig)} />
                <label htmlFor={`${keySig} ${scale}`}>{label}</label>
              </span>
            ))}
            </div>
          </div>
        ))}
        <input type='submit' value='Save' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1 cursor-pointer'/>
      </Form>
    </main>
  );
}