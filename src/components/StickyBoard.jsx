import React, { useState } from 'react';
import { Box } from '@mui/material';
import StickyNote from './StickyNote';
import NoteToolbar from './NoteToolbar';

const StickyBoard = ({ notes, onAddNote, onUpdateNote, onDeleteNote }) => {
  const [background, setBackground] = useState('#ffffff');
  const [maxZIndex, setMaxZIndex] = useState(1);

  const getRandomColor = () => {
    const colors = ['#FFC107', '#FF9800', '#FF5722', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const addNote = (color) => {
    const newNote = {
      id: Date.now(),
      text: '',
      position: { x: 50, y: 50 },
      color: color || getRandomColor(),
      zIndex: maxZIndex + 1,
    };
    onAddNote(newNote);
    setMaxZIndex(maxZIndex + 1);
  };

  const bringToFront = (id) => {
    const newMaxZIndex = maxZIndex + 1;
    const updatedNote = notes.find(note => note.id === id);
    if (updatedNote) {
      onUpdateNote({ ...updatedNote, zIndex: newMaxZIndex });
      setMaxZIndex(newMaxZIndex);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: background, position: 'relative', overflow: 'hidden' }}>
      <NoteToolbar addNote={addNote} setBackground={setBackground} />
      {notes.map((note) => (
        <StickyNote
          key={note.id}
          note={note}
          updateNote={onUpdateNote}
          deleteNote={onDeleteNote}
          bringToFront={bringToFront}
        />
      ))}
    </Box>
  );
};

export default StickyBoard;