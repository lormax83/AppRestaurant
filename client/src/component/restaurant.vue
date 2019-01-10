<template>
  <div id="app">
    <div class="action">
      <p></p>
      <h1 class="titre">Liste des restaurants :</h1>
      <p
        style="font-size: 21px;font-family: sans-serif;"
      >Nombre de restaurants : {{nbRestaurants}}, nb pages = {{nbPagesDeResultats}}</p>
      <div>
        <label style="font-size: 21px;font-family: sans-serif;">
          Rechercher par nom :
          <input
            type="text"
            v-on:input="getRestaurantsFromServer()"
            v-model="nomRecherche"
          >
        </label>
      </div>
    </div>
    <br>
    <table>
      <tr>
        <th>Nom</th>
        <th>Cuisine</th>
        <th>Action</th>
      </tr>
      <tbody>
        <tr v-for="r,index in restaurants" v-bind:style="{backgroundColor:getColor(index)}">
          <td>{{r.name}}</td>
          <td>{{r.cuisine}}</td>
          <td>
            <a href="#app-restau-detail" v-on:click="getUnRestaurant(r._id); show =true">Detail</a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="action">
      <p>
        <input
          type="range"
          v-on:input="getRestaurantsFromServer()"
          value="10"
          min="2"
          max="100"
          v-model="pagesize"
        >
        : {{this.pagesize}}
      </p>
      <button class="bouton2" v-on:click="Premierepage()">Premiere page</button>
      <button
        class="bouton2"
        v-on:click="pagePrecedente()"
        v-bind:class="{inactif:(page==0)}"
      >Page Precedente</button>
      <button
        class="bouton2"
        v-on:click="pageSuivante()"
        v-bind:class="{inactif:(page == (nbPagesDeResultats-1))}"
      >Page Suivante</button>
      <button class="bouton2" v-on:click="Dernierepage()">Derniere Page</button>
      <div
        style="margin-top:20px;font-size:15px;text-align:center;font-family: sans-serif;"
      >Page : {{page+1}}</div>
       <br>
    </div>
    <div id="app-restau-detail" v-if="show === true">
      <h2>Details du Restaurant</h2>
      <table>
        <tr>
          <th>Nom:</th>
          <th>Cuisine:</th>
          <th>Score:</th>
          <th>Adresse:</th>
        </tr>
        <tbody>
          <tr>
            <td>{{nomRestauDetail}}</td>
            <td>{{cuisineRestauDetail}}</td>
            <td>{{scoreRestauDetail}}</td>
            <td>{{addressRestauDetail}}</td>
          </tr>
        </tbody>
      </table>
      <br>
      <router-link to="/AppMenu"><button>Voir le Menu</button></router-link>
      
<router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nbRestaurants: 0,
      nbPagesDeResultats: 0,
      nom: "",
      cuisine: "",
      nomAdd: "",
      cuisineAdd: "",
      page: 0,
      pagesize: 20,
      nomRecherche: "",
      link: "http://localhost:8080/api/restaurants",
      nomRestauDetail: "",
      cuisineRestauDetail: "",
      scoreRestauDetail: "",
      addressRestauDetail: "",
      show:false,
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServer();
  },
  methods: {
    getRestaurantsFromServer() {
      let url =
        "http://localhost:8080/api/restaurants?page=" +
        this.page +
        "&pagesize=" +
        this.pagesize +
        "&name=" +
        this.nomRecherche;

      // ARROW FUNCTIONS PRESERVENT LE THIS !!!
      fetch(url)
        .then(responseJSON => {
          responseJSON.json().then(responseJS => {
            // Maintenant res est un vrai objet JavaScript
            console.log("restaurants récupérés");
            this.restaurants = responseJS.data;
            this.nbRestaurants = responseJS.count;
            this.nbPagesDeResultats = Math.ceil(
              this.nbRestaurants / this.pagesize
            );
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getUnRestaurant(id) {
      let url = "http://localhost:8080/api/restaurants/" + id;
      fetch(url)
        .then(responseJSON => {
          responseJSON.json().then(responseJS => {
            this.nomRestauDetail = responseJS.restaurant.name;
            this.cuisineRestauDetail = responseJS.restaurant.cuisine;
            this.scoreRestauDetail = 0;
            for (let i = 0; i < responseJS.restaurant.grades.length; i++) {
              this.scoreRestauDetail =
                this.scoreRestauDetail + responseJS.restaurant.grades[i].score;
            }
            this.scoreRestauDetail = parseInt(
              this.scoreRestauDetail / responseJS.restaurant.grades.length
            );
            this.addressRestauDetail =
              responseJS.restaurant.address.building +
              " " +
              responseJS.restaurant.address.street +
              " " +
              responseJS.restaurant.address.zipcode +
              " " +
              responseJS.restaurant.borough;
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getColor(index) {
      return index % 2 ? "white" : "lightgrey";
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
      this.page = this.nbRestaurants / 10;
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
        .then(responseJSON => {
          responseJSON.json().then(responseJS => {
            // Maintenant res est un vrai objet JavaScript
            console.log(responseJS.msg);
            document.getElementById("formulaireModification").style.display =
              "none";
            this.getRestaurantsFromServer();
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
<style>
table {
  text-align: center;
  width: 33%;
  margin-left: auto;
  margin-right: auto;
  border-style: solid;
}
th,
tr,
td {
  border-style: groove;
}
</style>
