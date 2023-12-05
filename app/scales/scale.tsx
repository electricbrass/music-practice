'use client'

import { useEffect, useRef } from "react";
import { Vex } from "vexflow";

type NoteType = [string, number]

type scaleType = 'major' | 'minor'

const scaleTemplate = [['c', 0], ['d', 0], ['e', 0], ['f', 0], ['g', 0], ['a', 0], ['b', 0], ['c', 1], ['d', 1], ['e', 1], ['f', 1], ['g', 1], ['a', 1], ['b', 1]] as NoteType[]

const scales = new Map<scaleType, { [key: string]: NoteType[] }>([
  ['major', {
    'Cb': scaleTemplate.slice(0, 7),
    'C':  scaleTemplate.slice(0, 7),
    'C#': scaleTemplate.slice(0, 7),
    'Db': scaleTemplate.slice(1, 7),
    'D':  scaleTemplate.slice(1, 7),
    'Eb': scaleTemplate.slice(2, 9),
    'E':  scaleTemplate.slice(2, 9),
    'F':  scaleTemplate.slice(3, 10),
    'F#': scaleTemplate.slice(3, 10),
    'Gb': scaleTemplate.slice(4, 11),
    'G':  scaleTemplate.slice(4, 11),
    'Ab': scaleTemplate.slice(5, 12),
    'A':  scaleTemplate.slice(5, 12),
    'Bb': scaleTemplate.slice(6, 13),
    'B':  scaleTemplate.slice(6, 13),
  }],
  ['minor', {
    'Cm':  scaleTemplate.slice(0, 7),
    'C#m': scaleTemplate.slice(0, 7),
    'Dm':  scaleTemplate.slice(1, 8),
    'D#m': scaleTemplate.slice(1, 8),
    'Ebm': scaleTemplate.slice(2, 9),
    'Em':  scaleTemplate.slice(2, 9),
    'Fm':  scaleTemplate.slice(3, 10),
    'F#m': scaleTemplate.slice(3, 10),
    'Gm':  scaleTemplate.slice(4, 11),
    'G#m': scaleTemplate.slice(4, 11),
    'Abm': scaleTemplate.slice(5, 12),
    'Am':  scaleTemplate.slice(5, 12),
    'A#m': scaleTemplate.slice(5, 12),
    'Bbm': scaleTemplate.slice(6, 13),
    'Bm':  scaleTemplate.slice(6, 13),
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