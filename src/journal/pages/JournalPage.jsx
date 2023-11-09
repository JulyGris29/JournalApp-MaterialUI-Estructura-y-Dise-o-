import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';

export const JournalPage = () => {
  return (
    <JournalLayout>
    {/* <Typography> Enim minim tempor pariatur aliqua esse laboris labore commodo est proident.</Typography> */}
    
    <NothingSelectedView/>
    {/* <NoteView/> */}
    {/* NothingView */}

    <IconButton
      size='large'
      sx={{
        color: 'white',
        backgroundColor: 'erro.main',
        ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
        position: 'fixed',
        right: 50,
        bottom:50
      }}
     >
      <AddOutlined sx={{ fontSize : 30}} />

    </IconButton>
     </JournalLayout>
  )
}
