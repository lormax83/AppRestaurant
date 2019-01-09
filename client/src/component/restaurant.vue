<template>
<div id="app">
<div class="action">
				<p>	    
					<h1 class="titre"><md-icon class="fa fa-bars"></md-icon>Liste des restaurants : </h1>	
					<p style="font-size: 21px;font-family: sans-serif;">Nombre de restaurants : {{nbRestaurants}}, nb pages = {{nbPagesDeResultats}}</p>            
						<div>
							<label style="font-size: 21px;font-family: sans-serif;">
								Rechercher par nom : 
								<input type="text" v-on:input="getRestaurantsFromServer()" 
									   v-model="nomRecherche">
							</label>
						</div>
					
			</div>
	<div class="action">

        <form id="formulaireModification"  v-on:submit="modifierRestaurant" style="display:none">
					<div class="md-title"><h1 class="titre"><md-icon class="fa fa-plus"></md-icon>Modification d'un restaurant :</h1></div>
				<div class="md-layout-item md-small-size-100">
                <label>
                    Id: <input type="text" name="_id" id="idModification"
                    value="" required placeholder="Id du restaurant à modifier" readonly>
                </label>
                <p></p>
                <label>
                    Nom: <input type="text" name="nom" id="nomModification"
                    value="" required placeholder="Nom du restaurant">
                </label>
                <p></p>
                <label>
                    Cuisine: <input type="text" name="cuisine" id="cuisineModification"
                    value="" required placeholder="Cuisine française">
                </label>
                <p></p>
				</div> <button class="bouton">Modifier ce restaurant</button>
        </form>
	</div>
	
    <table>
        <tr>
            <th>Nom</th>
            <th>Cuisine </th>
            <th>Action </th>
        </tr>
        <tbody>
           <tr v-for="r,index in restaurants" v-bind:style="{backgroundColor:getColor(index)}">
                    <td>{{r.name}}</td>
                    <td>{{r.cuisine}}</td>
                    <td>

            <a v-link="{path: 'http://localhost:8080/api/restaurants/' + r.id}">Detail</a>

                </td>
            </tr>
        </tbody>
    </table>
		<div class="action">
<p> 
        <input type="range" v-on:input="getRestaurantsFromServer()" 
               value=10 min=2 max =100 
               v-model="pagesize"
        > : {{this.pagesize}}
    </p>
    <button class="bouton2" v-on:click="Premierepage()">Premiere page</button>
	<button class="bouton2" v-on:click="pagePrecedente()" v-bind:class="{inactif:(page==0)}">Page Precedente</button>
    <button class="bouton2" v-on:click="pageSuivante()" v-bind:class="{inactif:(page == (nbPagesDeResultats-1))}">Page Suivante</button>
	<button class="bouton2" v-on:click="Dernierepage()">Derniere Page</button>
	<div style="margin-top:20px;font-size:15px;text-align:center;font-family: sans-serif;">Page : {{page}}</div>

		</div>
</div>
			

</template>

<script>
export default {

        data() {
            return {
            nbRestaurants: 0,
            nbPagesDeResultats: 0,
            nom: '',
            cuisine: '',
            nomAdd: '',
            cuisineAdd: '',
            page: 0,
            pagesize: 10,
            nomRecherche: "",
            }
        },
        mounted() {
            console.log("AVANT AFFICHAGE");
            this.getRestaurantsFromServer();
        },
        methods: {
            getRestaurantsFromServer() {
                let url = "http://localhost:8080/api/restaurants?page=" +
                    this.page +
                    "&pagesize=" + this.pagesize +
                    "&name=" + this.nomRecherche;

                // ARROW FUNCTIONS PRESERVENT LE THIS !!!
                fetch(url)
                    .then((responseJSON) => {
                        responseJSON.json()
                            .then((responseJS) => {
                                // Maintenant res est un vrai objet JavaScript
                                console.log("restaurants récupérés");
                                this.restaurants = responseJS.data;
                                this.nbRestaurants = responseJS.count;
                                this.nbPagesDeResultats = Math.ceil(this.nbRestaurants / this.pagesize);
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            getColor(index) {
                return (index % 2) ? 'white' : 'lightgrey';
            },
            pagePrecedente() {
                if (this.page !== 0) {
                    this.page--;
                    this.getRestaurantsFromServer();
                }
            },
            pageSuivante() {
                if (this.page < this.nbPagesDeResultats) {
                    this.page++;
                    this.getRestaurantsFromServer();
                }
            },
			
			Dernierepage() {
                this.page = (this.nbRestaurants)/10;
                this.getRestaurantsFromServer();
            },
			
			Premierepage() {
                this.page = 0;
                this.getRestaurantsFromServer();
            },
			
            modifierRestaurant(event) {
                // Pour éviter que la page ne se ré-affiche
                event.preventDefault();

                // Récupération du formulaire. Pas besoin de document.querySelector
                // ou document.getElementById puisque c'est le formulaire qui a généré
                // l'événement
                let form = event.target;
                // Récupération des valeurs des champs du formulaire
                // en prévision d'un envoi multipart en ajax/fetch
                let donneesFormulaire = new FormData(event.target);

                let id = form._id.value; // on peut aller chercher la valeur
                // d'un champs d'un formulaire
                // comme cela, si on connait le nom
                // du champ (valeur de son attribut name)

                let url = "http://localhost:8080/api/restaurants/" + id;

                fetch(url, {
                    method: "PUT",
                    body: donneesFormulaire
                })
                    .then((responseJSON) => {
                        responseJSON.json()
                            .then((responseJS) => {
                                // Maintenant res est un vrai objet JavaScript
                                console.log(responseJS.msg);
                                document.getElementById('formulaireModification').style.display = "none";
                                this.getRestaurantsFromServer();
                                
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
			
        }
}
</script>
<style>
table{
    text-align: center;
    width:33%;
    margin-left:auto;
    margin-right:auto;
}
</style>
