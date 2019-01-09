<template>
<div id="app">
<p>Commander vos plats</p>
	<table>
    <tr>
      <td>Menu {{r.name}} </td>
    </tr>
    <tr>
      <td>entre</td>
	  <td>
        <label id="" >{{r.entre}}</label>
		<button v-bind:class="{inactif:(quantite_entree == (quantite_entree.value+1))}">+</button>
		<button v-bind:class="{inactif:(quantite_entree == (quantite_entree.value-1))}">-</button>
		<input type="number" id="quantite_entree" value="0">
	  </td>
    </tr>
    <tr>
      <td>plat</td>
      <td>
        <label id="" >{{r.plat}}</label>
        <button v-bind:class="{inactif:(quantite_plat == (quantite_plat.value+1))}">+</button>
		<button v-bind:class="{inactif:(quantite_plat == (quantite_plat.value-1))}">-</button>
		<input type="number" id="quantite_plat" value="0">
      </td>
    </tr>
    <tr>
      <td>dessert</td>
      <td>
        <label id="" >{{r.dessert}}</label>
        <button v-bind:class="{inactif:(quantite_dessert == (quantite_dessert.value+1))}">+</button>
		<button v-bind:class="{inactif:(quantite_dessert == (quantite_dessert.value-1))}">-</button>
		<input type="number" id="quantite_dessert" value="0">
      </td>
    </tr>
  </table>
  <label id="total" value="">quantite_entree*{{r.euro}}+quantite_plat*{{r.euro}}+quantite_dessert*{{r.euro}}</label>
</div>
</template>

  