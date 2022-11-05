const express = require('express');
const app = express();

var helmet = require('helmet');
app.use(helmet( { crossOriginResourcePolicy: false } ));
app.use(express.json());
app.use(express.urlencoded({limit: '5mb', extended: true}));

const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('reseptit.db');

app.listen(8080, () => {
    console.log('Node toimii localhost:8080');
});

app.get('/', (req, res, next) => {
    return res.status(200).json({ error: false, message: 'Toimii' })
});

//Kaikkien reseptien haku
app.get('/resepti/all', (req, res, next) => {
	db.all("SELECT * FROM Reseptit", function (error, results) {
    if (error) throw error;
        return res.status(200).json(results);
  });
});

//Kaikkien kategorioiden haku
app.get('/kategoria/all', (req, res, next) => {
	db.all("SELECT * FROM Kategoriat", (error, results) => {
    if (error) throw error;
        return res.status(200).json(results);
  });
});

//Kaikkien ainesten haku
app.get('/aines/all', (req, res, next) => {
	db.all("SELECT * FROM Ainekset", (error, results) => {
    if (error) throw error;
        return res.status(200).json(results);
  });
});

//Kaikkien ainesrivien haku
app.get('/ainesrivi/all', (req, res, next) => {
	db.all("SELECT * FROM Ainesrivit", (error, results) => {
    if (error) throw error;
        return res.status(200).json(results);
  });
});

//Käytetyn id:n haku
app.get('/id/one', (req, res, next) => {
  db.get("SELECT MAX(id) FROM Reseptit", (error, results) => {
    if (error) throw error;
        return res.status(200).json(results);
  })
})

//Tietyn kategorian haku
app.get('/kategoria/:katid', (req, res, next) => {
  let katid = Number(req.params.katid);
	db.get("SELECT * FROM Kategoriat where katid=?", [katid], (error, results) => {
    if (error) throw error;
        return res.status(200).json(results);
  });
});

//Reseptin ainesrivien haku
app.get('/ainesrivi/:id', (req, res, next) => {
  let id = Number(req.params.id);
  db.all('SELECT * FROM Ainesrivit where id=?', [id], (error, result) => {
      if (error) throw error;
        if (typeof(result) == 'undefined')  {
          return res.status(200).json({});
        }
      return res.status(200).json(result);
  });
});

//Reseptin ainesten haku
app.get('/aines/:ainesid', (req, res, next) => {
  let ainesid = Number(req.params.ainesid);
  db.get('SELECT aines FROM Ainekset where ainesid=?', [ainesid], (error, result) => {
      if (error) throw error;
        if (typeof(result) == 'undefined')  {
          return res.status(200).json({});
        }
      return res.status(200).json(result);
  });
});

//Tietyn rivin haku
app.get('/resepti/:id', (req, res, next) => {
    let id = req.params.id;
    db.get('SELECT * FROM Reseptit where id=?', [id], (error, result) => {
        if (error) throw error;

        //Jos haku ei tuottanut yhtään riviä
        if (typeof(result) == 'undefined')  {
          return res.status(200).json({});
        }

        return res.status(200).json(result);
    });
});

//Hakusanan perusteella haku
/*app.get('/resepti/:sana', (req, res, next) => {
  let sana = req.params.sana;
  db.all('SELECT * FROM Reseptit WHERE otsikko LIKE %?1%', [sana], (error, result) => {
      if (error) throw error;
        if (typeof(result) == 'undefined')  {
          return res.status(200).json({});
        }
      return res.status(200).json(result);
  });
});*/

//Kuvan lataaminen palvelimen hakemistoon
const multer = require('multer');
const upload = multer({ dest: './kuvat' })
const storage = multer.diskStorage({
    destination:  (req, file, callback) => {
      callback(null, './kuvat')
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname)
    }
  })
  
  //upload = multer({ storage: storage })

//Kantaan lisääminen
app.post('/resepti/add',  (req, res, next) => {
     let tap = req.body;
 
     db.run('INSERT INTO Reseptit (otsikko, aika, maara, kuvaus, ohje, kuva, katid) VALUES (?, ?, ?, ?, ?, ?, ?)', 
     [tap.otsikko, tap.aika, tap.maara, tap.kuvaus, tap.ohje, tap.kuva, tap.katid], (error, result) => {
         if (error) throw error;
 
         return res.status(200).json( {count: 1} );
     })
 })

 //Reseptin muokkaus
app.post('/resepti/edit/:id',  (req, res, next) => {
  let id = Number(req.params.id);
  let tap = req.body;

  db.run('REPLACE INTO Reseptit (id, otsikko, aika, maara, kuvaus, ohje, kuva, katid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
  [id, tap.otsikko, tap.aika, tap.maara, tap.kuvaus, tap.ohje, tap.kuva, tap.katid], (error, result) => {
        if (error) throw error;

        return res.status(200).json( {count: 1} );
    })
  })

 //Ainesrivin kantaan lisääminen
app.post('/ainesrivi/add', (req, res, next) => {
  let tap = req.body;
  
  db.run('INSERT INTO Ainesrivit (maara, id, ainesid) VALUES (?, ?, ?)', 
  [tap.maara, tap.id, tap.ainesid], (error, result) => {
      if (error) throw error;

      return res.status(200).json( {count: 1} );
  })
})

//Ainesrivin muokkaus
app.post('/ainesrivi/edit/:riviid', (req, res, next) => {
  let riviid = Number(req.params.riviid);
  let tap = req.body;
  
  db.run('REPLACE INTO Ainesrivit (riviid, maara, id, ainesid) VALUES (?, ?, ?, ?)',
  [riviid, tap.maara, tap.id, tap.ainesid], (error, result) => {
      if (error) throw error;

      return res.status(200).json( {count: 1} );
  })
})

//Aineksen kantaan lisääminen
app.post('/aines/add', (req, res, next) => {
  let tap = req.body;
  
  db.run('INSERT INTO Ainekset (aines) VALUES (?)', 
  [tap.aines], (error, result) => {
      if (error) throw error;

      return res.status(200).json( {count: 1} );
  })
})

//Kategorian kantaan lisääminen
app.post('/kategoria/add', (req, res, next) => {
  let tap = req.body;
  
  db.run('INSERT INTO Kategoriat (otsikko, lyhenne, kuva) VALUES (?, ?, ?)', 
  [tap.otsikko, tap.lyhenne, tap.kuva], (error, result) => {
      if (error) throw error;

      return res.status(200).json( {count: 1} );
  })
})
 
 //Kuvan lataaminen kuvakansiosta
 app.get('/download/:nimi', (req, res, next) => {
   let file = './kuvat/' + req.params.nimi;
   res.download(file);
 });
 
 //Reseptin poistaminen
 app.get('/resepti/delete/:id', (req, res, next) => {
     let id = Number(req.params.id);
 
     db.run('DELETE FROM Reseptit WHERE id = ?', [id], function (error, result) {
         if (error) throw error;
            return res.status(200).json( {count: this.changes} );
     });
 });

 //Aineksen poistaminen
 app.get('/aines/delete/:ainesid', (req, res, next) => {
  let ainesid = Number(req.params.ainesid);

  db.run('DELETE FROM Ainekset WHERE ainesid = ?', [ainesid], function (error, result) {
      if (error) throw error;
         return res.status(200).json( {count: this.changes} );
  });
});

//Ainesrivin poistaminen
app.get('/ainesrivi/delete/:riviid', (req, res, next) => {
  let riviid = Number(req.params.riviid);

  db.run('DELETE FROM Ainesrivit WHERE riviid = ?', [riviid], function (error, result) {
      if (error) throw error;
         return res.status(200).json( {count: this.changes} );
  });
});

//Kategorian poistaminen
app.get('/kategoria/delete/:katid', (req, res, next) => {
  let katid = req.params.katid;

  db.run('DELETE FROM Kategoriat WHERE katid = ?', [katid], function (error, result) {
      if (error) throw error;
         return res.status(200).json( {count: this.changes} );
  });
});
 
 app.get('*', (req, res, next) => {
     return res.status(404).send({ error: true, message: 'Ei löydy' })
 });