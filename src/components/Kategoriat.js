import { Box, List, ListItem, Typography, Alert } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { FormGroup, FormControl, InputLabel, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function Kategoriat() {
    const [kategoriat, setKategoriat] = useState([]);
    const [viesti, setViesti] = useState('');
    const [kategoria, setKategoria] = useState({
        otsikko: '',
        lyhenne: '',
        kuva: '',
    });

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

    const muuta = (e) => {
        setKategoria ({
            ...kategoria,
            [e.target.name]: e.target.value,
        })
    }

    const lisaaKategoria = async () => {
        const formData = {
            otsikko: kategoria.otsikko,
            lyhenne: kategoria.lyhenne,
            kuva: kategoria.kuva,
        }
        try {
            await axios.post(`http://localhost:8080/kategoria/add`, formData);
            setKategoria({
                otsikko: '',
                lyhenne: '',
                kuva: '',
        });
        setViesti('Lisääminen onnistui!');
        } catch (error) {
            setKategoria({
                otsikko: '',
                lyhenne: '',
                kuva: '',
            })
        setViesti('Lisäys ei onnistunut');
        }
    }

    const handleDelete = async (katid) => {
        try {
            await axios.get('http://localhost:8080/kategoria/delete/' + katid)
            setViesti('Poistettiin');
          } catch (error) {
            setViesti('Poisto ei onnistunut');
          }
    }

    const makeList = (kategoriat) => {
        return (
        <List>
        {kategoriat.map(kat => {
            return(
                <ListItem key={kat.katid}>
                    <Typography>{kat.otsikko}&ensp;</Typography>
                    <IconButton aria-label='poista' onClick={() => handleDelete(kat.katid)}><DeleteIcon/></IconButton>
                </ListItem>
            )
        })}
        </List>
        )
    }

    return (
        <Box sx={{margin:1}}>
            <Typography>Kategoriat</Typography>
            <List>
                {makeList(kategoriat)}
            </List>
            <FormGroup sx={{width: 400}}>
            <FormControl sx={{marginBottom:2}} focused>
                <InputLabel htmlFor='otsikko'>Otsikko</InputLabel>
                <TextField name='otsikko' value={kategoria.otsikko} onChange={(e) => muuta(e)} label='Otsikko' focused/>
            </FormControl>
            <FormControl sx={{marginBottom:2}} focused>
                <InputLabel htmlFor='lyhenne'>Lyhenne</InputLabel>
                <TextField name='lyhenne' value={kategoria.lyhenne} onChange={(e) => muuta(e)} label='Lyhenne' focused/>
            </FormControl>
            <FormControl sx={{marginBottom:2}} focused>
                <InputLabel htmlFor='kuva'>Kuvan URL</InputLabel>
                <TextField name='kuva' value={kategoria.kuva} onChange={(e) => muuta(e)} label='Kuvan URL' focused/>
            </FormControl>
            </FormGroup>
            <Button variant='outlined' aria-label='Lisää kategoria' onClick={lisaaKategoria}>Lisää kategoria</Button>
            <Alert severity='success'>{viesti}</Alert>
        </Box>
    )
}