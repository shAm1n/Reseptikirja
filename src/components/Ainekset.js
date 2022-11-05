import React, {useState, useEffect} from 'react';
import { List, ListItem, Typography, Box, Alert } from '@mui/material';
import { FormGroup, FormControl, InputLabel, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function Ainekset() {
    const [ainekset, setAinekset] = useState([]);
    const [aine, setAine] = useState({aines: ''});
    const [viesti, setViesti] = useState('');

    useEffect( () => {
        const haeAinekset = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/aines/all`);
                setAinekset(response.data);
            } catch (error) {
                setAinekset([]);
            }
        }
        haeAinekset();
        }, [])

    const muuta = (e) => {
        setAine({
            [e.target.name]: e.target.value,
        });
    }

    const lisaaAines = async () => {
        const formData = {
            aines: aine.aines,
        }
        try {
            await axios.post(`http://localhost:8080/aines/add`, formData);
            setAine({aines: ''});
        setViesti('Lisääminen onnistui!');
        } catch (error) {
            setAine({aines: ''})
        setViesti('Lisäys ei onnistunut');
        }
    }

    const handleDelete = async (ainesid) => {
        try {
            await axios.get('http://localhost:8080/aines/delete/' + ainesid)
            setViesti('Poistettiin');
          } catch (error) {
            setViesti('Poisto ei onnistunut');
          }
    }

    const makeList = (ainekset) => {
        return (
        <List>
        {ainekset.map(item => {
            return(
                <ListItem key={item.ainesid}>
                    <Typography>{item.aines}&ensp;</Typography>
                    <IconButton aria-label='poista' onClick={() => handleDelete(item.ainesid)}><DeleteIcon/></IconButton>
                </ListItem>
            )
        })}
        </List>
        )
    }

    return (
        <Box sx={{margin:1}}>
            <Typography>Ainekset</Typography>
            <List>
                {makeList(ainekset)}
            </List>
            <FormGroup sx={{width: 400}}>
            <FormControl sx={{marginBottom:2}} focused>
                <InputLabel htmlFor='aines'>Aines</InputLabel>
                <TextField name='aines' value={aine.aines} onChange={(e) => muuta(e)} label='Aines' focused/>
            </FormControl>
            </FormGroup>
            <Button variant='outlined' aria-label='Lisää aines' onClick={lisaaAines}>Lisää aines</Button>
            <Alert severity='success'>{viesti}</Alert>
        </Box>
    )
}