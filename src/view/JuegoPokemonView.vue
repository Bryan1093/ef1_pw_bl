<template>
    <div class="juego-pokemon">
        <h1>Juego CASINO</h1>

        <div class="header">
            <h2>Puntaje: {{ puntaje }}</h2>
            <h2>Intento: {{ intento }}</h2>
        </div>

        <div class="pokemon-container">
            <PokemonCard v-for="(pokemon, index) in pokemonsActuales" :key="index" :imagen="pokemon.imagen"
                :nombre="pokemon.nombre" />
        </div>

        <MensajeJuego :mostrar="mostrarMensaje" :tipo="tipoMensaje" :lineas="lineasMensaje"
            @nuevoJuego="reiniciarJuego" />

        <button @click="jugar" class="btn-jugar">JUGAR</button>
    </div>
</template>

<script>
import PokemonCard from '../components/PokemonCard.vue';
import MensajeJuego from '../components/MensajeJuego.vue';
import { obtener3PokemonAleatorios } from '../clients/PokemonClient';

export default {
    name: 'JuegoPokemon',
    components: {
        PokemonCard,
        MensajeJuego
    },
    data() {
        return {
            puntaje: 0,
            intento: 0,
            pokemonsActuales: [
                { imagen: 'https://dummyimage.com/250x250', nombre: 'XXXXXXXXX' },
                { imagen: 'https://dummyimage.com/250x250', nombre: 'XXXXXXXXXX' },
                { imagen: 'https://dummyimage.com/250x250', nombre: 'XXXXXXXXX' }
            ],
            mostrarMensaje: false,
            tipoMensaje: 'perdio',
            lineasMensaje: []
        }
    },
    methods: {
        async jugar() {
            this.intento++;
            const pokemons = await obtener3PokemonAleatorios();
            this.pokemonsActuales = pokemons;

            const nombres = pokemons.map(p => p.nombre);
            const coincidencias = this.contarCoincidencias(nombres);

            if (coincidencias === 3) {
                this.puntaje += 5;
            } else if (coincidencias === 2) {
                this.puntaje += 2;
            }

            if (this.intento === 5) {
                if (this.puntaje < 10) {
                    this.mostrarMensaje = true;
                    this.tipoMensaje = 'perdio';
                    this.lineasMensaje = [
                        'Ha utilizado tus 5 intentos',
                        'El juego a terminado, intentalo nuevamente'
                    ];
                }
            }

            if (this.puntaje >= 10) {
                this.mostrarMensaje = true;
                this.tipoMensaje = 'gano';
                this.lineasMensaje = [
                    `Puntaje: ${this.puntaje}`,
                    'Felicitaciones has ganado un premio de $10.000,00'
                ];
            }
        },
        contarCoincidencias(nombres) {
            const contador = {};
            let maxCoincidencias = 1;

            nombres.forEach(nombre => {
                contador[nombre] = (contador[nombre] || 0) + 1;
                if (contador[nombre] > maxCoincidencias) {
                    maxCoincidencias = contador[nombre];
                }
            });

            return maxCoincidencias;
        },
        reiniciarJuego() {
            this.puntaje = 0;
            this.intento = 0;
            this.mostrarMensaje = false;
            this.pokemonsActuales = [
                { imagen: 'https://dummyimage.com/250x250', nombre: 'XXXXXXXXX' },
                { imagen: 'https://dummyimage.com/250x250', nombre: 'XXXXXXXXXX' },
                { imagen: 'https://dummyimage.com/250x250', nombre: 'XXXXXXXXX' }
            ];
        }
    }
}
</script>

<style scoped>
.juego-pokemon {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

h1 {
    font-size: 32px;
    margin-bottom: 20px;
}

.header {
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;
}

.header h2 {
    font-size: 24px;
}

.pokemon-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 30px;
}

.btn-jugar {
    padding: 15px 60px;
    font-size: 20px;
    font-weight: bold;
    background-color: white;
    border: 3px solid black;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-jugar:hover {
    background-color: black;
    color: white;
}
</style>