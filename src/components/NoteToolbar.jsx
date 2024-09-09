import { useState } from 'react';
import { AppBar, Toolbar, Select, MenuItem, Button, TextField, Box, useMediaQuery, useTheme } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';

const NoteToolbar = ({ addNote, setBackground }) => {
  const [noteColor, setNoteColor] = useState('yellow');
  const [bgColor, setBgColor] = useState('#ffffff');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppBar position="static" color="default">
      <Toolbar sx={{ flexDirection: isMobile ? 'column' : 'row', padding: 2, gap: 2, position: 'relative' }}>
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: 2, width: isMobile ? '100%' : 'auto' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => addNote()}
            sx={{ flex: isMobile ? '1' : '0 1 auto' }}
          >
            Add Note
          </Button>
        </Box>
        <Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
          <h1 style={{ margin: 0, whiteSpace: 'nowrap', fontSize: '2rem' }}>Sticky Note</h1>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: 2, width: isMobile ? '100%' : 'auto', ml: isMobile ? 0 : 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              sx={{
                width: '40px',
                height: '40px',
                padding: 0,
                border: 'none',
                overflow: 'hidden',
                position: 'relative',
                '& .MuiInputBase-root': {
                  width: '100%',
                  height: '100%',
                },
                '& .MuiInputBase-input': {
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                }
              }}
              InputProps={{
                startAdornment: (
                  <ColorLensIcon
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: bgColor,
                      pointerEvents: 'none',
                    }}
                  />
                ),
              }}
            />
          </Box>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => setBackground(bgColor)}
            sx={{ flex: isMobile ? '1' : '0 1 auto' }}
          >
            Set Background
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NoteToolbar;