// put options like bass clef or treble clef here
export default function Options() {
  return (
    <div className='h-screen'>
      <input type='radio' name='clef' id='treble' value='Treble'/>
      <label htmlFor='treble'>Treble</label>
      <input type='radio' name='clef' id='bass' value='Bass'/>
      <label htmlFor='bass'>Bass</label>
    </div>
  );
}