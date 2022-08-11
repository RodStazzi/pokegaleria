const axios = require("axios");

const urlBase = "https://pokeapi.co/api/v2/pokemon?limit=60";

const getData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};
const getPokeDex = async () => {
  const { results: pokeLista } = await getData(urlBase);
  const pokePromesas = pokeLista.map(async ({ url }) => getData(url));
  const pokeDatos = await Promise.all(pokePromesas);
  return pokeDatos.map(({ name, sprites }) => {
    return { nombre: name, img: sprites.other.home.front_default };
  });
};
getPokeDex();
module.exports = { getPokeDex };
