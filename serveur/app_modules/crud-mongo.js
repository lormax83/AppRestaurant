var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');
//var url = 'mongodb://localhost:27017/test';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

exports.connexionMongo = function(callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		
		assert.equal(null, err);
		callback(err, db);
	});
}

exports.countRestaurants = function(name,callback) {
    MongoClient.connect(url, function(err, client) {
        var db = client.db(dbName);

        console.log("db " + db)
        if(!err){
        	if(name==''){
                db.collection('restaurants')
                    .count()
                    .then(rep => callback(rep));
			}else {
                let query = {
                    "name" : {$regex:".*"+name+".*",$options:"i"}
                }
                db.collection('restaurants')
					.find(query)
                    .count()
                    .then(rep => callback(rep));

			}
        }
    });
};

exports.findRestaurants = function(page, pagesize, name, callback) {
    MongoClient.connect(url, function(err, client) {

			var db = client.db(dbName);

			console.log("db " + db)
        if(!err){
			if(name == ''){
                db.collection('restaurants')
                    .find()
                    .skip(page*pagesize)
                    .limit(pagesize)
                    .toArray()
                    .then(arr=>{
                        db.collection('restaurants')
							.count()
							.then(rep=>callback(arr,rep))
					});
			}
			else{
					let query = {
						"name" : {$regex:".*"+name+".*",$options:"i"}
					}
                    db.collection('restaurants')
                        .find(query)
                        .skip(page*pagesize)
                        .limit(pagesize)
                        .toArray()
                        .then(arr=>{
                            db.collection('restaurants')
								.find(query)
                                .count()
                                .then(rep=>callback(arr,rep))
					});
			}
        }
        else{
            callback(-1);
        }
    });
};

exports.findRestaurantById = function(id, callback) {
    MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
        if(!err) {
        	// La requete mongoDB

            let myquery = { "_id": ObjectId(id)};

            db.collection("restaurants") 
            .findOne(myquery, function(err, data) {
            	let reponse;

                if(!err){
                    reponse = {
                    	succes: true,
                        restaurant : data,
                        error : null,
                        msg:"Details du restaurant envoyés"
                    };
                } else{
                    reponse = {
                    	succes: false,
                        restaurant : null,
                        error : err,
                        msg: "erreur lors du find"

                    };
                }
                callback(reponse);
            });
        } else {
        	let reponse = reponse = {
                    	succes: false,
                        restaurant : null,
                        error : err,
                        msg: "erreur de connexion à la base"
                    };
            callback(reponse);
        }
    });
}

exports.createRestaurant = function(formData, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

	    if(!err) {
	 
			let toInsert = {
				name : formData.nom, 
				cuisine : formData.cuisine
			};
			console.dir(JSON.stringify(toInsert));
		    db.collection("restaurants")
		    .insert(toInsert, function(err, insertedId) {
		    	let reponse;

		    	console.log('++++'+insertedId)

		        if(!err){
		            reponse = {
		                succes : true,
		                result: insertedId.ops[0]._id,
		                error : null,
		                msg: "Ajout réussi " + insertedId.ops[0]._id
		            };
		        } else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à l'insertion"
		            };
		        }
		        callback(reponse);
		    });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de l'insertion, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.updateRestaurant = function(id, formData, callback) {

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "_id": ObjectId(id)};
	        let newvalues = {
	        	name : formData.nom, 
	        	cuisine : formData.cuisine
	        };


			db.collection("restaurants")
			.replaceOne(myquery, newvalues, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Modification réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la modification"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la modification, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.deleteRestaurant = function(id, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "_id": ObjectId(id)};
	        
			db.collection("restaurants")
			.deleteOne(myquery, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Suppression réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la suppression"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la suppression, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}
exports.countstarter = function(name,callback) {
    MongoClient.connect(url, function(err, client) {
        var db = client.db(dbName);

        console.log("db " + db)
        if(!err){
        	if(name==''){
                db.collection('starter')
                    .count()
                    .then(rep => callback(rep));
			}else {
                let query = {
                    "name" : {$regex:".*"+name+".*",$options:"i"}
                }
                db.collection('starter')
					.find(query)
                    .count()
                    .then(rep => callback(rep));

			}
        }
    });
};

exports.findstarter = function(page, pagesize, name, callback) {
    MongoClient.connect(url, function(err, client) {

			var db = client.db(dbName);

			console.log("db " + db)
        if(!err){
			if(name == ''){
                db.collection('starter')
                    .find()
                    .skip(page*pagesize)
                    .limit(pagesize)
                    .toArray()
                    .then(arr=>{
                        db.collection('starter')
							.count()
							.then(rep=>callback(arr,rep))
					});
			}
			else{
					let query = {
						"name" : {$regex:".*"+name+".*",$options:"i"}
					}
                    db.collection('starter')
                        .find(query)
                        .skip(page*pagesize)
                        .limit(pagesize)
                        .toArray()
                        .then(arr=>{
                            db.collection('starter')
								.find(query)
                                .count()
                                .then(rep=>callback(arr,rep))
					});
			}
        }
        else{
            callback(-1);
        }
    });
};

exports.findstarterById = function(id, callback) {
    MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
        if(!err) {
        	// La requete mongoDB

            let myquery = { "_id": ObjectId(id)};

            db.collection("starter") 
            .findOne(myquery, function(err, data) {
            	let reponse;

                if(!err){
                    reponse = {
                    	succes: true,
                        starter : data,
                        error : null,
                        msg:"Details du starter envoyés"
                    };
                } else{
                    reponse = {
                    	succes: false,
                        starter : null,
                        error : err,
                        msg: "erreur lors du find"

                    };
                }
                callback(reponse);
            });
        } else {
        	let reponse = reponse = {
                    	succes: false,
                        starter : null,
                        error : err,
                        msg: "erreur de connexion à la base"
                    };
            callback(reponse);
        }
    });
}

exports.createstarter = function(formData, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

	    if(!err) {
	 
			let toInsert = {
				index : formData.index,
	        	name : formData.name, 
	        	price : formData.price
			};
			console.dir(JSON.stringify(toInsert));
		    db.collection("starter")
		    .insert(toInsert, function(err, insertedId) {
		    	let reponse;

		    	console.log('++++'+insertedId)

		        if(!err){
		            reponse = {
		                succes : true,
		                result: insertedId.ops[0]._id,
		                error : null,
		                msg: "Ajout réussi " + insertedId.ops[0]._id
		            };
		        } else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à l'insertion"
		            };
		        }
		        callback(reponse);
		    });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de l'insertion, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.updatestarter = function(id, formData, callback) {

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "_id": ObjectId(id)};
	        let newvalues = {
                index : formData.index,
	        	name : formData.name, 
	        	price : formData.price
	        };


			db.collection("starter")
			.replaceOne(myquery, newvalues, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Modification réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la modification"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la modification, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.deletestarter = function(id, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "_id": ObjectId(id)};
	        
			db.collection("starter")
			.deleteOne(myquery, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Suppression réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la suppression"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la suppression, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}
exports.countmain = function(name,callback) {
    MongoClient.connect(url, function(err, client) {
        var db = client.db(dbName);

        console.log("db " + db)
        if(!err){
        	if(name==''){
                db.collection('main')
                    .count()
                    .then(rep => callback(rep));
			}else {
                let query = {
                    "name" : {$regex:".*"+name+".*",$options:"i"}
                }
                db.collection('main')
					.find(query)
                    .count()
                    .then(rep => callback(rep));

			}
        }
    });
};

exports.findmain = function(page, pagesize, name, callback) {
    MongoClient.connect(url, function(err, client) {

			var db = client.db(dbName);

			console.log("db " + db)
        if(!err){
			if(name == ''){
                db.collection('main')
                    .find()
                    .skip(page*pagesize)
                    .limit(pagesize)
                    .toArray()
                    .then(arr=>{
                        db.collection('main')
							.count()
							.then(rep=>callback(arr,rep))
					});
			}
			else{
					let query = {
						"name" : {$regex:".*"+name+".*",$options:"i"}
					}
                    db.collection('main')
                        .find(query)
                        .skip(page*pagesize)
                        .limit(pagesize)
                        .toArray()
                        .then(arr=>{
                            db.collection('main')
								.find(query)
                                .count()
                                .then(rep=>callback(arr,rep))
					});
			}
        }
        else{
            callback(-1);
        }
    });
};

exports.findmainById = function(id, callback) {
    MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
        if(!err) {
        	// La requete mongoDB

            let myquery = { "_id": ObjectId(id)};

            db.collection("main") 
            .findOne(myquery, function(err, data) {
            	let reponse;

                if(!err){
                    reponse = {
                    	succes: true,
                        main : data,
                        error : null,
                        msg:"Details du main envoyés"
                    };
                } else{
                    reponse = {
                    	succes: false,
                        main : null,
                        error : err,
                        msg: "erreur lors du find"

                    };
                }
                callback(reponse);
            });
        } else {
        	let reponse = reponse = {
                    	succes: false,
                        main : null,
                        error : err,
                        msg: "erreur de connexion à la base"
                    };
            callback(reponse);
        }
    });
}

exports.createmain = function(formData, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

	    if(!err) {
	 
			let toInsert = {
				index : formData.index,
	        	name : formData.name, 
	        	price : formData.price
			};
			console.dir(JSON.stringify(toInsert));
		    db.collection("main")
		    .insert(toInsert, function(err, insertedId) {
		    	let reponse;

		    	console.log('++++'+insertedId)

		        if(!err){
		            reponse = {
		                succes : true,
		                result: insertedId.ops[0]._id,
		                error : null,
		                msg: "Ajout réussi " + insertedId.ops[0]._id
		            };
		        } else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à l'insertion"
		            };
		        }
		        callback(reponse);
		    });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de l'insertion, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.updatemain = function(id, formData, callback) {

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "_id": ObjectId(id)};
	        let newvalues = {
                index : formData.index,
	        	name : formData.name, 
	        	price : formData.price
	        };


			db.collection("main")
			.replaceOne(myquery, newvalues, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Modification réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la modification"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la modification, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.deletemain = function(id, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "_id": ObjectId(id)};
	        
			db.collection("main")
			.deleteOne(myquery, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Suppression réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la suppression"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la suppression, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}
exports.countdessert = function(name,callback) {
    MongoClient.connect(url, function(err, client) {
        var db = client.db(dbName);

        console.log("db " + db)
        if(!err){
        	if(name==''){
                db.collection('dessert')
                    .count()
                    .then(rep => callback(rep));
			}else {
                let query = {
                    "name" : {$regex:".*"+name+".*",$options:"i"}
                }
                db.collection('dessert')
					.find(query)
                    .count()
                    .then(rep => callback(rep));

			}
        }
    });
};

exports.finddessert = function(page, pagesize, name, callback) {
    MongoClient.connect(url, function(err, client) {

			var db = client.db(dbName);

			console.log("db " + db)
        if(!err){
			if(name == ''){
                db.collection('dessert')
                    .find()
                    .skip(page*pagesize)
                    .limit(pagesize)
                    .toArray()
                    .then(arr=>{
                        db.collection('dessert')
							.count()
							.then(rep=>callback(arr,rep))
					});
			}
			else{
					let query = {
						"name" : {$regex:".*"+name+".*",$options:"i"}
					}
                    db.collection('dessert')
                        .find(query)
                        .skip(page*pagesize)
                        .limit(pagesize)
                        .toArray()
                        .then(arr=>{
                            db.collection('dessert')
								.find(query)
                                .count()
                                .then(rep=>callback(arr,rep))
					});
			}
        }
        else{
            callback(-1);
        }
    });
};

exports.finddessertById = function(id, callback) {
    MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
        if(!err) {
        	// La requete mongoDB

            let myquery = { "_id": ObjectId(id)};

            db.collection("dessert") 
            .findOne(myquery, function(err, data) {
            	let reponse;

                if(!err){
                    reponse = {
                    	succes: true,
                        dessert : data,
                        error : null,
                        msg:"Details du dessert envoyés"
                    };
                } else{
                    reponse = {
                    	succes: false,
                        dessert : null,
                        error : err,
                        msg: "erreur lors du find"

                    };
                }
                callback(reponse);
            });
        } else {
        	let reponse = reponse = {
                    	succes: false,
                        dessert : null,
                        error : err,
                        msg: "erreur de connexion à la base"
                    };
            callback(reponse);
        }
    });
}

exports.createdessert = function(formData, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

	    if(!err) {
	 
			let toInsert = {
				index : formData.index,
	        	name : formData.name, 
	        	price : formData.price
			};
			console.dir(JSON.stringify(toInsert));
		    db.collection("dessert")
		    .insert(toInsert, function(err, insertedId) {
		    	let reponse;

		    	console.log('++++'+insertedId)

		        if(!err){
		            reponse = {
		                succes : true,
		                result: insertedId.ops[0]._id,
		                error : null,
		                msg: "Ajout réussi " + insertedId.ops[0]._id
		            };
		        } else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à l'insertion"
		            };
		        }
		        callback(reponse);
		    });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de l'insertion, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.updatedessert = function(id, formData, callback) {

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "_id": ObjectId(id)};
	        let newvalues = {
                index : formData.index,
	        	name : formData.name, 
	        	price : formData.price
	        };


			db.collection("dessert")
			.replaceOne(myquery, newvalues, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Modification réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la modification"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la modification, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.deletedessert = function(id, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "_id": ObjectId(id)};
	        
			db.collection("dessert")
			.deleteOne(myquery, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Suppression réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la suppression"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la suppression, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}