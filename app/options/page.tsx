import ClefOptions from '../components/clefOptions';
import { getPageSession } from '../auth/lucia';
import Form from '../components/luciaForm';
import Preferences from "@/app/models/preferences";
import { IPreferences } from '@/app/models/preferences';

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
  const preferences = await Preferences.findOne({ user_id: session.user.userId }).lean() as IPreferences;
  const selectedClef = preferences?.clef || 'bass';
  return (
    <main>
      <Form action='/api/preferences'>
        <h1 className={optionHeaderClass}>Clef</h1>
          <div>
          <input type='radio' name='clef' id='treble' value='treble' defaultChecked={selectedClef !== 'bass'}/>
          <label htmlFor='treble'>Treble</label>
          <input type='radio' name='clef' id='bass' value='bass' defaultChecked={selectedClef === 'bass'}/>
          <label htmlFor='bass'>Bass</label>
        </div>
        <input type='submit' value='Save' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1'/>
      </Form>
    </main>
  );
}