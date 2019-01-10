const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8080;
const server   = require('http').Server(app);
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

const mongoDBModule = require('./app_modules/crud-mongo');

// Pour les formulaires standards
const bodyParser = require('body-parser');
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

// Cette ligne indique le répertoire qui contient
// les fichiers statiques: html, css, js, images etc.
app.use(express.static(__dirname + '/public'));
// Paramètres standards du modyle bodyParser
// qui sert à récupérer des paramètres reçus
// par ex, par l'envoi d'un formulaire "standard"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    next();
});

// Lance le serveur avec express
server.listen(port);
console.log("Serveur lancé sur le port : " + port);

//------------------
// ROUTES
//------------------
// Utile pour indiquer la home page, dans le cas
// ou il ne s'agit pas de public/index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/MyTableVue', function(req, res) {
    res.sendFile(__dirname + '/public/TableVue.html');
});

// Ici des routes en :
// http GET (pour récupérer des données)
// http POST : pour insérer des données
// http PUT pour modifier des données
// http DELETE pour supprimer des données

//----------------------------------------------
// Ces routes forment l'API de l'application !!
//----------------------------------------------

// Test de la connexion à la base
app.get('/api/connection', function(req, res) {
	// Pour le moment on simule, mais après on devra
	// réellement se connecte à la base de données
	// et renvoyer une valeur pour dire si tout est ok
   mongoDBModule.connexionMongo(function(err, db) {
   	let reponse;

   	if(err) {
   		console.log("erreur connexion");
   		reponse = {
   			msg: "erreur de connexion err=" + err
   		}
   	} else {
   		reponse = {
   			msg: "connexion établie"
   		}
   	}
   	res.send(JSON.stringify(reponse));

   });
});

app.get('/api/restaurants/count', function(req, res) {
    // Pour le moment on simule, mais après on devra
    // réellement se connecte à la base de données
    // et renvoyer une valeur pour dire si tout est ok
    let name = req.query.name || '';

    mongoDBModule.countRestaurants(name, function(data) {
        var objdData = {
            msg:"restaurants count",
            data: data
        }
        res.send(JSON.stringify(objdData));
    });
});

// On va récupérer des restaurants par un GET (standard REST) 
// cette fonction d'API peut accepter des paramètres
// pagesize = nombre de restaurants par page
// page = no de la page
// Oui, on va faire de la pagination, pour afficher
// par exemple les restaurants 10 par 10
app.get('/api/restaurants', function(req, res) { 
	// Si présent on prend la valeur du param, sinon 1
    let page = parseInt(req.query.page || 1);
    // idem si present on prend la valeur, sinon 10
    let pagesize = parseInt(req.query.pagesize || 10);

    let name = req.query.name || '';


 	mongoDBModule.findRestaurants(page, pagesize, name, function(data,count) {
 		var objdData = {
 			msg:"restaurant recherchés avec succès",
 			data: data,
			count:count
 		}
 		res.send(JSON.stringify(objdData)); 
 	}); 
});

// Récupération d'un seul restaurant par son id
app.get('/api/restaurants/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.findRestaurantById(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
 
});

// Creation d'un restaurant par envoi d'un formulaire
// On fera l'insert par un POST, c'est le standard REST
app.post('/api/restaurants', multerData.fields([]), function(req, res) {
	// On supposera qu'on ajoutera un restaurant en 
	// donnant son nom et sa cuisine. On va donc 
	// recuperer les données du formulaire d'envoi
	// les params sont dans req.body même si le formulaire
	// est envoyé en multipart

 	mongoDBModule.createRestaurant(req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Modification d'un restaurant, on fera l'update par
// une requête http PUT, c'est le standard REST
app.put('/api/restaurants/:id', multerData.fields([]), function(req, res) {
	var id = req.params.id;

 	mongoDBModule.updateRestaurant(id, req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Suppression d'un restaurant
// On fera la suppression par une requête http DELETE
// c'est le standard REST
app.delete('/api/restaurants/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.deleteRestaurant(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
})

app.get('/api/starter/count', function(req, res) {
    let name = req.query.name || '';

    mongoDBModule.countstarter(name, function(data) {
        var objdData = {
            msg:"starter count",
            data: data
        }
        res.send(JSON.stringify(objdData));
    });
});

app.get('/api/starter', function(req, res) { 
    let page = parseInt(req.query.page || 1);
    let pagesize = parseInt(req.query.pagesize || 1);

    let name = req.query.name || '';


 	mongoDBModule.findstarter(page, pagesize, name, function(data,count) {
 		var objdData = {
 			msg:"starter recherchés avec succès",
 			data: data,
			count:count
 		}
 		res.send(JSON.stringify(objdData)); 
 	}); 
});

app.get('/api/starter/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.findstarterById(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
 
});

app.post('/api/starter', multerData.fields([]), function(req, res) {

 	mongoDBModule.createstarter(req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

app.put('/api/starter/:id', multerData.fields([]), function(req, res) {
	var id = req.params.id;

 	mongoDBModule.updatestarter(id, req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

app.delete('/api/starter/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.deletestarter(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
})

app.get('/api/main/count', function(req, res) {
    let name = req.query.name || '';

    mongoDBModule.countmain(name, function(data) {
        var objdData = {
            msg:"main count",
            data: data
        }
        res.send(JSON.stringify(objdData));
    });
});

app.get('/api/main', function(req, res) { 
    let page = parseInt(req.query.page || 1);
    let pagesize = parseInt(req.query.pagesize || 10);

    let name = req.query.name || '';


 	mongoDBModule.findmain(page, pagesize, name, function(data,count) {
 		var objdData = {
 			msg:"main recherchés avec succès",
 			data: data,
			count:count
 		}
 		res.send(JSON.stringify(objdData)); 
 	}); 
});

app.get('/api/main/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.findmainById(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
 
});

app.post('/api/main', multerData.fields([]), function(req, res) {

 	mongoDBModule.createmain(req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

app.put('/api/main/:id', multerData.fields([]), function(req, res) {
	var id = req.params.id;

 	mongoDBModule.updatemain(id, req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

app.delete('/api/main/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.deletemain(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
})
app.get('/api/dessert/count', function(req, res) {
    let name = req.query.name || '';

    mongoDBModule.countdessert(name, function(data) {
        var objdData = {
            msg:"dessert count",
            data: data
        }
        res.send(JSON.stringify(objdData));
    });
});

app.get('/api/dessert', function(req, res) { 
    let page = parseInt(req.query.page || 1);
    let pagesize = parseInt(req.query.pagesize || 10);

    let name = req.query.name || '';


 	mongoDBModule.finddessert(page, pagesize, name, function(data,count) {
 		var objdData = {
 			msg:"dessert recherchés avec succès",
 			data: data,
			count:count
 		}
 		res.send(JSON.stringify(objdData)); 
 	}); 
});

app.get('/api/dessert/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.finddessertById(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
 
});

app.post('/api/dessert', multerData.fields([]), function(req, res) {

 	mongoDBModule.createdessert(req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

app.put('/api/dessert/:id', multerData.fields([]), function(req, res) {
	var id = req.params.id;

 	mongoDBModule.updatedessert(id, req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

app.delete('/api/dessert/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.deletedessert(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
})