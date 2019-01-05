<template>

 <md-card>
      <md-card-header>
        <md-card-header-text>
          			<div class="action">
<div class="md-title"><h1 style="text-align:center;font-size:45px;font-family:sans-serif;color:#655252;"><md-icon class="md-size-5x fa fa-home"></md-icon>Détail du restaurants</h1></div>
			</div>
     
	 </md-card-header-text>
		
		<md-card-content>
			
<h2>Nom : {{r.name}}</h2>
<h2>Cuisine : {{r.cuisine}}</h2>

<h2>Localisation</h2>
<p>Batiment : {{r.building}}</p>
<p>Rue : {{r.street}}</p>
<p>code postal : {{r.zipcode}}</p>
<p>Arrondissement : {{r.borough}}</p>
<p>Notes : {{r.grades}}</p>
		
        </md-card-content>

	</md-card-header>
</md-card>

</template>