export async function getJSON(url)
{
  try
  {
    let response = await fetch(url);
    let quakes = await response.json();
    return quakes;
  }
  catch(err)
  {
    return "Error: " + err;
  }
}

export const getLocation = function(options) {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};


// export function getJSON(url) {
//   return fetch(url)
//     .then(function(response) {
//       if (!response.ok) {
//         throw Error(response.statusText);
//       } else {
//         //console.log(response.json());
//         return response.json();
//       }
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// }
// export const getLocation = function(options) {
//   return new Promise(function(resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject, options);
//   });
// };
