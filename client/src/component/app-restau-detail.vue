<template>
<div id="app-restau-detail">
    <h1>Liste des Restaurants</h1>
    <p>
        <label>
            Rechercher par nom : 
            <input type="text">
            <li v-for="(restaurant, index) in restaurants">
                {{restaurant.nom}}
                {{restaurant.cuisine}}
        </li>           
                    
        </label>
    </p>
</div>
    
</template>

<script>
    export default {
        data() {
            return{
                restaurants: [
                    {nom: 'café de Paris'},
                    {cuisine: 'Française' }
                    ],
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
        },created: function init(){
            getRestaurantsFromServer();
        },
        created: function getRestaurantsFromServer() {
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
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        
    }

   </script>


<style>

</style>


