import React, {useState, useEffect} from 'react';
import {styled, ThemeProvider} from '@mui/material/styles';
import {Grid, IconButton, Typography, Avatar, Collapse, Divider, createTheme, List, ListItem, Tooltip, Alert} from '@mui/material';
import {Card, CardActions, CardHeader, CardContent, CardMedia} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import CoffeeIcon from '@mui/icons-material/Coffee';
import CookieIcon from '@mui/icons-material/Cookie';
import IcecreamIcon from '@mui/icons-material/Icecream';
import axios from 'axios';

const theme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
              root: {
                maxWidth: 300,
                backgroundColor: '#f9fbe7',
                borderColor: 'rgb(104, 179, 107)',
                }
          },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#dce775',
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    position: 'absolute',
                    width: '100%',
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.15)',
                }
            }
        },
    },
    palette: {
        primary: {main: '#43a047'},
        secondary: {main: '#dce775'},
        error: {main: '#e53935'},
        warning: {main: '#ffa726'},
        info: {main: '#9575cd'},
        success: {main: '#2e7d32'},
        contrast: {main: '#fafafa'},
        text: {primary: 'rgba(0,0,0,0.87)'},
        background: {default: '#e8f5e9'}
      },
    typography: {
        cardtext: {
            fontFamily: "'Satisfy','cursive'",
            fontSize: 25,
          },
        cardinfo: {
            fontSize: 15,
            color: '#757575',
        },
    },
});

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function Etusivu() {
    const [expanded, setExpand] = useState(false);
    //const [kategoriat, setKategoriat] = useState([]);
    const [aineslista, setAineslista] = useState([]);
    const [lista, setLista] = useState([]);
    const [viesti, setViesti] = useState('');
  //const [virhe, setVirhe] = useState('Haetaan');
    const [ainekset, setAinekset] = useState([]);
    //const [hakusana, setHakusana] = useState("");
    //const [tulos, setTulos] = useState([]);
    let catButton;

    const handleExpand = () => {setExpand(!expanded);};

  /*useEffect(() => {
    fetch("/resepti/all")
      .then((res) => res.json())
      .then((data) => setData(data.results));
  }, []);*/

  useEffect( () => {
  const haeReseptit = async () => {
    try {
      const response = await axios.get('http://localhost:8080/resepti/all');
      setLista(response.data);
      //setVirhe('');
    } catch (error) {
      setLista([]);
      //setVirhe('Tietojen haku ei onnistunut');
    }
  }
  haeReseptit();
   }, [])

   useEffect( () => {
    const haeAinekset = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/aines/all`);
            setAinekset(response.data);
            //setVirhe('');
          } catch (error) {
            setAinekset([]);
            //setVirhe('Tietojen haku ei onnistunut');
          }
    }
    haeAinekset();
    }, [])

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

    const handleDelete = async (id) => {
        try {
            await axios.get('http://localhost:8080/resepti/delete/' + id)
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
                </ListItem>
                );
            } else {
                return (
                    <div key={rivi.riviid}></div>
                )
            }
        })}
        </List>
        );
    })

    const chooseIcon = ((katid) => {
        if (katid===1) {
            catButton = <Tooltip title='Aamiainen' placement='right'><CoffeeIcon fontSize='large' sx={{color: '#9C6550'}}/></Tooltip>;
        } else if (katid===2) {
            catButton = <Tooltip title='P????ruoka' placement='right'><DinnerDiningIcon fontSize='large' sx={{color: '#673AB7'}}/></Tooltip>;
        } else if (katid===3) {
            catButton = <Tooltip title='Makea leivonta' placement='right'><CookieIcon fontSize='large' sx={{color: '#8D6E63'}}/></Tooltip>;
        } else if (katid===4) {
            catButton = <Tooltip title='Suolainen leivonta' placement='right'><BakeryDiningIcon fontSize='large' sx={{color: '#F57C00'}}/></Tooltip>;
        } else if (katid===5) {
            catButton = <Tooltip title='Juhlat ja pyh??t' placement='right'><BrunchDiningIcon fontSize='large' sx={{color: '#FDD835'}}/></Tooltip>;
        } else if (katid===6) {
            catButton = <Tooltip title='J??lkiruoka' placement='right'><IcecreamIcon fontSize='large' sx={{color: '#F48FB1'}}/></Tooltip>;
        } else {
            catButton = <Tooltip title='Muu' placement='right'><CategoryIcon fontSize='large' sx={{color: '#009688'}}/></Tooltip>;
        }
        return (
            <div>
                {catButton}
            </div>
        );
    })

    /*const teeHakusana = (e) => {
        let muokattu = e.target.value.toLowerCase();
        setHakusana(muokattu);
    }

    const teeHaku = (hakusana) => {
        setTulos([]);
        for(let i=0; i<lista.length; i++) {
            if(lista[i].otsikko.contains(hakusana)) {
                tulos.push(lista[i].id);
            } else if (lista[i].ohje.contains(hakusana)) {
                tulos.push(lista[i].id);
            }
        }
    }*/
/*<TextField id="hakusana" onChange={(e) => teeHakusana(e)} variant="outlined"/>
        <Button onClick={teeHaku(hakusana)}></Button>*/
    return (
        <ThemeProvider theme={theme}>
        <Grid container spacing={4} sx={{margin:1}}>
            {lista.map(ohje => {
                    return (
                        <Grid item key={ohje.id}>
                            <Card>
                                <div style={{position: 'relative'}}>
                                <CardHeader
                                    avatar={<Avatar>{ohje.otsikko.substring(0,1)}</Avatar>}
                                    title={<Typography variant='h5'>{ohje.otsikko}</Typography>}/>
                                <CardMedia component='img' height='200' image={ohje.kuva}/>
                                </div>
                                <CardContent>
                                    <Grid container direction='row' alignItems='center' justifyContent='space-evenly'>
                                        <Grid item><Typography variant='cardinfo'><AccessTimeIcon fontSize='small' color='disabled' sx={{marginRight: 1}}/>{ohje.aika}</Typography></Grid>
                                        <Grid item><Typography variant='cardinfo'>{ohje.maara}</Typography></Grid>
                                        <Grid item>{chooseIcon(ohje.katid)}</Grid>
                                    </Grid>
                                    <Divider sx={{margin:2}}/>
                                    <Typography variant='cardtext' display='flex' justifyContent={'center'}>{ohje.kuvaus}</Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label='muokkaus' to={'/muokkaus/' + ohje.id} component={Link}><CreateIcon/></IconButton>
                                    <IconButton aria-label='poista' onClick={() => handleDelete(ohje.id)}><DeleteIcon/></IconButton>
                                    <ExpandMore expand={expanded} onClick={handleExpand} aria-expanded={expanded} aria-label='show more'>
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardActions>
                                <Collapse in={expanded} timeout='auto' unmountOnExit>
                                    <CardContent>
                                    <Divider textAlign='right' sx={{margin:2}}>Resepti</Divider>
                                        <Typography paragraph variant='cardtext'>Ainekset</Typography>
                                        <div>{makeList(ohje.id, aineslista)}</div>
                                        <Typography paragraph variant='cardtext'>Ohje</Typography>
                                        <Typography paragraph variant='body2'>{ohje.ohje}</Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                )
            })
        }
        <Alert severity='success'>{viesti}</Alert>
        </Grid>
        </ThemeProvider>
    );
}