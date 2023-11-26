'use client'

import { useEffect } from "react";
import { Vex } from "vexflow";

const major_scales = {
  'Cb': [['c', 4], ['d', 4], ['e', 4], ['f', 4], ['g', 4], ['a', 4], ['b', 4]],
  'C':  [['c', 4], ['d', 4], ['e', 4], ['f', 4], ['g', 4], ['a', 4], ['b', 4]],
  'C#': [['c', 4], ['d', 4], ['e', 4], ['f', 4], ['g', 4], ['a', 4], ['b', 4]],
  'Db': [['d', 4], ['e', 4], ['f', 4], ['g', 4], ['a', 4], ['b', 4], ['c', 5]],
  'D':  [['d', 4], ['e', 4], ['f', 4], ['g', 4], ['a', 4], ['b', 4], ['c', 5]],
  'Eb': [['e', 4], ['f', 4], ['g', 4], ['a', 4], ['b', 4], ['c', 5], ['d', 5]],
  'E':  [['e', 4], ['f', 4], ['g', 4], ['a', 4], ['b', 4], ['c', 5], ['d', 5]],
  'F':  [['f', 4], ['g', 4], ['a', 4], ['b', 4], ['c', 5], ['d', 5], ['e', 5]],
  'F#': [['f', 4], ['g', 4], ['a', 4], ['b', 4], ['c', 5], ['d', 5], ['e', 5]],
  'Gb': [['g', 4], ['a', 4], ['b', 4], ['c', 5], ['d', 5], ['e', 5], ['f', 5]],
  'G':  [['g', 4], ['a', 4], ['b', 4], ['c', 5], ['d', 5], ['e', 5], ['f', 5]],
  'Ab': [['a', 4], ['b', 4], ['c', 5], ['d', 5], ['e', 5], ['f', 5], ['g', 5]],
  'A':  [['a', 4], ['b', 4], ['c', 5], ['d', 5], ['e', 5], ['f', 5], ['g', 5]],
  'Bb': [['b', 4], ['c', 5], ['d', 5], ['e', 5], ['f', 5], ['g', 5], ['a', 5]],
  'B':  [['b', 4], ['c', 5], ['d', 5], ['e', 5], ['f', 5], ['g', 5], ['a', 5]],
}

const major_keys = Object.keys(major_scales);

export default function Scale({ isTreble }: { isTreble: boolean }) {
  useEffect(() => {
    const { Renderer, Stave, StaveNote, Voice, Formatter } = Vex.Flow;
    
    const key = major_keys[major_keys.length * Math.random() << 0] as keyof typeof major_scales;

    const notes = major_scales[key].map((note) => new StaveNote({ keys: [`${note[0]}/${note[1]}`], duration: 'q' }));
    notes.push(new StaveNote({ keys: [`${major_scales[key][0][0]}/${major_scales[key][0][1] as number + 1}`], duration: 'q' }));

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
    <div id='output'></div>
  );
}