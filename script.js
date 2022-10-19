const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const BY_POKEMON = "pokemon/";

const POKEMON_NAME = document.querySelector(".title h2");
const SEARCH_POKEMON = document.querySelector(".search-pokemon");
const BTN_SEARCH = document.querySelector(".btn-search");
const SPRITE = document.querySelector(".image img");
const CONTENT = document.querySelector(".text-content p");
const texto = document.createElement("p");

const BANNED_GAMES = ["fire", "sapphire", "bronze", "leafgreen"];

function fetchApi(id) {
  fetch(`${API_URL}${id}`)
    .then((response) => response.json())
    .then((data) => {
      const nameCapitalized = data.name;

      POKEMON_NAME.innerHTML = `# ${data.id} ${nameCapitalized}`;
      SPRITE.src = data.sprites.front_default;

      const moves = data.moves
        .map((value) => {
          return value.move.name;
        })
        .sort();

      CONTENT.textContent = JSON.stringify(moves);

      const numGames = data.game_indices.filter((game) => {
        if (!BANNED_GAMES.includes(game.version.name)) {
          return game;
        }
      });

      const pokemon = {
        name: nameCapitalized,
        moves: moves,
        games: numGames.length,
      };
      console.log(pokemon);
    });
}

BTN_SEARCH.addEventListener("click", getPokemonName);

function getPokemonName(name) {
  name = SEARCH_POKEMON.value;
  fetchApi(name);
}

// function getPokemonName(name) {
//   let min = Math.ceil(1);
//   let max = Math.floor(800);
//   name = Math.floor(Math.random() * (max - min) + min);
//   console.log(name);
//   fetchApi(name);
// }
/////
