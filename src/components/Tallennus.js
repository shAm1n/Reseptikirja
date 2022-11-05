import React, {useState, useEffect} from 'react';
import {Box, Grid, FormControl, InputLabel, FormGroup, Select, MenuItem, Button, TextField, Alert} from '@mui/material';
import { Link } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import axios from 'axios';

export default function Tallennus () {
    //const [kategoriat, setKategoriat] = useState([]);
    const [ainekset, setAinekset] = useState([]);
    const [kaytettyID, setKaytettyID] = useState('');
    const [viesti, setViesti] = useState('');
    const [resepti, setResepti] = useState({
        otsikko: '',
        aika: '',
        maara: '',
        kuvaus: '',
        ohje: '',
        kuva: '',
        katid: '',
    })
    const [ainesrivi, setAinesrivi] = useState({
        maara: '',
        id: '',
        ainesid: '',
    })

    /*useEffect( () => {
    const haeKategoriat = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/kategoria/all`);
            setKategoriat(response.data);
        } catch (error) {
            setKategoriat([]);
        }
    }
    haeKategoriat();
    }, [])*/

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

    useEffect( () => {
        const haeID = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/id/one`);
                setKaytettyID(response.data);
            } catch (error) {
                setKaytettyID('');
            }
        }
        haeID();
        }, [])
    
    const uusiID = Number(Object.values(kaytettyID)) + 1;
    console.log(uusiID)
    
    const muuta = (e) => {
        setResepti ({
                ...resepti,
                [e.target.name]: e.target.value,
            })
    }

    const muutaAines = (e) => {
        setAinesrivi({
            ...ainesrivi,
            [e.target.name]: e.target.value,
            id: uusiID,
        })
    }

    const lisaaOhje = async () => {
        //e.preventDefault();
        const formData = {
            otsikko: resepti.otsikko,
            aika: resepti.aika,
            maara: resepti.maara,
            kuvaus: resepti.kuvaus,
            ohje: resepti.ohje,
            kuva: resepti.kuva,
            katid: resepti.katid
        }
        try {
            await axios.post(`http://localhost:8080/resepti/add`, formData);
            setResepti(
            {
                otsikko: '',
                aika: '',
                maara: '',
                kuvaus: '',
                ohje: '',
                kuva: '',
                katid: '',
            });
            setViesti('Lisääminen onnistui!');
        } catch (error) {
            setResepti(
            {
                otsikko: '',
                aika: '',
                maara: '',
                kuvaus: '',
                ohje: '',
                kuva: '',
                katid: '',
            });
            setViesti('Lisäys ei onnistunut');
        }
    }

    const lisaaAines = async (e) => {
        const formData = {
            maara: ainesrivi.maara,
            id: uusiID,
            ainesid: ainesrivi.ainesid
        }
        try {
            await axios.post(`http://localhost:8080/ainesrivi/add`, formData);
            setAinesrivi({
                maara: '',
                id: '',
                ainesid: '',
        });
        setViesti('Lisääminen onnistui!');
        } catch (error) {
            setAinesrivi({
                maara: '',
                id: '',
                ainesid: '',
            })
        setViesti('Lisäys ei onnistunut');
        }
    }

    return (
    <Box component='form' noValidate autoComplete='off' sx={{margin:2}}>
        <FormGroup sx={{width: 400}}>
            <FormControl sx={{marginBottom:2}} focused>
                <InputLabel htmlFor='otsikko'>Otsikko</InputLabel>
                <TextField name='otsikko' type='text' value={resepti.otsikko} onChange={(e) => muuta(e)} label='Otsikko' focused/>
            </FormControl>
            <FormControl sx={{marginBottom:2}} focused>
                <InputLabel htmlFor='aika'>Tekoaika</InputLabel>
                <TextField name='aika' type='text' value={resepti.aika} onChange={(e) => muuta(e)} label='Tekoaika' focused/>
            </FormControl>
            <FormControl sx={{marginBottom:2}} focused>
                <InputLabel htmlFor='maara'>Määrä</InputLabel>
                <TextField name='maara' type='text' value={resepti.maara} onChange={(e) => muuta(e)} label='Määrä' focused/>
            </FormControl>
            <FormControl sx={{marginBottom:2}} focused>
                <InputLabel htmlFor='kategoria'>Kategoria</InputLabel>
                <Select name='katid' value={resepti.katid} onChange={(e) => muuta(e)} label='Kategoria'>
                    <MenuItem value=''></MenuItem>
                    <MenuItem value={3}>Makea leivonta</MenuItem>
                    <MenuItem value={4}>Suolainen leivonta</MenuItem>
                    <MenuItem value={2}>Pääruoka</MenuItem>
                    <MenuItem value={6}>Jälkiruoka</MenuItem>
                    <MenuItem value={1}>Aamiainen</MenuItem>
                    <MenuItem value={5}>Juhlat ja pyhät</MenuItem>
                    <MenuItem value={null}>Muu</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{marginBottom:2}} focused>
                <InputLabel htmlFor='kuvaus'>Kuvaus</InputLabel>
                <TextField name='kuvaus' type='text' value={resepti.kuvaus} onChange={(e) => muuta(e)} label='Kuvaus' focused/>
            </FormControl>
            <Grid container direction='row' spacing={2}>
                <Grid item xs={4}>
                    <FormControl sx={{marginBottom:2}} focused>
                    <InputLabel htmlFor='maara'>Aineksen määrä</InputLabel>
                    <TextField name='maara' type='text' value={ainesrivi.maara} onChange={(e) => muutaAines(e)} label='Aineksen määrä' focused/>
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
                    <Button variant='outlined' onClick={(e) => lisaaAines(e)}>Lisää aines</Button>
                </FormControl>
                </Grid>
            </Grid>
            <FormControl sx={{marginBottom:2}} focused>
                <InputLabel htmlFor='ohje'>Ohje</InputLabel>
                <TextField name='ohje' type='text' value={resepti.ohje} onChange={(e) => muuta(e)} label='Ohje' focused/>
            </FormControl>
            <FormControl sx={{marginBottom:2}} focused>
                <InputLabel htmlFor='kuva'>Anna kuvan URL</InputLabel>
                <TextField name='kuva' type='text' value={resepti.kuva} onChange={(e) => muuta(e)} label='Anna kuvan URL' focused/>
            </FormControl>
        </FormGroup>
        <Grid container spacing={2}>
            <Grid item>
                <Button variant='outlined' onClick={(e) => lisaaOhje(e)}>Valmis!</Button>
            </Grid>
            <Grid item>
                <Button variant='outlined' alignitems="stretch" aria-label='Reseptikirjaan' style={{ display: "flex"}} to='/etsi' component={Link}><AutoStoriesIcon/></Button>
            </Grid>
        </Grid>
        <Alert severity='success'>{viesti}</Alert>
    </Box>
    );
}