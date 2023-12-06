import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Scale from "./scale";

const scaleClass = 'my-12 mx-auto w-fit';

export default function Scales() {
  const isTreble = getCookie('clef', { cookies }) !== 'bass';
  return (
    <main className='min-h-full w-full bg-red-100 p-1 grid grid-cols-2 justify-center'>
      <div className={scaleClass}>
        <h1 className='text-lg'>Major Scale</h1>
        <Scale isTreble={isTreble} mode={'major'}/>
      </div>
      <div className={scaleClass}>
        <h1 className='text-lg'>Minor Scale</h1>
        <Scale isTreble={isTreble} mode={'minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className='text-lg'>Minor Scale</h1>
        <Scale isTreble={isTreble} mode={'minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className='text-lg'>Minor Scale</h1>
        <Scale isTreble={isTreble} mode={'minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className='text-lg'>Minor Scale</h1>
        <Scale isTreble={isTreble} mode={'minor'}/>
      </div>
      <div className={scaleClass}>
        <h1 className='text-lg'>Minor Scale</h1>
        <Scale isTreble={isTreble} mode={'minor'}/>
      </div>
    </main>
  );
}