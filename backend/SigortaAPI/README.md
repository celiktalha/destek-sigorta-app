# Destek Sigorta - Backend

RESTful API backend for Destek Sigorta's Supplementary Health Insurance online sales flow, built with C# and ASP.NET Core. Handles customer records, package/network listing, policy creation, and payment processing.

## Tech Stack

- ASP.NET Core Web API
- Entity Framework Core
- SQL Server (LocalDB)
- Swagger / OpenAPI

## Architecture

The project follows an N-tier layered architecture:

- **Controllers** — handle incoming HTTP requests, delegate business logic to services
- **Services** — contain the actual business logic (e.g. get-or-create customer flow, transactional policy/payment creation)
- **DTOs** — define the exact shape of data exchanged with the frontend, keeping internal database models from being exposed directly
- **Models** — Entity Framework entity classes representing the database tables
- **Data** — `DbContext` and Fluent API configuration for table relationships

## Database Schema

Five main tables:

- `Musteri` (Customer) — MusteriNo (PK), Ad, Soyad, DogumTarih, CepTel, Email
- `Police` (Policy) — PoliceNo (PK), SigortaNo (FK), SigEttirenNo (FK), Bedel, BasTarih, BitTarih, TeklifDurum, BeyanOnay
- `Teminat` (Package) — TeminatKod (PK), TeminatAd, TeminatBedeli, Pirim, NetworkKod, PaketTipi
- `PoliceTeminat` — composite PK (PoliceNo + TeminatKod), links a policy to its chosen package
- `Odeme` (Payment) — OdemeId (PK), PoliceNo (FK), MusteriNo (FK), KartNo, KulTarih, CVC, TaksitSayisi

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/Musteri/{musteriNo}` | Look up a customer by ID |
| POST | `/api/Musteri` | Create a new customer |
| POST | `/api/Musteri/Giris` | Get-or-create: returns the existing customer if found, otherwise creates one |
| GET | `/api/Teminat/{networkKod}` | List packages for a given network (TURKUAZ / TURUNCU / KIRMIZI) |
| POST | `/api/Police` | Create a policy (rejects if health declaration isn't confirmed) |
| POST | `/api/Odeme` | Process a payment for an existing policy, marks the policy as active |


## Setup & Running

1. Install the [.NET SDK](https://dotnet.microsoft.com/) and SQL Server (or LocalDB)
2. Navigate to the `backend` folder in a terminal
3. If the `dotnet-ef` tool isn't already installed:
```bash
   dotnet tool install --global dotnet-ef
```
4. Update the connection string in `appsettings.json` if needed
5. Apply migrations to create the database:
```bash
   dotnet ef database update
```
6. Run the API:
```bash
   dotnet run
```
7. Open the Swagger UI at the URL shown in the terminal (usually `http://localhost:5238/swagger`)

**Note:** The frontend must also be running separately — see the frontend folder's README.


## Notes

- Prices and policy dates are always calculated server-side, never trusted from client input.
- Policy and payment creation both use database transactions to ensure related records stay consistent if something fails midway.
- There's no real SMS/OTP service — that verification step is simulated entirely on the frontend.