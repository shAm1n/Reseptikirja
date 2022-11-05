import React, {useState, useEffect} from 'react';
import {Box, Grid, FormControl, InputLabel, FormGroup, Select, MenuItem, Button, TextField, Alert} from '@mui/material';
import { List, ListItem, Typography, IconButton } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function Muokkaus () {
    let { id } = useParams();
    const [aineslista, setAineslista] = useState([]);
    const [ainekset, setAinekset] = useState([]);
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

    useEffect( () => {
        const haeResepti = async () => {
          try {
            const response = await axios.get('http://localhost:8080/resepti/' + id);
            setResepti(response.data);
            //setVirhe('');
          } catch (error) {
            setResepti({});
            //setVirhe('Tietojen haku ei onnistunut');
          }
        }
        haeResepti();
         }, [id])

    const muutaOtsikko = (e) => {
        setResepti ({
                ...resepti,
                [e.target.name]: e.target.value,
            })
    }

    const muutaAika = (e) => {
        setResepti ({
                ...resepti,
                [e.target.name]: e.target.value,
            })
    }

    const muutaMaara = (e) => {
        setResepti ({
                ...resepti,
                [e.target.name]: e.target.value,
            })
    }

    const muutaKatid = (e) => {
        setResepti ({
                ...resepti,
                [e.target.name]: e.target.value,
            })
    }

    const muutaKuvaus = (e) => {
        setResepti ({
                ...resepti,
                [e.target.name]: e.target.value,
            })
    }

    const muutaOhje = (e) => {
        setResepti ({
                ...resepti,
                [e.target.name]: e.target.value,
            })
    }

    const muutaKuva = (e) => {
        setResepti ({
                ...resepti,
                [e.target.name]: e.target.value,
            })
    }

    const lisaaOhje = async (e, id) => {
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
            await axios.post(`http://localhost:8080/resepti/edit/` +id, formData);
            setViesti('Muokkaus onnistui!');
        } catch (error) {
            setViesti('Muokkaus ei onnistunut');
        }
    }

    useEffect( () => {
        const haeAinesrivit = async () => {
            try {
                const response = await axios.get('http://localhost:8080/ainesrivi/all');
                setAineslista(response.data);
            }   catch (error) {
                setAineslista([]);
            }
        }
        haeAinesrivit();
       }, [])

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

       const handleDelete = async (riviid) => {
        try {
            await axios.get('http://localhost:8080/ainesrivi/delete/' + riviid)
            setViesti('Poistettiin');
          } catch (error) {
            setViesti('Poisto ei onnistunut');
          }
    }

    const makeList = ((id, aineslista) => {
        return (
        <List>
        {aineslista.map((rivi) => {
            if(rivi.id === id) {
                return (
                <ListItem key={rivi.riviid}>
                    <Typography>{rivi.maara}&ensp;</Typography>
                    {ainekset.map(aine => {
                        if(aine.ainesid === rivi.ainesid) {
                            return(<Typography key={aine.ainesid}>{aine.aines}</Typography>);
                        } else {
                            return(<div key={aine.ainesid}></div>)
                        }
                    })}
                    <IconButton aria-label='ainesrivin poisto' onClick={() => handleDelete(rivi.riviid)}><DeleteIcon/></IconButton>
                </ListItem>
                );
            } else {
                return (
                    <div key={rivi.riviid}></div>
                )}
        })}
        </List>
        );
    })

    return (
        <Grid sx={{margin:2}}>
        <Box component='form' noValidate autoComplete='off'>
            <FormGroup sx={{width: 400}}>
                <FormControl sx={{marginBottom:2}} focused>
                    <InputLabel htmlFor='otsikko'>Otsikko</InputLabel>
                    <TextField name='otsikko' value={resepti.otsikko} onChange={(e) => muutaOtsikko(e)} label='Otsikko' focused/>
                </FormControl>
                <FormControl sx={{marginBottom:2}} focused>
                    <InputLabel htmlFor='aika'>Tekoaika</InputLabel>
                    <TextField name='aika' value={resepti.aika} onChange={(e) => muutaAika(e)} label='Tekoaika' focused/>
                </FormControl>
                <FormControl sx={{marginBottom:2}} focused>
                    <InputLabel htmlFor='maara'>Määrä</InputLabel>
                    <TextField name='maara' value={resepti.maara} onChange={(e) => muutaMaara(e)} label='Määrä' focused/>
                </FormControl>
                <FormControl sx={{marginBottom:2}} focused>
                    <InputLabel htmlFor='kategoria'>Kategoria</InputLabel>
                    <Select name='katid' value={resepti.katid} onChange={(e) => muutaKatid(e)} label='Kategoria'>
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
                    <TextField name='kuvaus' value={resepti.kuvaus} onChange={(e) => muutaKuvaus(e)} label='Kuvaus' focused/>
                </FormControl>
                <FormControl sx={{marginBottom:2}} focused>
                    <InputLabel htmlFor='ohje'>Ohje</InputLabel>
                    <TextField name='ohje' value={resepti.ohje} onChange={(e) => muutaOhje(e)} label='Ohje' focused/>
                </FormControl>
                <FormControl sx={{marginBottom:2}} focused>
                    <InputLabel htmlFor='kuva'>Anna kuvan URL</InputLabel>
                    <TextField name='kuva' value={resepti.kuva} onChange={(e) => muutaKuva(e)} label='Anna kuvan URL' focused/>
                </FormControl>
            </FormGroup>
            <Button variant='outlined' onClick={(e) => lisaaOhje(e, id)}>Valmis!</Button>
        </Box>
        <div>{makeList(id, aineslista)}</div>
        <Button variant='outlined' aria-label='ainesten muokkaus' to={'/ainesmuokkaus/' + id} component={Link}>Ainesten muokkaus</Button><br/>
            <Button variant='outlined' alignitems="stretch" aria-label='Reseptikirjaan' style={{ display: "flex"}} to='/etsi' component={Link}><AutoStoriesIcon/></Button>
            <Alert severity='success'>{viesti}</Alert>
        </Grid>
        );
}