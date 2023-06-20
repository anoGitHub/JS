1. Napisz jak najprostszy kod który spowoduje błąd stack overflow, czyli zwróci komunikat błędu: Uncaught RangeError: Maximum call stack size exceeded

2. Napisz aplikację która przyjmuje w parametrze uruchamiania ciąg znaków a następnie wyświetli go w kolorach tęczy. Wykorzystaj moduł colors (https://www.npmjs.com/package/colors) w wersji 1.3.2!. Pamiętaj o obsłudze błędów. Sposób obsługi parametrów wejściowych jest dowolny (w kodzie rozwiązania należy dodać komentarz z przykładowym wywołaniem).

3. Napisz program który wypisze szczegóły pliku z własnym kodem źródłowym.
   Wypisywane informacje:
   czas utworzenia
   czas modyfikacji
   rozmiar
   Program powinien działać poprawnie także po zmianie nazwy i lokalizacji pliku - bez zmiany kodu źródłowego!
   Przykłady wywołania

   > node app.js //wyświetla szczegóły pliku app.js

   po zmianie nazwy app.js na app2.js

   > node app2.js //wyświetla szczegóły pliku app2.js

   Podpowiedź: jest to możliwe przy użyciu wbudowanych modułów Node.js.

4. Napisz aplikację która odczyta z pliku data.json liczbę oraz nazwę pliku, a następnie:
   pobierze z API informacje o danej liczbie (http://numbersapi.com/{number}, np http://numbersapi.com/42)
   informacje pobrane z API zapisze w pliku o pobranej wcześniej nazwie
   Przykład pliku: data.json
   {
   "number": "588",
   "filename": "file.json"
   }
   Pamiętaj o obsłudze błędów. Żądania do API oraz zapis do pliku wykonuj asynchronicznie.

5. Stwórz aplikację która pobierze z GitHuba informacje o użytkowniku i jego repozytoriach.
   Dodatkowo sprawdź aktualną pogodę w lokalizacji użytkownika.
   w parametrach uruchomienia jest podawany login użytkownika oraz opcjonalnie informacja czy wyświetlać liczbę śledzących użytkownika,
   sposób obsługi parametrów wejściowych jest dowolny (w kodzie rozwiązania należy dodać komentarz z przykładowym wywołaniem).

wyświetl nazwę użytkownika (name)
wyświetl liczbę śledzących użytkownika (followers) - tylko jeżeli użyto odpowiedniego parametru przy uruchomieniu aplikacji
wyświetl liczbę repozytoriów
wyświetl nazwy repozytoriów (name)
wyświetl opis pogody (weather.main, weather.description) w lokalizacji użytkownika (location - zwraca GitHub w danych użytkownika)
żądania do API wysyłaj asynchronicznie
pamiętaj o obsłudze błędów
podziel rozwiązanie na moduły
Lista endpointów API:
dane użytkownika: https://api.github.com/users/{userName}
np https://api.github.com/users/octocat
repozytoria użytkownika: https://api.github.com/users/{username}/repos
np https://api.github.com/users/octocat/repos
pogoda: https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q={name}
np https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q=Białystok

6. Napisz aplikację pozwalającą na przechowywanie w pliku listy zadań do wykonania (klasyczna lista TODO).
   Aplikacja powinna pozwalać na dodanie do listy nowego zadania, jak również wyświetlić zawartość całej listy.
   Przy uruchomieniu bez parametrów aplikacja powinna informować o możliwych parametrach wywołania.

zapis/odczyt wykonuj asynchronicznie
pamiętaj o obsłudze błędów
poinformuj użytkownika o poprawności wykonanych operacji
wydziel odczyt i zapis informacji do osobnych modułów
Sugeruje użyć modułu yargs z konstrukcją yargs.command.

Przykład wywołania programu:

> node app.js dodaj "napisac program na zaliczenie z NodeJS"
> node app.js lista
