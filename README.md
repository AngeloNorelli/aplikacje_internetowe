# Dokumentacja projektu: Aplikacja do zarządzania notatkami

## 1. Identyfikacja zagadnienia biznesowego
Aplikacja internetowa do zarządzania notatkami powstała z myślą o użytkownikach, którzy potrzebują prostego, dostępnego z każdego miejsca narzędzia do przechowywania, edycji i organizowania własnych notatek. 

Odbiorcą są osoby indywidualne, które chcą mieć szybki dostęp do swoich zapisków, bezpieczne logowanie oraz możliwość personalizacji interfejsu. 

Projekt rozwiązuje problem rozproszenia informacji i braku centralnego miejsca do zarządzania notatkami. Aplikacja realizuje pełny cykl zarządzania notatkami: rejestrację/logowanie, tworzenie, edycję, usuwanie oraz personalizację ustawień użytkownika.

## 2. Wymagania systemowe i funkcjonalne
### Wymagania Systemowe:
- Node.js 18+
- MySQL 8+
- Przeglądarkę internetową (Chrome, Firefox, Edge...)

### Wymagania funkcjonalne
- Rejestracja i logowanie użytkownika (autoryzacja JWT)
- Tworzenie, edycja, usuwanie i przeglądanie notatek
- Edycja profilu użytkownika (email, login, hasło)
- Personalizacja ustawień (motyw, język, rozmiar czcionki)
- Bezpieczne przechowywanie haseł (hashowanie)
- Obsługa wielu użytkowników

### Wymagania techniczne
- Backend: Node.js + Express, JWT, MySQL
- Frontend: React, Bootstrap, Context API
- Komunikacja przez REST API
- Utrwalanie danych w relacyjnej bazie MySQL

### Model architektury
- Architektura klient-serwer (frontend React, backend Express)
- JWT do autoryzacji i identyfikacji użytkownika
- Baza danych MySQL do przechowywania użytkowników i notatek

## 3. Analiza zagadnienia i jego modelowanie
### Diagram ERD (związków encji):
```
User (id, username, email, password)
  |
  | 1..*
  |
Note (id, userID, title, note)
```

### Definicje encji i atrybutów
- User

  | Pole      | Typ     | Opis                |
  |-----------|---------|---------------------|
  | id        | int     | Klucz główny        |
  | username  | string  | Nazwa użytkownika   |
  | password  | string  | Hasło (zahashowane) |
  | email     | string  | Email               |

- Notes

  | Pole    | Typ   | Opis              |
  |---------|-------|-------------------|
  | id      | int   | Klucz główny      |
  | userID  | int   | Klucz obcy z user |
  | tite    | string| Tytuł notatki     |
  | note    | text  | Treść notatki     |

### Przykładowy diagram klas (pseudo UML):
```
+-------------+        +-------------+
|    User     |        |    Note     |
+-------------+        +-------------+
| - id        |<>-----<| - id        |
| - username  |        | - userID    |
| - email     |        | - title     |
| - password  |        | - note      |
+-------------+        +-------------+
```

### Przepływ danych:
1. Użytkownik rejestruje się → backend tworzy w bazie danych użytkowniak → frontend każe się zalogować
2. Użytkownik loguje się → backend generuje JWT → frontend zapisuje token
3. Użytkwonik tworzy/edytuje notatkę → frontend wysyła żądanie z JWT → backend weryfikuje token i wykonuje operacje na bazie
4. Użytkownik zmienia ustawienia → frontend zapisuje preferencje lokalnie lub wysyła backend (zmiana hasła etc.)

## 4. Implementacja
### Backend (Node.js + Express):
* endpointy do autentykacji:
  - POST `/login`
    * w body dostaje login i hasło
    * zwraca token autoryzacyjny
  - POST `/register`
    * tworzy nowego użytkownika
    * hashuje hasło
    * w body dostaje nazwę użytkownika, email oraz hasło
* endpointy do notatek
  - GET `/notes?user={id}`
    * zwraca listę notatek z całą zawartością
  - POST `/notes?user={id}`
    * tworzenie notatki - tworzy nową notatkę
    * w body dostaje tytuł notatki
    * zwraca id notatki, tytuł i sztywno tworzoną nową zawartość
  - PUT `/notes?user={id}&noteID{id}`
    * edycja notatki id
    * w body dostaje całą zawartość notatki
  - PATCH `/notes?user={id}&noteID{id}`
    * zmienia jedynie nazwę notatki
    * w body dostaje nowy tytuł notatki
  - DELETE `/notes?user={id}&noteID{id}`
    * usunięcie notatki o podanym w parametrach id
* endpointy do użytkownika:
  - GET `/profile?user={id}`
    * zwraca login, email, hasło użytkownika na strone profilu po userID
  - PATCH `/profile/update?user={id}`
    * aktualizuje dane użytkownika: loginu, emaila, hasła użytkownika 
    * odsyła nowo wygenerowany token

### Frontend (React):
- Strony:
  - Strona powitalna (opcja logowania/rejestracji)
  - Dashboard z listą notatek i edytorem
  - Strona profilu użytkownika
  - Strona ustawień (motyw, język, czcionka)
- Kluczowe komponenty:
  - Navbar - nawigacja, wyświetla username
  - NotesList - lista notatek
  - NoteBoard - edycja notatke wybranej w NotesList
  - Profile - edycja danych użytkownika
  - Settings - personalizacja interfejsu

## 5. Podsumowanie
Projekt zrealizował założone cele: umożliwia bezpieczne zarządzanie notatkami, personalizację interfejsu oraz obsługę wielu użytkowników. 

Największym wyzwaniem było zapoznanie się z nowym językiem programowania (niektórzy nie mieli w ogóle styczności z type script'em). 

Jeśli chodzi o stricte implementację była obsługa notatek bez wielu zapytań do backendu. Wystarczyło zaciągnąć przy zalogowaniu wszystkich notatek i zapisanie ich lokalnie. Następnie przy edycji wysyłane jest jedynie zmieniona notatka.

Aplikacja może być dalej rozwijana o: współdzielenie notatek, tagowanie, wyszukiwanie pełnotekstowe, powiadomienia czy integrację z chmurą. Można również rozwinąć profil użytkownika o personalizowane zdjęcia profilowe.

**Autor**
Angelo
2025
