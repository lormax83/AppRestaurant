<template>
<div id="app-restau-detail">
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
      <button>Voir le Menu</button>
    </div>
</template>
<script>
export default {
	
}
</script>

<style>
</style>
