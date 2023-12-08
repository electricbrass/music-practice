import Image from "next/image";

const defaultSongs = [
  'Blue Bossa',
  'Song for My Father',
  'Killer Joe',
  'All the Things You Are',
  'Recorda Me',
  'How High the Moon',
  'Summertime',
  'Watermelon Man',
  'The Girl from Ipanema',
  'Beautiful Love',
]

export default function Songs() {
  const song = defaultSongs[defaultSongs.length * Math.random() << 0];
  return (
    <main>
      <h1 className='text-2xl mx-auto mt-24 text-center'>Today&apos;s Song: <span className='font-bold'>{song}</span></h1>
      <h1 className='text-7xl mx-auto text-center mt-20 font-mono'>Under Construction</h1>
      <Image className='mx-auto my-24' alt='construction blockade' width={200} height={200} src='https://cdn3.iconfinder.com/data/icons/travel-and-places-1-1/32/43-512.png'></Image>
    </main>
  );
}