import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Scale from "../components/scale";

const scaleClass = 'my-12 mx-auto w-fit';
const scaleHeaderClass = 'text-lg';

// make it so some days it says hey do all 12 major scales (in order like, fourths, or descending whole steps)
// on other days its heres one of each type of scale, all on the same root
// other days the minors are relative to the major instead of parallel

export default function Scales() {
  const isTreble = getCookie('clef', { cookies }) !== 'bass';
  return (
    <main className='grid grid-cols-2 justify-center'>
      <div className={scaleClass}>
        <h1 className={scaleHeaderClass}>Major Scale</h1>
        <Scale isTreble={isTreble} mode={'major'}/>
      </div>
      <div className={scaleClass}>
        <h1 className={scaleHeaderClass}>Natural Minor Scale</h1>
        <Scale isTreble={isTreble} mode={'natural minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className={scaleHeaderClass}>Harmonic Minor Scale</h1>
        <Scale isTreble={isTreble} mode={'harmonic minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className={scaleHeaderClass}>Melodic Minor Scale</h1>
        <Scale isTreble={isTreble} mode={'melodic minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className={scaleHeaderClass}>Major Pentatonic Scale -- NOT IMPLEMENTED</h1>
        <Scale isTreble={isTreble} mode={'natural minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className={scaleHeaderClass}>Minor Pentatonic Scale -- NOT IMPLEMENTED</h1>
        <Scale isTreble={isTreble} mode={'natural minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className={scaleHeaderClass}>Minor Blues Scale -- NOT IMPLEMENTED</h1>
        <Scale isTreble={isTreble} mode={'natural minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className={scaleHeaderClass}>Half-Whole Diminished Scale -- NOT IMPLEMENTED</h1>
        <Scale isTreble={isTreble} mode={'natural minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className={scaleHeaderClass}>Dorian Scale -- NOT IMPLEMENTED</h1>
        <Scale isTreble={isTreble} mode={'natural minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className={scaleHeaderClass}>Altered Dominant Scale -- NOT IMPLEMENTED</h1>
        <Scale isTreble={isTreble} mode={'natural minor'}/>
      </div>
    </main>
  );
}