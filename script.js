const pokemonName = document.querySelector('.poke-name');
const pokemonNumber = document.querySelector('.poke-number');
const pokemonImage = document.querySelector('.poke-img');
const pokemonType = document.querySelector('.poke-type');
const pokemonAbility = document.querySelector('.poke-ability');
const pokemonStatsHP = document.querySelector('.poke-stats0');
const pokemonStatsATK = document.querySelector('.poke-stats1');
const pokemonStatsDEF = document.querySelector('.poke-stats2');
const pokemonStatsSPA = document.querySelector('.poke-stats3');
const pokemonStatsSPD = document.querySelector('.poke-stats4');
const pokemonStatssSPE = document.querySelector('.poke-stats5');

const form = document.querySelector('.formulario');
const input = document.querySelector('.buscar');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (apiResponse.status === 200) {
    const data = await apiResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;

    let typeName = data.types[0].type.name;

    let typeColor = getComputedStyle(document.documentElement).getPropertyValue(
      `--${typeName}`
    );

    if (data.types.length > 1) {
      let typeName2 = data.types[1].type.name;

      pokemonType.innerHTML = typeName + ' | ' + typeName2;

      let typeColor2 = getComputedStyle(
        document.documentElement
      ).getPropertyValue(`--${typeName2}`);

      document.getElementById(
        'poke-img'
      ).style.borderImage = `linear-gradient(to bottom left, ${typeColor}, ${typeColor2}) 1`;
    } else {
      pokemonType.innerHTML = typeName;
      document.getElementById('poke-img').style.borderColor = typeColor;
      document.getElementById('poke-img').style.borderImage = '';
    }

    pokemonImage.src =
      data['sprites']['other']['official-artwork']['front_default'];
    pokemonAbility.innerHTML = data['abilities']['0']['ability']['name'];
    pokemonStatsHP.innerHTML =
      data['stats']['0']['stat']['name'] +
      ': ' +
      data['stats']['0']['base_stat'];
    pokemonStatsATK.innerHTML =
      data['stats']['1']['stat']['name'] +
      ': ' +
      data['stats']['1']['base_stat'];
    pokemonStatsDEF.innerHTML =
      data['stats']['2']['stat']['name'] +
      ': ' +
      data['stats']['2']['base_stat'];
    pokemonStatsSPA.innerHTML =
      data['stats']['3']['stat']['name'] +
      ': ' +
      data['stats']['3']['base_stat'];
    pokemonStatsSPD.innerHTML =
      data['stats']['4']['stat']['name'] +
      ': ' +
      data['stats']['4']['base_stat'];
    pokemonStatssSPE.innerHTML =
      data['stats']['5']['stat']['name'] +
      ': ' +
      data['stats']['5']['base_stat'];

    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonNumber.innerHTML = 'Error';
    pokemonName.innerHTML = 'Not found :(';
    pokemonImage.src =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png';
    pokemonType.innerHTML = '';
    pokemonAbility.innerHTML = '';
    pokemonStatsHP.innerHTML = '';
    pokemonStatsATK.innerHTML = '';
    pokemonStatsDEF.innerHTML = '';
    pokemonStatsSPA.innerHTML = '';
    pokemonStatsSPD.innerHTML = '';
    pokemonStatssSPE.innerHTML = '';
  }
};

function buscar(event) {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
}
function prevClick(event) {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
}
function nextClick(event) {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
}

form.addEventListener('submit', buscar);
buttonPrev.addEventListener('click', prevClick);
buttonNext.addEventListener('click', nextClick);

renderPokemon(searchPokemon);
