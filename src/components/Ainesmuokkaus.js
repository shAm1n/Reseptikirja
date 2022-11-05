import React, {useState, useEffect} from 'react';
import {Box, Grid, FormControl, InputLabel, Select, MenuItem, Button, TextField, Alert} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Ainesmuokkaus () {
    let { id } = useParams();
    const [ainekset, setAinekset] = useState([]);
    const [viesti, setViesti] = useState('');
    const [aineslista, setAineslista] = useState([]);
    const [ainesrivi, setAinesrivi] = useState(
        {
            riviid: '',
            maara: '',
            id: id,
            ainesid: '',
        }
    )

    useEffect( () => {
        const haeAinesrivit = async () => {
            try {
                const response = await axios.get('http://localhost:8080/ainesrivi/' + id);
                setAineslista(response.data);
            }   catch (error) {
                setAineslista([]);
            }
        }
        haeAinesrivit();
       }, [id])

    useEffect( () => {
        const haeAinekset = async () => {
            try {
                const response = await axios.get('http://localhost:8080/aines/all');
                setAinekset(response.data);
            }   catch (error) {
                setAinekset([]);
            }
        }
        haeAinekset();
       }, [])
    
    const muutaAines = (e) => {
        setAinesrivi({
            ...ainesrivi,
            [e.target.name]: e.target.value,
        })
    }

    const muutaMaara = (e) => {
        setAinesrivi({
            ...ainesrivi,
            [e.target.name]: e.target.value,
        })
    }

    const lisaaAines = async (e, riviid, id) => {
        const formData = {
            riviid: riviid,
            maara: ainesrivi.maara,
            id: id,
            ainesid: ainesrivi.ainesid
        }
        try {
            await axios.post(`http://localhost:8080/ainesrivi/edit/` +riviid, formData);
            setAinesrivi(
                {
                    riviid: '',
                    maara: '',
                    id: id,
                    ainesid: '',
                }
        );
        setViesti('Lisääminen onnistui!');
        } catch (error) {
            setAinesrivi(
                {
                    riviid: '',
                    maara: '',
                    id: id,
                    ainesid: '',
                }
            )
        setViesti('Lisäys ei onnistunut');
        }
    }

    return (
        <Box component='form' noValidate autoComplete='off' sx={{margin:2}}>
            {aineslista.map(rivi => {
            return (
            <Grid container direction='row' spacing={2} key={rivi.riviid}>
                <Grid item xs={4}>
                    <FormControl sx={{marginBottom:2}} focused>
                    <InputLabel htmlFor='maara'>Aineksen määrä</InputLabel>
                    <TextField name='maara' value={ainesrivi.maara} onChange={(e) => muutaMaara(e)} label='Aineksen määrä' focused/>
                </FormControl>
                </Grid>
                <Grid item xs={8}>
                <FormControl sx={{marginBottom:2}} focused>
                    <InputLabel htmlFor='ainesid'>Aines</InputLabel>
                    <Select name='ainesid' value={ainesrivi.ainesid} onChange={(e) => muutaAines(e)} label='Aines'>
                        {ainekset.map((aines) =>
                            <MenuItem key={aines.ainesid} value={aines.ainesid}>{aines.aines}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                </Grid>
                <Button variant='outlined' onClick={(e) => lisaaAines(e, rivi.riviid, id)}>Lisää aines</Button>
            </Grid>
            );
        })}
        <Alert severity='success'>{viesti}</Alert>
    </Box>
    );
}