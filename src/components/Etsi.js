import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Box, ImageList, ImageListItem, ImageListItemBar, Typography, createTheme} from '@mui/material';
import {ThemeProvider} from '@mui/styles';
import axios from 'axios';

const theme = createTheme({
    components: {
        MuiBox: {
            styleOverrides: {
              root: {
                display: 'flex',
                flexWrap: "wrap",
                justifyContent: "space-around",
                overflow: "hidden",
                }
          },
        MuiImageList: {
            styleOverrides: {
                root: {
                    width: 'auto',
                    height: 'auto'
                }
            }
        },
        },
}});

/*const kuvat = [
    {
    img: 'https://images.unsplash.com/photo-1627308594190-a057cd4bfac8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80',
    title: 'Aamiainen', kat: 'aamu',
    },
    {
    img: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    title: 'Pääruoka', kat: 'paa',
    },
    {
    img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    title: 'Jälkiruoka', kat: 'jalki',
    },
    {
    img: 'https://images.unsplash.com/photo-1517087209106-3f42cd661afa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    title: 'Juhlat ja pyhät', kat: 'juhla',
    },
    {
    img: 'https://images.unsplash.com/photo-1563736113551-beda7ee0ebde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
    title: 'Suolainen leivonta', kat: 'suola',
    },
    {
    img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    title: 'Makea leivonta', kat: 'makea',
    },
]*/
export default function Etsi() {
    const [kategoriat, setKategoriat] = useState([]);
    useEffect( () => {
        const haeKategoriat = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/kategoria/all`);
                setKategoriat(response.data);
            } catch (error) {
                setKategoriat([]);
            }
        }
        haeKategoriat();
        }, [])

    return (
    <ThemeProvider theme={theme}>
    <Box>
        <ImageList cols={3}>
            {kategoriat.map((kat) => (
            <ImageListItem key={kat.kuva} component={Link} to={'/nayta/'+kat.katid}>
            <img src={kat.kuva} srcSet={kat.kuva} alt={kat.otsikko} loading="lazy"/>
                <ImageListItemBar title={<Typography variant='h5' textAlign={'center'}>{kat.otsikko}</Typography>}
                sx={{position:'absolute', top:'40%', bottom:'40%'}}/>
            </ImageListItem>
        ))}
        </ImageList>
    </Box>
    </ThemeProvider>
    );
}