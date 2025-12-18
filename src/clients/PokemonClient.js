import axios from "axios";

const obtenerPokemonsAleatorios = async () => {

    const id = Math.floor(Math.random() * 5) + 1;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return {
        id: response.data.id,
        nombre: response.data.name,
        imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${response.data.id}.svg`
    };
};

export async function obtener3PokemonAleatorios() {

    const pokemon1 = await obtenerPokemonsAleatorios();
    const pokemon2 = await obtenerPokemonsAleatorios();
    const pokemon3 = await obtenerPokemonsAleatorios();

    return[pokemon1, pokemon2, pokemon3];
}