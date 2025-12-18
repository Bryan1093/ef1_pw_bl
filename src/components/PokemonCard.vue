<template>
  <div class="pokemon-card">
    <img :src="imagen" :alt="nombre" />
    <p>{{ nombre }}</p>
  </div>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    imagen: {
      type: String,
      required: true
    },
    nombre: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.pokemon-card img {
  width: 250px;
  height: 250px;
  object-fit: contain;
  padding: 10px;
}

.pokemon-card p {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
}
</style>