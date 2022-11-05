import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Box, AppBar, Toolbar, Typography, IconButton, Divider} from '@mui/material';
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CategoryIcon from '@mui/icons-material/Category';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navigaatio() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(true);}
    const handleClose = () => {setOpen(false);}
    
    return (
    <Box>
        <AppBar position='relative' color='primary'>
            <Toolbar>
                <IconButton color='inherit' onClick={ handleOpen }><MenuIcon /></IconButton>
                <Typography variant='h6' color='inherit' sx={{textDecoration: 'none'}} component={Link} to='/'>Reseptikirja</Typography>
            </Toolbar>
        </AppBar>
        <nav>
            <Drawer anchor='left' open={ open } onClick={ handleClose }>
            <Typography variant='head' align='center' sx={{marginTop:2}}>Reseptisi</Typography>
            <Divider sx={{margin:2}}/>
                <List>
                    <ListItem button component={Link} to='/'>
                        <ListItemIcon><MenuIcon/></ListItemIcon>
                        <ListItemText primary='Etusivu'/>
                    </ListItem>
                    <ListItem button to='/etsi' component={Link}>
                        <ListItemIcon><AutoStoriesIcon/></ListItemIcon>
                        <ListItemText primary='Reseptihaku'/>
                    </ListItem>
                    <ListItem button to='/tallennus' component={Link}>
                        <ListItemIcon><CreateIcon/></ListItemIcon>
                        <ListItemText primary='Tallennus'/>
                    </ListItem>
                    <ListItem button to='/kategoriat' component={Link}>
                        <ListItemIcon><CategoryIcon/></ListItemIcon>
                        <ListItemText primary='Kategoriat'/>
                    </ListItem>
                    <ListItem button to='/ainekset' component={Link}>
                        <ListItemIcon><AutoStoriesIcon/></ListItemIcon>
                        <ListItemText primary='Ainekset'/>
                    </ListItem>
                </List>
            </Drawer>
        </nav>
    </Box>
    );
}