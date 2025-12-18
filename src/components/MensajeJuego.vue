<template>
  <div v-if="mostrar" :class="['mensaje', tipo]">
    <p v-for="(linea, index) in lineas" :key="index">{{ linea }}</p>
    <button @click="$emit('nuevoJuego')" class="btn-nuevo-juego">Nuevo Juego</button>
  </div>
</template>

<script>
export default {
  name: 'MensajeJuego',
  props: {
    mostrar: {
      type: Boolean,
      default: false
    },
    tipo: {
      type: String,
      required: true
    },
    lineas: {
      type: Array,
      required: true
    }
  },
  emits: ['nuevoJuego']
}
</script>

<style scoped>
.mensaje {
  padding: 20px;
  margin: 20px 0;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border-radius: 8px;
}

.mensaje.perdio {
  color: red;
  border: 2px solid black;
}

.mensaje.gano {
  color: rgb(95, 95, 207);
  border: 2px solid black;
}

.mensaje p {
  margin: 10px 0;
}

.btn-nuevo-juego {
  margin-top: 20px;
  padding: 12px 40px;
  font-size: 18px;
  font-weight: bold;
  background-color: white;
  color: black;
  border: 3px solid black;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-nuevo-juego:hover {
  background-color: black;
  color: white;
}
</style>