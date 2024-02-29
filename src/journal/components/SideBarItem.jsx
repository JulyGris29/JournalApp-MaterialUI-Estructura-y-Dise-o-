/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { useDispatch } from 'react-redux'
import { Grid, ListItemButton, ListItemText, ListItem, ListItemIcon } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { setActiveNote } from '../../store/journal';

// eslint-disable-next-line no-unused-vars
export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars
    const onClickNote = () => {
        // eslint-disable-next-line no-undef
        dispatch( setActiveNote ({ title, body, id, date, imageUrls }) )
    }

    const newTitle = useMemo( () => {
        return title.length > 17
        ? title.substring(0,17) + '...'
        : title;
    },[ title ])

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={ onClickNote }>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle } />
            <ListItemText secondary={ body } />
        </Grid>                                     
    </ListItemButton>
</ListItem>
  )
}
