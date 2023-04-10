//creer un serveur app a partir de framework express
const express=require("express")
const app = express()
//afin de pouvoir analyser les requete de body sous forme de json on 
//utilise le module body-parser
const bodyParser=require('body-parser')
app.use(bodyParser.json());
//pour pouvoir interagir avec les applications clients(Reactjs)
//on utilise le module cors
const cors = require('cors');
app.use(cors());
const oracledb = require('oracledb');


app.post('/login', async (req, res) => {
    // EXTRAIRE username et password a partir requeste body 
    const { username, password } = req.body;
    let result;
     //si username est c##Admin et password admin coonecter au base donnae oracle avec user c##Admin
    if (username === 'c##Admin' && password === 'Admin') {
      const connection = await oracledb.getConnection({
        user: username,
        password: password,
        connectString: 'localhost:1521/orclpdb'
       
      });
      await connection.close();
      // si la connexion est etabli envoi un response json suivante
      res.send({"Admin":"True"});
      //sinon si username est Etudiant et password admin coonecter au base donnae oracle avec user Etudiant
    } else if (username === 'Etudiant' && password === 'Etudiant') {
      const connection = await oracledb.getConnection({
        user: username,
        password: password,
        connectString: 'localhost:1521/orclpdb'
      });
      // si la connexion est etabli envoi un response json suivante
      res.send({"Etudiant":"True"});
  
      await connection.close();
    } else {
      //si il ya un erreur on va  envoyer la response json suivante
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
  
  });
  app.post("/Reservation", (req, res) => {
    //extraire les infos de reservation et les stocker dans reservationDetails
    const reservationDetails = req.body;
    // connecter au dabase par user Etudiant 
    oracledb.getConnection({
      user: 'Etudiant',
      password: 'Etudiant',
      connectString: 'localhost:1521/orclpdb'
    })
    .then(async (conn) => {
      // inserer les infos de reservation sur la table reservation 
      const sql = `INSERT INTO RESERVATIONS (ID_RESERVATION,MATRICULE, DATE_RESERVATION, HEURE_DEBUT, NOM, PRENOM)
      VALUES (reservation_sequence.NEXTVAL, :MATRICULE,  TO_DATE(:DATE_DE, 'DD-MM-YYYY'), TO_DATE(:HEURE_DEBUT, 'HH24:MI'), :NOM, :PRENOM)`;

      const reservationDetails = req.body;
       const params = {
       MATRICULE: reservationDetails.MATRICULE,
       DATE_DE: reservationDetails.DATE,
      HEURE_DEBUT: reservationDetails.HEURE,
       NOM: reservationDetails.NOM,
      PRENOM: reservationDetails.PRENOM,
       };



      try {
        await conn.execute(sql, params, { autoCommit: true });
      } catch (err) {
        console.error(err);
       //s'il y a une errur afficher un message json suivant
        res.send({"error":"True"});
        res.status(500).send("Error adding reservation");
        return;
      }
      //si la reservation est inseret envoi le message json suivant
      res.send({"ok":"True"});
      res.send("Reservation added successfully");
      
     
      return;
    })
   
});
app.get('/Admin', function (req, res) {
  //connecter au databse par user c##Admin
  oracledb.getConnection(
    {
      user: 'C##Admin',
      password: 'Admin',
      connectString: 'localhost:1521/orclpdb'
    },
    function (err, connection) {
      if (err) {
        console.error(err.message);
        return;
      }
      //executer commande sql afin de selectionner contenu de table RESERVATIONS
      connection.execute(
        `SELECT * FROM RESERVATIONS`,
        function (err, result) {
          if (err) {
            console.error(err.message);
            doRelease(connection);
            return;
          }
          //ENVOYER RESULTAT DE SELECTION SOUS FORMAT JSON 
          res.json(result.rows);
          doRelease(connection);
        });
    });

  function doRelease(connection) {
    connection.close(
      function (err) {
        if (err) {
          console.error(err.message);
        }
      });
  }
});
app.delete("/:id_reservation", (req, res) => {
  //a partir de params de requete extraire id de reservation 
  const id = req.params.id_reservation;
  //coonecter au base de donnepar utilisateur c##Admin
  oracledb.getConnection({
    user: 'C##Admin',
    password: 'Admin',
    connectString: 'localhost:1521/orclpdb'
  }, (err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Failed to connect to database" });
      return;
    }
    //execute la requete sql pour supprimer la reservation 
    connection.execute(
      `DELETE FROM reservations WHERE ID_RESERVATION = :id`,
      [id],
      { autoCommit: true },
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send({ error: "Failed to delete reservation" });
        } else {
        // si la reservation est supprime envoiyer le message json suivant 
          res.send({ message: "Reservation deleted successfully" });
        }
        connection.close();
      }
    );
  });
});





  
  
  
   






const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});





