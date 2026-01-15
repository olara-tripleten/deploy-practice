// Promises and Fetch recap

/**
 *
 * Asyncronous: An operation that is not instantanous*, and it's not of constant time
 * Promise(async): Is the representation of an asyncronous operation.
 *                 It's a promise that a certain async action will
 *                 either be Rejected | Resolved and you'll get something whatever
 *                 case it ends up being
 *
 *
 * Fetch: Returns a promise to get data from an HTTPS resource
 *        that is typically a REST API
 *
 */

fetch("https://rickandmortyapi.com/api/character") // Making the actual request
  // Data Processing -----
  .then((response) => {
    // handle failures that are not errors
    if (!response.ok) {
      throw new Error("Error message");
    }
    return response.json(); // extracting the json data
  })
  .then((data) => {
    // Do whatever you need with the data you fetched
  })
  .catch((error) => {
    console.error(error);
    // Giving the user feedback on the operation
  });
