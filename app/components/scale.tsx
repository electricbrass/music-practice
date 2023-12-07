'use client'

import { useEffect, useRef } from "react";
import { Vex, Voice } from "vexflow";

type NoteType = [string, number]

type scaleType = 'major' | 'minor'
type NoteLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
type Key = `${'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'}${'' | 'b' | '#'}${'' | 'm'}`

const scaleTemplate = [['c', 0], ['d', 0], ['e', 0], ['f', 0], ['g', 0], ['a', 0], ['b', 0], ['c', 1], ['d', 1], ['e', 1], ['f', 1], ['g', 1], ['a', 1], ['b', 1]] as NoteType[]

function make7NoteScale(root: NoteLetter) {
  switch(root) {
    case 'A':
      return scaleTemplate.slice(5, 12);
    case 'B':
      return scaleTemplate.slice(6, 13) .map((item) => [item[0], item[1] - 1] as NoteType);
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

// functions that make blues and pentatonic scales from the 7 note scales
// make sure to get all the accidentals for these
function makeMinorPentatonic(root: NoteLetter) {
  const scale = make7NoteScale(root);
  return [scale[0], scale[2], scale[3], scale[4], scale[6]];
}

function makeMajorPentatonic(root: NoteLetter) {
  const scale = make7NoteScale(root);
  return [scale[0], scale[1], scale[2], scale[4], scale[6]];
}

function makeBlues(root: NoteLetter) {
  const scale = make7NoteScale(root);
  return [scale[0], scale[2], scale[3], scale[3], scale[4], scale[6]];
}

// do this one later
function makeDiminished(root: NoteLetter) {
  const scale = make7NoteScale(root);
  return [];
}

function makeAltered(root: NoteLetter) {
  const scale = make7NoteScale(root);
  return [scale[0], scale[1], scale[1], scale[2], scale[4], scale[4], scale[5], scale[6]];
}

function raised7Type(key: Key) {
  switch (key) {
    // becomes sharp
    case 'Am':
    case 'Bm':
    case 'Dm':
    case 'Em':
    case 'Gm':
    case 'F#m':
    case 'C#m':
    case 'G#m':
    case 'D#m':
    case 'A#m':
      return '#'
    // becomes natural
    case 'Cm':
    case 'Fm':
    case 'Abm':
    case 'Bbm':
    case 'Ebm':
      return 'n'
    default:
      return ''
  }
}

// dorian and the minors all use the 7 note scale

const scales = new Map<scaleType, string[]>([
  ['major', ['Cb', 'C','C#','Db','D','Eb','E','F','F#','Gb','G','Ab','A','Bb','B']],
  ['minor', ['Cm', 'C#m','Dm','D#m','Ebm','Em','Fm','F#m','Gm','G#m','Abm','Am','A#m','Bbm','Bm']]
])

export default function Scale({ isTreble, mode }: { isTreble: boolean, mode: scaleType}) {
  const outputRef = useRef(null!);
  useEffect(() => {
    const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow;
    
    const keys = scales.get(mode);
    const key = keys![keys!.length * Math.random() << 0] as Key;
    const scale = make7NoteScale(key.charAt(0) as NoteLetter);

    const notes = scale.map((note) => new StaveNote({ keys: [`${note[0]}/${note[1] + (isTreble ? 4 : 2)}`], duration: 'q', clef: isTreble ? 'treble' : 'bass', auto_stem: true }));
    notes.push(new StaveNote({ keys: [`${scale[0][0]}/${scale[0][1] + (isTreble ? 4 : 2) + 1}`], duration: 'q', clef: isTreble ? 'treble' : 'bass', auto_stem: true }));
    notes.push(...scale.toReversed().map((note) => new StaveNote({ keys: [`${note[0]}/${note[1] + (isTreble ? 4 : 2)}`], duration: 'q', clef: isTreble ? 'treble' : 'bass', auto_stem: true })));

    if (mode === 'minor') {
      notes[6].addModifier(new Accidental(raised7Type(key)));
    }

    if (mode === 'minor') {
      // notes[5].addModifier(new Accidental(raised6Type(key)));
      // notes[8].addModifier(new Accidental());
      // notes[9].addModifier(new Accidental());
    }

    // Create an SVG renderer and attach it to the DIV element pointed to by outputRef
    const renderer = new Renderer(outputRef.current, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(700, 150);
    const context = renderer.getContext();
    context.setFont('Arial', 10);

    // Create a stave of width 400 at position 10, 40.
    const stave = new Stave(0, 15, 700);

    const voice = new Voice({ num_beats: 15, beat_value: 4 });
    voice.addTickables(notes);
    // Accidental.applyAccidentals([voice], key);

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
    
    const windowWidth = window.innerWidth;
    if (windowWidth !== 1920) {
      const scaleFactor = windowWidth / 1920;
      renderer.resize(700 * scaleFactor, 150 * scaleFactor);
      context.scale(scaleFactor, scaleFactor);
    }
  }, [isTreble, mode])
  return (
    <div ref={outputRef} id='output' className='bg-amber-100 h-fit w-fit p-4 rounded-lg shadow'></div>
  );
}