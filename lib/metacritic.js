export async function getLatestPokemon() {
  const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=24";

  const rawData = await fetch(POKEAPI_URL);
  const json = await rawData.json();

  const { results } = json;

  // Mapeamos la lista de Pokémon para devolver la información relevante
  return results.map((pokemon) => {
    const { name, url } = pokemon;
    const id = url.split("/").filter(Boolean).pop(); // Extraemos el ID del URL
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return {
      name,
      id,
      url,
      image,
    };
  });
}

export async function getPokemonDetails(id) {
  const POKEAPI_DETAILS_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const rawData = await fetch(POKEAPI_DETAILS_URL);
  const pokemon = await rawData.json();

  const {
    name,
    abilities,
    stats,
    types,
    sprites: { front_default: image },
  } = pokemon;

  // Formateamos las habilidades y estadísticas
  const formattedAbilities = abilities.map((ability) => ability.ability.name);
  const formattedStats = stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));
  const formattedTypes = types.map((type) => type.type.name);

  return {
    name,
    id,
    image,
    abilities: formattedAbilities,
    stats: formattedStats,
    types: formattedTypes,
  };
}
