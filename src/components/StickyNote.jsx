import { useState } from 'react';
import { Paper, TextField, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Draggable from 'react-draggable';

const StickyNote = ({ note, updateNote, deleteNote, bringToFront }) => {
  const [content, setContent] = useState(note.text);
  
  const handleBlur = () => {
    updateNote({ ...note, text: content });
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleDragStop = (e, data) => {
    updateNote({ ...note, position: { x: data.x, y: data.y } });
  };

  return (
    <Draggable
      bounds="parent"
      defaultPosition={note.position}
      onStop={handleDragStop}
    >
      <Paper
        elevation={3}
        onClick={() => bringToFront(note.id)}
        sx={{
          position: 'absolute',
          width: 200,
          height: 200,
          padding: 2,
          backgroundColor: note.color,
          display: 'flex',
          flexDirection: 'column',
          zIndex: note.zIndex,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            multiline
            fullWidth
            variant="standard"
            value={content}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="New Note"
            InputProps={{
              disableUnderline: true,
              style: { fontSize: '1rem' }
            }}
          />
        </Box>
        <Box sx={{ alignSelf: 'flex-end' }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(note.id);
            }}
            sx={{ color: 'action.active' }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Paper>
    </Draggable>
  );
};

export default StickyNote;