<template>
<div id="app-menu">
  <h2>Menu du Restaurant</h2>
  <table>
      <tbody>
        <tr >
          <button v-if="nbStartersSelect>0" v-on:click="nbStartersSelect --;bill()">-</button>
          <td>{{starterName}}</td>
          <td>{{starterPrice}}€</td>
          <button v-on:click="nbStartersSelect++;bill()">+</button>
        </tr>
        <tr >
          <button v-if="nbMainsSelect>0" v-on:click="nbMainsSelect --;bill()">-</button>
          <td>{{mainName}}</td>
          <td>{{mainPrice}}€</td>
          <button v-on:click="nbMainsSelect ++;bill()">+</button>
        </tr>
        <tr >
          <button v-if="nbDessertsSelect>0" v-on:click="nbDessertsSelect --;bill()">-</button>
          <td>{{dessertName}}</td>
          <td>{{dessertPrice}}€</td>
          <button v-on:click="nbDessertsSelect ++;bill()">+</button>
        </tr>
      </tbody>
    </table>
    <br>
    Total Commande = {{total}}
</div>
</template>
<script>
export default {
    data(){
      return{
      nbStarters: 0,
      nbMains: 0,
      nbDesserts: 0,
      nbStartersSelect: 0,
      nbMainsSelect: 0,
      nbDessertsSelect: 0,
      nbPagesDeResultats: 0,
      page :0,
      pagesize :10,
      nomRecherche:'',
      starters:[],
      mains:[],
      desserts:[],
      starterName:'',
      starterPrice:'',
      mainName:'',
      mainPrice:'',
      dessertName:'',
      dessertPrice:'',
      total:0,
      }
    
  },
  mounted() {
    console.log("AVANT AFFICHAGE");
    this.getStarterFromServer();
    this.getMainsFromServer();
    this.getDessertFromServer();
  },
	methods: {
    getStarterFromServer() {
      let url =
        "http://localhost:8080/api/starter?page=" +
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
            console.log("Starters récupérés");
            this.starters = responseJS.data;
            this.nbStarters = responseJS.count;
            this.nbPagesDeResultats = Math.ceil(
              this.nbStarters / this.pagesize
            );
            let i = Math.round(Math.random()*10)
            console.log(i);
            console.log(responseJS.data[i]);
            this.starterName = responseJS.data[i].name;
            this.starterPrice = responseJS.data[i].price;
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getMainsFromServer() {
      let url =
        "http://localhost:8080/api/main?page=" +
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
            console.log("Starters récupérés");
            this.mains = responseJS.data;
            this.nbMains = responseJS.count;
            this.nbPagesDeResultats = Math.ceil(
              this.nbMains / this.pagesize
            );
            let i = Math.round(Math.random()*10);
            this.mainName = responseJS.data[i].name;
            this.mainPrice = responseJS.data[i].price;
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getDessertFromServer() {
      let url =
        "http://localhost:8080/api/dessert?page=" +
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
            console.log("Starters récupérés");
            this.desserts = responseJS.data;
            this.nbDesserts = responseJS.count;
            this.nbPagesDeResultats = Math.ceil(
              this.nbDesserts / this.pagesize
            );
            let i = Math.round(Math.random()*10);
            this.dessertName = responseJS.data[i].name;
            this.dessertPrice = responseJS.data[i].price;
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    bill(){
      this.total = this.nbStartersSelect * this.starterPrice + this.nbMainsSelect * this.mainPrice + this.nbDessertsSelect * this.dessertPrice;
      this.total = Math.round(this.total*100)/100
    }
  }
}
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



  