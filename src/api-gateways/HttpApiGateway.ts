import axios from "axios";
import * as axiosErrorStrategy from "../strategies/AxiosErrorStrategy";

const getPokemons = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      resolve(res);
    } catch (err) {
      reject(axiosErrorStrategy.handleRequestError(err.response));
    }
  });
};

const getPokemonDetails = (name: string = "") => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
};

export default {
  getPokemons,
  getPokemonDetails
};
