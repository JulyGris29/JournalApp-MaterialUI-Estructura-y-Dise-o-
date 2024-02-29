
import { Box, Divider, Drawer, List,Toolbar, Typography } from "@mui/material"
import { useSelector } from 'react-redux';  
import { SideBarItem } from "./";



// eslint-disable-next-line react/prop-types
export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector (state => state.auth );
    const { notes } = useSelector (state => state.journal );


    return (
        <Box
            compoment='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}

        >
            <Drawer
                variant='permanent' //temporary
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}

            >
                <Toolbar>
                    <Typography variant='h6' noWrap compoment='div'>
                        { displayName }

                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map(note=> (
                            <SideBarItem key={ note.id } {...note } />
                        ))
                    }
                </List>
            </Drawer>

        </Box>
    )
}
