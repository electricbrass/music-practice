import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Scale from "./scale";

const scaleClass = 'my-12 mx-auto w-fit';

// make it so some days it says hey do all 12 major scales (in order like, fourths, or descending whole steps)
// on other days its heres one of each type of scale, all on the same root
// other days the minors are relative to the major instead of parallel

export default function Scales() {
  const isTreble = getCookie('clef', { cookies }) !== 'bass';
  return (
    <main className='min-h-full w-full bg-red-100 p-1 grid grid-cols-2 justify-center'>
      <div className={scaleClass}>
        <h1 className='text-lg'>Major Scale</h1>
        <Scale isTreble={isTreble} mode={'major'}/>
      </div>
      <div className={scaleClass}>
        <h1 className='text-lg'>Natural Minor Scale</h1>
        <Scale isTreble={isTreble} mode={'minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className='text-lg'>Harmonic Minor Scale -- NOT IMPLEMENTED</h1>
        <Scale isTreble={isTreble} mode={'minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className='text-lg'>Melodic Minor Scale -- NOT IMPLEMENTED</h1>
        <Scale isTreble={isTreble} mode={'minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className='text-lg'>Major Pentatonic Scale -- NOT IMPLEMENTED</h1>
        <Scale isTreble={isTreble} mode={'minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className='text-lg'>Minor Pentatonic Scale -- NOT IMPLEMENTED</h1>
        <Scale isTreble={isTreble} mode={'minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className='text-lg'>Minor Blues Scale -- NOT IMPLEMENTED</h1>
        <Scale isTreble={isTreble} mode={'minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className='text-lg'>Half-Whole Diminished Scale -- NOT IMPLEMENTED</h1>
        <Scale isTreble={isTreble} mode={'minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className='text-lg'>Dorian Scale -- NOT IMPLEMENTED</h1>
        <Scale isTreble={isTreble} mode={'minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className='text-lg'>Altered Dominant Scale -- NOT IMPLEMENTED</h1>
        <Scale isTreble={isTreble} mode={'minor'}/>
      </div>
    </main>
  );
}