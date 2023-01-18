const fs = require("fs");
const request = require("request");

const fileName = "./nodejs/zaliczenie/data.json";

if (fileName != "") {
  fs.readFile(fileName, "utf-8", (error, data) => {
    if (error) {
      console.log("Odczyt się nie udał");
    } else {
      const dataFromFile = JSON.parse(data);
      const numberFromFile = dataFromFile.number;
      const newFileName = dataFromFile.fileName; // czemu nie dziala?
      const serverAddress = `http://numbersapi.com/${numberFromFile}`;
      request(serverAddress, (err, response, body) => {
        if (err) {
          console.log("Błąd połączenia z serwerem");
        } else {
          console.log("Otrzymano odpowiedź z serwera");
          if (response.statusCode === 200) {
            try {
              fs.writeFile("file.json", body, (error) => {
                if (error) {
                  console.log("Zapis się nie udał");
                } else {
                  console.log("Zapis się udał");
                }
              });
              console.log(body);
            } catch {
              console.log("Nieudana próba pobrania danych");
            }
          } else {
            console.log(response.statusCode);
          }
        }
      });
    }
  });
} else {
  console.log("Nie podano pliku");
}
