import { getCookie, setCookie } from 'cookies-next';
import ClefOptions from '../components/clefOptions';
import { getPageSession } from '../auth/lucia';

// instead of saving settings to cookie or db when making changes, have a save button that saves all changes and forces navigation to home page + refresh

const optionHeaderClass = 'font-bold';

// put options like bass clef or treble clef here
export default async function Options() {
  const session = await getPageSession();
  return (
    <main>
      <ClefOptions session={session}/>
      {session &&
        <div></div>
      }
    </main>
  );
}