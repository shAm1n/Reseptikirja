import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigaatio from './components/Navigaatio';
import Etusivu from './components/Etusivu';
import Etsi from './components/Etsi';
import Tallennus from './components/Tallennus';
import Naytto from './components/Naytto';
import Muokkaus from './components/Muokkaus';
import Ainesmuokkaus from './components/Ainesmuokkaus';
import Kategoriat from './components/Kategoriat';
import Ainekset from './components/Ainekset';

const theme = createTheme({
  palette: {
    primary: {main: '#43a047'},
    secondary: {main: '#dce775'},
    error: {main: '#e53935'},
    warning: {main: '#ffa726'},
    info: {main: '#9575cd'},
    success: {main: '#2e7d32'},
    text: {primary: 'rgba(0,0,0,0.87)', contrastText: '#fafafa'},
    background: {default: '#e8f5e9'}
  },
  typography: {
    body2: {
      fontFamily: "'Poppins','cursive'"
    },
    head: {
      fontFamily: "'Satisfy','cursive'",
      fontSize: 25,
    }
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#dce775',
        },
      },
    },
  },
});

/*const ohjeet = [
  {
  id: 1, paiva: '23.03.2022', aika: '1 h', maara: '45 kpl', kuvaus: 'Parhaita herkkukeksejä!', otsikko: 'Geisha-keksit', kategoria: 'makea',
  aineslista: ['115g voi', '1 dl sokeri', '1 dl fariinisokeri', '1 kpl kananmuna', '2 tl vaniljasokeri', '2½ dl vehnäjauho', '½ tl ruokasooda', '½ tl suola', '120g Geisha-suklaa', '½ dl hasselpähkinärouhe', '*voit korvata Geishan esim. Fazerinalla'],
  ohje: 'Vaahdota voi ja sokerit. Lisää vatkaten. Lisää kuivat aineet sekä lopuksi rouhittu suklaa ja pähkinärouhe. Laita kylmään ½ h ja pyörittele palloiksi. Paista 190C 9min ja jäähdytä ritilällä.',
  kuva: 'https://images.unsplash.com/photo-1557089706-68d02dbda277?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80'
  },
  {
  id: 2, paiva: '26.03.2022', aika: '½ h', maara: '8 kpl', kuvaus: 'Superhelpot sämpylät.', otsikko: 'Namasten sämpylät', kategoria: 'suola',
  aineslista: ['7½ dl vesi', '25g hiiva', '1 rkl suola', '1 rkl vaalea siirappi', '1½ dl ruisjauho', '2 dl grahamjauho', '8 dl vehnäjauho', '*graham- ja vehnäjauhon voi korvata hiivaleipäjauholla'],
  ohje: 'Sekoita ainekset nopeasti yhteen. Laita leivinpaperilla ja liinalla peitettynä yöksi jääkaappiin. Nostele taikinasta kasoja pellille.Voit ripotella pinnalle siemeniä. Huiskauta pinnalle vähän jauhoja. Paista 220C 30min. Jäähdytä ritilällä. Taikina säilyy jääkaapissa monta päivää!',
  kuva: 'https://images.unsplash.com/photo-1513156110471-8c6ff38c42c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
  id: 3, paiva: '26.03.2022', aika: '½ h', maara: '8 hlo', kuvaus: 'Ihanan lempeä kanakeitto.', otsikko: 'Broileri-nuudelikeitto', kategoria: 'paa',
  aineslista: ['3 rkl rasvaa', '450g marinoitu broilerinsuikale', '750g kasvissuikale', '18 dl vesi', '2 kpl kanamaggi', '1 kpl kasvismaggi', '150g nuudeli', '250g Koskenlaskija tuorejuusto', 'suola, pippuri'],
  ohje: 'Paista broilerinsuikaleet rasvassa kattilassa. Lisää kasvissuikaleet ja anna kypsyä hetken. Lisää vesi ja maggit, keitä 5min. Lisää nuudelit murennettuna. Lisää sulatejuusto nokareina ja keitä 5min.',
  kuva: 'https://images.unsplash.com/photo-1607528926952-d4f83df2683c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=854&q=80'
  },
  {
    id: 4, paiva: '26.03.2022', aika: '1½ h', maara: '6 hlo', kuvaus: 'Herkullisin jätski!', otsikko: 'Vaniljajäätelö', kategoria: 'jalki',
    aineslista: ['3 dl kuohukerma', '3 dl täysmaito', '1 kpl vaniljatanko', '5 kpl keltuainen', '1½ dl sokeri'],
    ohje: 'Vaahdota keltuainen ja sokeri. Kiehauta kerma ja maito vaniljatangon kanssa. Kaada kermamaito keltuaisvaahtoon koko ajan vatkaten. Kaada seos takaisin kattilaan ja kuumenna sekoittaen 85 asteeseen. Nosta levyltä. Jäähdytä ja laita yön yli kylmään. Jäädytä jäätelökoneessa, siirrä rasiaan ja laita pakkaseen.',
    kuva: 'https://images.unsplash.com/photo-1579954115563-e72bf1381629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: 5, paiva: '26.03.2022', aika: '1 h', maara: '6 hlo', kuvaus: 'Lasten lemppari!', otsikko: 'Riisipuuro', kategoria: 'aamu',
    aineslista: ['3 dl vesi', '3 dl puuroriisi', '1 rkl sokeri', '1½ l maito', '1 tl suola'],
    ohje: 'Kiehauta vesi, lisää riisi ja keitä, kunnes vesi on imeytynyt. Lisää maito ja keitä välillä sekoitellen noin 45 min.',
    kuva: 'https://images.unsplash.com/photo-1590055619273-44b5b6ce52e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: 6, paiva: '26.03.2022', aika: '2 h', maara: '45 kpl', kuvaus: 'Parasta tarjottavaa synttäreille.', otsikko: 'Jauhelijapasteijat', kategoria: 'juhla',
    aineslista: ['500g maitorahka', '500g voisula', '8 dl vehnäjauho', '2 tl leivinjauhe', '500g jauheliha', '2 sipuli', 'suola, pippuri', '2 kpl kasvismaggi', '300g ranskankerma', '2 kpl keitetty kananmuna', '1 dl persilja'],
    ohje: 'Sekoita rahka, voi, jauho ja leivinjauhe nopeasti yhteen. Kääri kelmuun ja muotoile levyksi. Laita yön yli kylmään. Paista jauheliha ja sipulit, mausta. Lisää maggit ja ranskankerma, kiehauta ja jäähdytä. Hienonna muna ja persilja joukkoon. Kauli taikina 3mm paksuiseksi ja ota siitä muotilla ympyröitä. Jaa täyte paloille, sivele reunat vedellä ja taita puolikuun muotoon. Ummista reunat haarukalla painellen. Voitele munalla ja pistele haarukalla. Paista 250C 10-12min.',
    kuva: 'https://images.unsplash.com/photo-1624128082311-1c0967f42636?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: 7, paiva: '', aika: '', maara: '', kuvaus: '', otsikko: '', kategoria: '',
    aineslista: [''],
    ohje: '',
    kuva: ''
  },
]*/

export default function App() {

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
        <Navigaatio />
          <Routes>
            <Route path='/' exact element={<Etusivu/>} />
            <Route path='etsi' element={<Etsi/>} />
            <Route path='nayta/:katid' element={<Naytto/>} />
            <Route path='muokkaus/:id' element={<Muokkaus/>} />
            <Route path='ainesmuokkaus/:id' element={<Ainesmuokkaus/>} />
            <Route path='kategoriat' element={<Kategoriat/>} />
            <Route path='ainekset' element={<Ainekset/>} />
            <Route path='tallennus' element={<Tallennus/>} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
};