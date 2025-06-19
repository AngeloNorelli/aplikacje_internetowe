# Dokumentacja
## Struktura bazy danych
> baza danych jest stawiana lokalnie na MySQL
### Tabela user
| Pole      | Typ     | Opis                |
|-----------|---------|---------------------|
| id        | int     | Klucz główny        |
| username  | string  | Nazwa użytkownika   |
| password  | string  | Hasło (zahashowane) |
| email     | string  | Email               |
### Tabela notes
| Pole    | Typ   | Opis              |
|---------|-------|-------------------|
| id      | int   | Klucz główny      |
| userID  | int   | Klucz obcy z user |
| tite    | string| Tytuł notatki     |
| note    | text  | Treść notatki     |

## Backend:
* endpointy do autentykacji:
  - POST /auth
    * w body dostaje login i hasło
    * zwraca token autoryzacyjny
  - POST /register
    * tworzy nowego użytkownika
    * hashuje hasło
    * w body dostaje 
* endpointy do notatek
  - GET /notes?user={id}
    * lista notatek z całą zawartością
  - POST /notes?user={id}
    * tworzenie notatki - tworzy nową notatkę
    * w body nic nie dostaje związanego z notatką
    * zwraca id notatki, tytuł i jej zawartość
  - PUT /notes?user={id}&noteID{id}
    * edycja notatki id
    * w body dostaje całą zawartość notatki
  - DELETE /notes?user={id}&noteID{id}
    * usunięcie notatki id

## Frontend:
* strona powitalna
  - proponuje logowanie lub rejestrację
* strony do autentykacji:
  - logowanie
  - rejestracja
    * sprawdza podczas rejestracji masz pod
* strona dashboard z notatkami:
  - navbar
  - notelist
  - noteblock
* strona z profilem
* strina z ustawieniami