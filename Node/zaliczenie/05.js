const axios = require("axios");
const argv = require("yargs").argv;

let userName;
let userLocation;
let followers;

if (argv.userName === null) {
  console.log("Nie podano nazwy uzytkownika");
  process.exit(0);
} else {
  userName = argv.userName;
}
if (argv.followers == "true") {
  followers = true;
} else followers = false;

const getUserData = (userName) => {
  const baseurl = `https://api.github.com/users/${userName}`;
  const userRepoURL = baseurl + "/repos";
  const options = {
    host: "api.github.com",
    method: "GET",
    headers: { "user-agent": "node.js" },
  };
  return axios.get(baseurl, options).then((response) => response.data);
};

const getReposData = (userName) => {
  const userRepoURL = `https://api.github.com/users/${userName}/repos`;
  const options = {
    host: "api.github.com",
    method: "GET",
    headers: { "user-agent": "node.js" },
  };
  return axios.get(userRepoURL, options).then((response) => response.data);
};

const getUserWeather = (userLocation) => {
  const weatherURL =
    `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q=` +
    encodeURIComponent(userLocation);
  console.log(weatherURL);
  return axios.get(weatherURL).then((response) => response.data);
};

getUserData(userName)
  .then((user) => {
    console.log("User login is: " + user.login);
    // userLocation = user.location;
    console.log("User location is: " + user.location);
    if (followers) {
      console.log("User has " + user.followers + " followers");
    }
    return getReposData(user.login);
  })
  .then((repos) => {
    let reposCount = repos.filter((item) => item.name).length;
    console.log(`Users has ${reposCount} repositories: `);
    repos.forEach((repo) => console.log("• " + repo.name));
  })
  .catch((error) => console.log("Something bad happened 1"));

getUserData(userName)
  .then((user) => {
    return getUserWeather(user.location);
  })
  .then((weather) => {
    console.log(weather);
  })
  .catch((error) => console.log("Something bad happened 2"));
