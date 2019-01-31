import axios from "axios";

const getPokemons = () => {
  return axios.get("/api/pokemons.json");
};

const getPokemon = (name: number) => {
  return axios.get(`/api/${name}.json`);
};

const getPokemonDetails = () => {
  return axios.get("/api/pokemon-details.json");
};

export default {
  getPokemons,
  getPokemon,
  getPokemonDetails
};
