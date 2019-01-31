import axios from "axios";

const getPokemons = () => {
  return axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
};

const getPokemonDetails = (name: string = "") => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
};

export default {
  getPokemons,
  getPokemonDetails
};
