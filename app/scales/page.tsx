import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Scale from "./scale";

export default function Scales() {
  const isTreble = getCookie('clef', { cookies }) !== 'bass';
  return (
    <main>
      <Scale isTreble={isTreble}/>
    </main>
  );
}