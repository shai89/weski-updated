import React from 'react';
import { Stack } from '@mui/material';
import AdventureExplorer from './components/AdventureExplorer'

const App: React.FC = () => {
  return (
    <Stack direction="column" spacing={6} sx={{ width: '100%' }}>
      <AdventureExplorer />
    </Stack>
  );
}

export default App;
