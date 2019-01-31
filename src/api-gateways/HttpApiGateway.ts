import axios from "axios";

const getPokemons = () => {
  return axios.get("https://pokeapi.co/api/v2/pokemon");
};

const getPokemonDetails = (name: string = "") => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
};

export default {
  getPokemons,
  getPokemonDetails
};
