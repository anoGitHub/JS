const request = require("request");
const argv = require("yargs").argv;

const userName = argv.name;
const displayFollowers = true; //argv.disp;
console.log(displayFollowers);
let city = "";
const baseurl = `https://api.github.com/users/octocat`;
//${userName}`;
const userRepoURL = baseurl + "/repos";
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q=San%20Francisco`;

let options = {
  //   url: weatherURL,
  url: baseurl,
  host: "api.github.com",
  method: "GET",
  headers: { "user-agent": "node.js" },
};
// function getUserLocation() {
//   request(options, (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//       const userData = JSON.parse(body);
//       const userLocation = userData.location;
//       console.log(userLocation);
//       return userLocation;
//     } else {
//       console.log("Weather not found or network connection issues");
//     }
//   });
// }
// getUserLocation();
// if (argv.disp != "" || null) {

if (displayFollowers == true) {
  request(options, (error, response, body) => {
    console.log("i am herer");
    if (!error && response.statusCode === 200) {
      const userData = JSON.parse(body);
      const followers = userData.followers;
      console.log(followers);
    } else {
      console.log("Weather not found or network connection issues");
    }
  });
}
// }
// function getUserWeatherForUserLocation() {
//   request(options, (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//       const weatherData = JSON.parse(body);

//       console.log(weatherData.weather[0].description);
//     } else {
//       console.log("Weather not found or network connection issues");
//     }
//   });
// }
// getUserWeatherForUserLocation();
// function callback(error, response, body) {
//   const baseurl = `https://api.github.com/users/${userName}`;
//   if (!error && response.statusCode === 200) {
//     const user = JSON.parse(body);
//     let repoNames = user.map((users) => {
//       return users.name;
//     });
//     console.log(repoNames);
//     const weatherURL = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q=${city}`;
//   } else {
//     console.log("User not found or network connection issues");
//   }
// }

// request(options, callback);
if (argv.disp == "true") {
  console.log(process.argv);
}
