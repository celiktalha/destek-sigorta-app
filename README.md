# Destek Sigorta

Destek Sigorta is a full-stack supplementary health insurance quoting and sales system, built as a reference to how online insurance sales flows work in practice. The entire flow — from entering personal information, choosing a health network and package, reviewing and confirming the policy summary, to completing payment and having the policy actually created — runs against a real database from end to end.

This project was built to explore how the digital sales flow of an insurance product (customer registration, plan/package selection, confirmation steps, payment processing) can be designed and implemented from scratch, writing both the backend and the frontend myself.


## Project Structure

The project consists of two main folders:

- **`frontend/`** — the user interface, built with React. See [frontend/README.md](./frontend/README.md) for details.
- **`backend/`** — the API and database layer, built with C# / ASP.NET Core. See [backend/SigortaAPI/README.md](./backend/README.md) for details.

Each folder's README covers the technical details specific to that layer (architecture, endpoints, database schema, setup steps).


## Overall Architecture

The frontend communicates with the backend over HTTP requests. The backend follows a layered architecture (Controller → Service → DTO) and stores data in a SQL Server database. Critical operations (policy creation, payment processing) are wrapped in database transactions, so related records stay consistent if a step fails midway.


## Running the Project

To get the whole project running from start to finish:

1. **Start the backend** — follow the steps in the backend folder's README to set up the database and run the API
2. **Start the frontend** — follow the steps in the frontend folder's README to run the development server
3. Open the frontend's address in your browser (`http://localhost:5173`)

Both need to be running at the same time.


## Notes

- Some information, such as the affiliated institutions list, treatment detail tables, and installment rates, is filled with static (mock) data since the backend has no equivalent for it — this project is a learning-focused portfolio project, not a real production system.