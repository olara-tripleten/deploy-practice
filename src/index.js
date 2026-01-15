// API -> Application Programming Interface
// A set of protocols/functions/utilities created
// for integrating different softwares
import "./blocks/page.css";
/**
 * Fetch Api:
 * Modern standard for performing
 * network requests.
 * Mainly Http
 *
 * a basic `fetch()` takes a single argument,
 * which is the URL for the resource you want to get
 */

/**
 * Free Rest Api's
 *
 * PokeApi: https://pokeapi.co/
 *
 * Rick & Morty API: https://rickandmortyapi.com/
 *
 * JsonPlaceholder: https://jsonplaceholder.typicode.com/
 *
 * Star Wars API: https://swapi.tech/
 */

const pokeList = document.querySelector(".pokemon__list");
const pokeTemplate = document
  .querySelector("#pokemon-template")
  .content.querySelector(".pokemon");

const apiUrl = "https://pokeapi.co/api/v2/pokemon";

/**
 * Returns the basic list of pokemons using the pokeapi
 * @returns Pokemon[]
 */
function getPokemons() {
  const pokemonRequest = fetch(apiUrl);
  return pokemonRequest
    .then((results) => {
      console.log(results);
      if (!results.ok) {
        // handle the error
        throw new Error("There was an error fetching the data");
      }
      return results.json();
    })
    .then((data) => {
      console.log(data);
      return data.results;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getPokemonDetails(pokemonUrl) {
  return fetch(pokemonUrl)
    .then((response) => {
      return response.json(); // extract the json data
    })
    .then((data) => {
      return data; // return the actual usable data
    })
    .catch((error) => console.error(error));
}

function createPokemon(pokemon) {
  const pokemonElement = pokeTemplate.cloneNode(true);
  const title = pokemonElement.querySelector("h3");
  const frontSpriteElement = pokemonElement.querySelector(
    ".pokemon__sprite_front"
  );
  const backSpriteElement = pokemonElement.querySelector(
    ".pokemon__sprite_back"
  );
  const playButton = pokemonElement.querySelector(".pokemon__play-button");
  title.textContent = pokemon.name;
  getPokemonDetails(pokemon.url).then((details) => {
    const frontSprite = details.sprites.front_default;
    const backSprite = details.sprites.back_default;
    frontSpriteElement.src = frontSprite;
    backSpriteElement.src = backSprite;

    const sound = new Audio(details.cries.latest);
    playButton.addEventListener("click", () => {
      sound.play();
    });
  });
  pokeList.append(pokemonElement);
}

// Promise - Rejected | resolved;

getPokemons().then((pokemons) => pokemons.forEach(createPokemon));

const jsonPlaceholderUrl = "https://jsonplaceholder.typicode.com/posts";
const postsList = document.querySelector(".posts__list");
const postTemplate = document
  .querySelector("#post-template")
  .content.querySelector(".post");

function getPosts() {
  return fetch(jsonPlaceholderUrl)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

function createPostElement(post) {
  const postElement = postTemplate.cloneNode(true);
  const postTitle = postElement.querySelector(".post__title");
  const postBody = postElement.querySelector(".post__body");
  const deleteButton = postElement.querySelector(".post__delete-button");
  postTitle.textContent = post.title;
  postBody.textContent = post.body;

  deleteButton.addEventListener("click", () => {
    console.log("I'm being deleted :)");
    deletePost(post.id).then(() => {
      postElement.remove();
    });
  });

  postsList.prepend(postElement);
}

getPosts().then((data) => {
  data.forEach((post) => {
    createPostElement(post);
  });
});

/**
 * HTTP Methods, are the ways in which we can interact with an API
 * - GET: used to get data from the server.
 *
 * - POST: used to send data to the server. Typically used on creation.
 *         Eg: create a new post. Create a new Pokemon. Create a new Product
 *
 * - PUT: Sends data to the server
 *        Used to fully update a resource.
 *        Eg: Updating a instagram POST/Whatsapp message
 *
 * - PATCH: Sends data to the server
 *          Used to partially update a resource.
 *          Eg: Updating the title on a youtube video
 *
 * - DELETE: Used to delete an specific resource. Eg: Deleting an instagram post.
 *           Deleting a youtube video, etc
 */

const postForm = document.querySelector(".posts__form");

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = postForm["title"];
  const descriptionInput = postForm["description"];
  const post = {
    title: titleInput.value,
    body: descriptionInput.value,
  };
  createNewPost(post).then((newPost) => {
    console.log(newPost);
    createPostElement(newPost);
  });
});

// JSON.stringify(javascriptVariable)
function createNewPost(post) {
  return fetch(jsonPlaceholderUrl, {
    method: "POST", // Sending data
    headers: {
      // Which Data Type
      "Content-Type": "application/json",
      // Extra headers
    },
    body: JSON.stringify(post), // actual data we're sending
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

function deletePost(id) {
  return fetch(`${jsonPlaceholderUrl}/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch(console.error);
}

// CRUD -> Create ✅ | Read ✅ | Update 🚧 | Delete ✅
