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
  - POST /login
    * w body dostaje login i hasło
    * zwraca token autoryzacyjny
  - POST /register
    * tworzy nowego użytkownika
    * hashuje hasło
    * w body dostaje nazwę użytkownika, email oraz hasło
* endpointy do notatek
  - GET /notes?user={id}
    * zwraca listę notatek z całą zawartością
  - POST /notes?user={id}
    * tworzenie notatki - tworzy nową notatkę
    * w body dostaje tytuł notatki
    * zwraca id notatki, tytuł i sztywno tworzoną nową zawartość
  - PUT /notes?user={id}&noteID{id}
    * edycja notatki id
    * w body dostaje całą zawartość notatki
  - PATCH /notes?user={id}&noteID{id}
    * zmienia jedynie nazwę notatki
    * w body dostaje nowy tytuł notatki
  - DELETE /notes?user={id}&noteID{id}
    * usunięcie notatki o podanym w parametrach id

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