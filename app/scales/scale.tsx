'use client'

import { useEffect, useRef } from "react";
import { Vex } from "vexflow";

type NoteType = [string, number]

type scaleType = 'major' | 'minor'

const scaleTemplate = [['c', 0], ['d', 0], ['e', 0], ['f', 0], ['g', 0], ['a', 0], ['b', 0], ['c', 1], ['d', 1], ['e', 1], ['f', 1], ['g', 1], ['a', 1], ['b', 1]] as NoteType[]

function get7NoteScale(root: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G') {
  switch(root) {
    case 'A':
      return scaleTemplate.slice(5, 12);
    case 'B':
      return scaleTemplate.slice(6, 13);
    case 'C':
      return scaleTemplate.slice(0, 7);
    case 'D':
      return scaleTemplate.slice(1, 8);
    case 'E':
      return scaleTemplate.slice(2, 9);
    case 'F':
      return scaleTemplate.slice(3, 10);
    case 'G':
      return scaleTemplate.slice(4, 11);
  }
}

const scales = new Map<scaleType, { [key: string]: NoteType[] }>([
  ['major', {
    'Cb': get7NoteScale('C'),
    'C':  get7NoteScale('C'),
    'C#': get7NoteScale('C'),
    'Db': get7NoteScale('D'),
    'D':  get7NoteScale('D'),
    'Eb': get7NoteScale('E'),
    'E':  get7NoteScale('E'),
    'F':  get7NoteScale('F'),
    'F#': get7NoteScale('F'),
    'Gb': get7NoteScale('G'),
    'G':  get7NoteScale('G'),
    'Ab': get7NoteScale('A'),
    'A':  get7NoteScale('A'),
    'Bb': get7NoteScale('B'),
    'B':  get7NoteScale('B')
  }],
  ['minor', {
    'Cm':  get7NoteScale('C'),
    'C#m': get7NoteScale('C'),
    'Dm':  get7NoteScale('D'),
    'D#m': get7NoteScale('D'),
    'Ebm': get7NoteScale('E'),
    'Em':  get7NoteScale('E'),
    'Fm':  get7NoteScale('F'),
    'F#m': get7NoteScale('F'),
    'Gm':  get7NoteScale('G'),
    'G#m': get7NoteScale('G'),
    'Abm': get7NoteScale('A'),
    'Am':  get7NoteScale('A'),
    'A#m': get7NoteScale('A'),
    'Bbm': get7NoteScale('B'),
    'Bm':  get7NoteScale('B'),
  }]
])

export default function Scale({ isTreble, mode }: { isTreble: boolean, mode: scaleType}) {
  const outputRef = useRef(null!);
  useEffect(() => {
    const { Renderer, Stave, StaveNote, Voice, Formatter } = Vex.Flow;
    
    const scale = scales.get(mode);
    const keys = Object.keys(scale!);
    const key = keys[keys.length * Math.random() << 0] as keyof typeof scale;

    const notes = scale![key].map((note) => new StaveNote({ keys: [`${note[0]}/${note[1] + (isTreble ? 4 : 2)}`], duration: 'q', clef: isTreble ? 'treble' : 'bass' }));
    notes.push(new StaveNote({ keys: [`${scale![key][0][0]}/${scale![key][0][1] + (isTreble ? 4 : 2) + 1}`], duration: 'q', clef: isTreble ? 'treble' : 'bass' }));
    notes.push(...scale![key].toReversed().map((note) => new StaveNote({ keys: [`${note[0]}/${note[1] + (isTreble ? 4 : 2)}`], duration: 'q', clef: isTreble ? 'treble' : 'bass' })));

    // Create an SVG renderer and attach it to the DIV element pointed to by outputRef
    const renderer = new Renderer(outputRef.current, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(700, 600);
    const context = renderer.getContext();
    context.setFont('Arial', 10);

    // Create a stave of width 400 at position 10, 40.
    const stave = new Stave(40, 40, 700);

    const voice = new Voice({ num_beats: 15, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 300 pixels.
    new Formatter().joinVoices([voice]).format([voice], 500);

    // Add a clef
    stave.addClef(isTreble ? 'treble' : 'bass');
    // add key signature
    stave.addKeySignature(key);

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
    // Render voice
    voice.draw(context, stave);
  }, [isTreble, mode])
  return (
    <div ref={outputRef} id='output' className='bg-amber-100 h-full w-full'></div>
  );
}