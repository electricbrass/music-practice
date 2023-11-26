'use client'

import { useEffect } from "react";
import { Vex } from "vexflow";

type noteType = [string, number]

const major_scales = {
  'Cb': [['c', 0], ['d', 0], ['e', 0], ['f', 0], ['g', 0], ['a', 0], ['b', 0]] as noteType[],
  'C':  [['c', 0], ['d', 0], ['e', 0], ['f', 0], ['g', 0], ['a', 0], ['b', 0]] as noteType[],
  'C#': [['c', 0], ['d', 0], ['e', 0], ['f', 0], ['g', 0], ['a', 0], ['b', 0]] as noteType[],
  'Db': [['d', 0], ['e', 0], ['f', 0], ['g', 0], ['a', 0], ['b', 0], ['c', 1]] as noteType[],
  'D':  [['d', 0], ['e', 0], ['f', 0], ['g', 0], ['a', 0], ['b', 0], ['c', 1]] as noteType[],
  'Eb': [['e', 0], ['f', 0], ['g', 0], ['a', 0], ['b', 0], ['c', 1], ['d', 1]] as noteType[],
  'E':  [['e', 0], ['f', 0], ['g', 0], ['a', 0], ['b', 0], ['c', 1], ['d', 1]] as noteType[],
  'F':  [['f', 0], ['g', 0], ['a', 0], ['b', 0], ['c', 1], ['d', 1], ['e', 1]] as noteType[],
  'F#': [['f', 0], ['g', 0], ['a', 0], ['b', 0], ['c', 1], ['d', 1], ['e', 1]] as noteType[],
  'Gb': [['g', 0], ['a', 0], ['b', 0], ['c', 1], ['d', 1], ['e', 1], ['f', 1]] as noteType[],
  'G':  [['g', 0], ['a', 0], ['b', 0], ['c', 1], ['d', 1], ['e', 1], ['f', 1]] as noteType[],
  'Ab': [['a', 0], ['b', 0], ['c', 1], ['d', 1], ['e', 1], ['f', 1], ['g', 1]] as noteType[],
  'A':  [['a', 0], ['b', 0], ['c', 1], ['d', 1], ['e', 1], ['f', 1], ['g', 1]] as noteType[],
  'Bb': [['b', 0], ['c', 1], ['d', 1], ['e', 1], ['f', 1], ['g', 1], ['a', 1]] as noteType[],
  'B':  [['b', 0], ['c', 1], ['d', 1], ['e', 1], ['f', 1], ['g', 1], ['a', 1]] as noteType[],
}

const major_keys = Object.keys(major_scales);

export default function Scale({ isTreble }: { isTreble: boolean }) {
  useEffect(() => {
    const { Renderer, Stave, StaveNote, Voice, Formatter } = Vex.Flow;
    
    const key = major_keys[major_keys.length * Math.random() << 0] as keyof typeof major_scales;

    const notes = major_scales[key].map((note) => new StaveNote({ keys: [`${note[0]}/${note[1] + (isTreble ? 4 : 2)}`], duration: 'q', clef: isTreble ? 'treble' : 'bass' }));
    notes.push(new StaveNote({ keys: [`${major_scales[key][0][0]}/${major_scales[key][0][1] + (isTreble ? 4 : 2) + 1}`], duration: 'q', clef: isTreble ? 'treble' : 'bass' }));

    // Create an SVG renderer and attach it to the DIV element with id="output".
    const div = document.getElementById('output') as HTMLDivElement;
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(500, 500);
    const context = renderer.getContext();
    context.setFont('Arial', 10);

    // Create a stave of width 400 at position 10, 40.
    const stave = new Stave(10, 40, 500);

    const voice = new Voice({ num_beats: 8, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    new Formatter().joinVoices([voice]).format([voice], 350);

    // Add a clef
    stave.addClef(isTreble ? 'treble' : 'bass');
    // add key signature
    stave.addKeySignature(key);

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
    // Render voice
    voice.draw(context, stave);
  }, [isTreble])
  return (
    <div id='output' className='bg-amber-100 ml-48 h-screen'></div>
  );
}