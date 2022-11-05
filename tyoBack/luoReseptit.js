const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('reseptit.db');

db.serialize(() => {
//Taulujen luonti
    let sql = 'CREATE TABLE Kategoriat (katid INTEGER PRIMARY KEY, '+
    'otsikko TEXT NOT NULL, lyhenne TEXT NOT NULL, kuva TEXT)';

    db.run(sql, (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log("Kategoriataulu tehtiin");
    })

    sql = 'CREATE TABLE Ainekset (ainesid integer PRIMARY KEY NOT NULL, '+
    'aines text NOT NULL)';

    db.run(sql, (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log("Ainestaulu tehtiin");
    })

    sql = 'CREATE TABLE Reseptit (id integer PRIMARY KEY NOT NULL, '+
    'otsikko text NOT NULL, aika integer, maara integer, kuvaus text, '+
    'ohje text, kuva text, katid INTEGER, '+
    'FOREIGN KEY(katid) REFERENCES Kategoriat (katid))';

    db.run(sql, (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log("Reseptitaulu tehtiin");
    })

    sql = 'CREATE TABLE Ainesrivit (riviid integer PRIMARY KEY NOT NULL, '+
    'maara text NOT NULL, id INTEGER, ainesid INTEGER, ' +
    'FOREIGN KEY(id) REFERENCES Reseptit (id), ' +
    'FOREIGN KEY(ainesid) REFERENCES Ainekset (ainesid))';

    db.run(sql, (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log("Välitaulu tehtiin");
    })
//Ainesrivien lisäys
    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (1, 'vehnäjauho')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    console.log("Ainesrivi lisättiin");
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (2, 'sokeri')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (3, 'voi')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (4, 'kananmuna')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (5, 'suola')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (6, 'fariinisokeri')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (7, 'vaniljasokeri')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (8, 'ruokasooda')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (9, 'Geisha-suklaa')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (10, 'hasselpähkinärouhe')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (11, 'vesi')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (12, 'hiiva')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (13, 'vaalea siirappi')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (14, 'ruisjauho')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (15, 'grahamjauho')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (16, 'rasva')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (17, 'marinoitu broilerinsuikale')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (18, 'kasvissuikale')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (19, 'kasvismaggi')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (20, 'kanamaggi')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (21, 'nuudeli')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (22, 'Koskenlaskija tuorejuusto')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (23, 'pippuri')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (24, 'keltuainen')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (25, 'vaniljatanko')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (26, 'täysmaito')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (27, 'kuohukerma')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (28, 'puuroriisi')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (29, 'maito')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (30, 'maitorahka')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (31, 'leivinjauhe')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (32, 'jauheliha')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (33, 'sipuli')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (34, 'ranskankerma')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainekset (ainesid, aines) VALUES (35, 'persilja')";
  
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });
//Kategoriarivien lisäys
    sql = "INSERT INTO Kategoriat (katid, otsikko, lyhenne, kuva) VALUES (1, 'Aamiainen', 'aamu', 'https://images.unsplash.com/photo-1627308594190-a057cd4bfac8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80')";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Kategoriat (katid, otsikko, lyhenne, kuva) VALUES (2, 'Pääruoka', 'paa', 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80')";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Kategoriat (katid, otsikko, lyhenne, kuva) VALUES (3, 'Makea leivonta', 'makea', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80')";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Kategoriat (katid, otsikko, lyhenne, kuva) VALUES (4, 'Suolainen leivonta', 'suola', 'https://images.unsplash.com/photo-1563736113551-beda7ee0ebde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80')";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Kategoriat (katid, otsikko, lyhenne, kuva) VALUES (5, 'Juhlat ja pyhät', 'juhla', 'https://images.unsplash.com/photo-1517087209106-3f42cd661afa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80')";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Kategoriat (katid, otsikko, lyhenne, kuva) VALUES (6, 'Jälkiruoka', 'jalki', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80')";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });
//Reseptien lisäys
    sql = "INSERT INTO Reseptit (id, otsikko, aika, maara, kuvaus, ohje, kuva, katid) "+
    " VALUES (1, 'Geisha-keksit', '1 h', '45 kpl', 'Parhaita herkkukeksejä!', " +
    "'Vaahdota voi ja sokerit. Lisää vatkaten. Lisää kuivat aineet sekä lopuksi rouhittu suklaa ja pähkinärouhe. Laita kylmään ½ h ja pyörittele palloiksi. Paista 190C 9min ja jäähdytä ritilällä.\n*voit korvata Geishan esim. Fazerinalla', " +
    "'https://images.unsplash.com/photo-1557089706-68d02dbda277?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80', 3)";
    
    db.run(sql, (err) => {
        if (err) {
        return console.log(err.message);
        }
        console.log("Resepti lisättiin");
    });

    sql = "INSERT INTO Reseptit (id, otsikko, aika, maara, kuvaus, ohje, kuva, katid) "+
    " VALUES (2, 'Namasten sämpylät', '½ h', '8 kpl', 'Superhelpot sämpylät', "+
    "'Sekoita ainekset nopeasti yhteen. Laita leivinpaperilla ja liinalla peitettynä yöksi jääkaappiin. Nostele taikinasta kasoja pellille.Voit ripotella pinnalle siemeniä. Huiskauta pinnalle vähän jauhoja. Paista 220C 30min. Jäähdytä ritilällä. Taikina säilyy jääkaapissa monta päivää!\n*graham- ja vehnäjauhon voi korvata hiivaleipäjauholla', "+
    "'https://images.unsplash.com/photo-1513156110471-8c6ff38c42c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', 4)";
    
    db.run(sql, (err) => {
        if (err) {
        return console.log(err.message);
        }
        console.log("Resepti lisättiin");
    });

    sql = "INSERT INTO Reseptit (id, otsikko, aika, maara, kuvaus, ohje, kuva, katid) "+
    " VALUES (3, 'Broileri-nuudelikeitto', '½ h', '8 hlö', 'Ihanan lempeä kanakeitto.', "+
    "'Paista broilerinsuikaleet rasvassa kattilassa. Lisää kasvissuikaleet ja anna kypsyä hetken. Lisää vesi ja maggit, keitä 5min. Lisää nuudelit murennettuna. Lisää sulatejuusto nokareina ja keitä 5min.', "+
    "'https://images.unsplash.com/photo-1607528926952-d4f83df2683c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=854&q=80', 2)";
    
    db.run(sql, (err) => {
        if (err) {
        return console.log(err.message);
        }
        console.log("Resepti lisättiin");
    });

    sql = "INSERT INTO Reseptit (id, otsikko, aika, maara, kuvaus, ohje, kuva, katid) "+
    " VALUES (4, 'Vaniljajäätelö', '1½ h', '6 hlö', 'Herkullisin jätski!', "+
    "'Vaahdota keltuainen ja sokeri. Kiehauta kerma ja maito vaniljatangon kanssa. Kaada kermamaito keltuaisvaahtoon koko ajan vatkaten. Kaada seos takaisin kattilaan ja kuumenna sekoittaen 85 asteeseen. Nosta levyltä. Jäähdytä ja laita yön yli kylmään. Jäädytä jäätelökoneessa, siirrä rasiaan ja laita pakkaseen.', "+
    "'https://images.unsplash.com/photo-1579954115563-e72bf1381629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', 6)";
    
    db.run(sql, (err) => {
        if (err) {
        return console.log(err.message);
        }
        console.log("Resepti lisättiin");
    });

    sql = "INSERT INTO Reseptit (id, otsikko, aika, maara, kuvaus, ohje, kuva, katid) "+
    " VALUES (5, 'Riisipuuro', '1 h', '6 hlö', 'Lasten lemppari!', "+
    "'Kiehauta vesi, lisää riisi ja keitä, kunnes vesi on imeytynyt. Lisää maito ja keitä välillä sekoitellen noin 45 min.', "+
    "'https://images.unsplash.com/photo-1590055619273-44b5b6ce52e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', 1)";
    
    db.run(sql, (err) => {
        if (err) {
        return console.log(err.message);
        }
        console.log("Resepti lisättiin");
    });

    sql = "INSERT INTO Reseptit (id, otsikko, aika, maara, kuvaus, ohje, kuva, katid) "+
    " VALUES (6, 'Jauhelijapasteijat', '2 h', '45 kpl', 'Parasta tarjottavaa synttäreille.', "+
    "'Sekoita rahka, voi, jauho ja leivinjauhe nopeasti yhteen. Kääri kelmuun ja muotoile levyksi. Laita yön yli kylmään. Paista jauheliha ja sipulit, mausta. Lisää maggit ja ranskankerma, kiehauta ja jäähdytä. Hienonna muna ja persilja joukkoon. Kauli taikina 3mm paksuiseksi ja ota siitä muotilla ympyröitä. Jaa täyte paloille, sivele reunat vedellä ja taita puolikuun muotoon. Ummista reunat haarukalla painellen. Voitele munalla ja pistele haarukalla. Paista 250C 10-12min.', "+
    "'https://images.unsplash.com/photo-1624128082311-1c0967f42636?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', 5)";
    
    db.run(sql, (err) => {
        if (err) {
        return console.log(err.message);
        }
        console.log("Resepti lisättiin");
    });
//Geishakeksien ainesten lisäys reseptiin
    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (1, '115g', 1, 3)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (2, '1 dl', 1, 2)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (3, '1 dl', 1, 6)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (4, '1 kpl', 1, 4)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (5, '2 tl', 1, 7)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (6, '2½ dl', 1, 1)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (7, '½ tl', 1, 8)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (8, '½ tl', 1, 5)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (9, '120g', 1, 9)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (10, '½ dl', 1, 10)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });
//Namasten sämpylät ainesten lisäys reseptiin
    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (11, '7½ dl', 2, 11)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (12, '25g', 2, 12)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (13, '1 rkl', 2, 5)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (14, '1 rkl', 2, 13)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (15, '1½ dl', 2, 14)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (16, '2 dl', 2, 15)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (17, '8 dl', 2, 1)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });
//Broileri-nuudelikeitto ainesten lisäys reseptiin
    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (18, '3 rkl', 3, 16)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (19, '450g', 3, 17)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (20, '750g', 3, 18)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (21, '18 dl', 3, 11)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (22, '2 kpl', 3, 20)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (23, '1 kpl', 3, 19)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (24, '150g', 3, 21)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (25, '250g', 3, 22)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (26, 'ripaus', 3, 5)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (27, 'ripaus', 3, 23)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });
//Vaniljajäätelö ainesten lisäys reseptiin
    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (28, '3 dl', 4, 27)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (29, '3 dl', 4, 26)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (30, '1 kpl', 4, 25)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (31, '5 kpl', 4, 24)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (32, '1½ dl', 4, 2)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });
//Riisipuuro ainesten lisäys reseptiin
    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (33, '3 dl', 5, 11)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (34, '3 dl', 5, 28)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (35, '1 rkl', 5, 2)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (36, '1½ l', 5, 29)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (37, '1 tl', 5, 5)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });
//Jauhelihapasteijat ainesten lisäys reseptiin
    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (38, '500g', 6, 30)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (39, '500g', 6, 3)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (40, '8 dl', 6, 1)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (41, '2 tl', 6, 31)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (42, '500g', 6, 32)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (43, '2 kpl', 6, 33)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (44, 'ripaus', 6, 5)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (45, 'ripaus', 6, 23)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (46, '2 kpl', 6, 19)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (47, '300g', 6, 34)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (48, '2 kpl', 6, 4)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    sql = "INSERT INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (49, '1 dl', 6, 35)";

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });

    db.each("SELECT id, otsikko FROM Reseptit", (err, row) => {
        if (err) {
          return console.log(err.message);
        }
        console.log(row.id + ", " + row.otsikko);
    });

db.close();
})
