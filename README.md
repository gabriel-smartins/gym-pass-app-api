# 🏋️ Gym Pass App

A **Gym Pass App** is a backend API designed to manage gyms, users, and check-ins, focusing on clean architecture, good development practices, and automated testing.  
This project was built with **Node.js**, **TypeScript**, and uses **PostgreSQL** (via Docker) as the database.

---

## 🚀 Tech Stack

- **Node.js** + **TypeScript** → Application core.
- **Fastify** → Fast and low-overhead HTTP framework.
- **PostgreSQL** → Relational database (runs in Docker).
- **Prisma ORM** → Database migrations and data manipulation.
- **Vitest** → Unit and end-to-end testing.
- **Supertest** → HTTP endpoint testing.
- **Docker & Docker Compose** → Simplified local database setup.
- **GitHub Actions** → CI/CD pipeline for running tests automatically.

---

## 📋 Requirements

### ✅ Functional Requirements (FRs)

- [x] Users must be able to register.
- [x] Users must be able to authenticate.
- [x] Users must be able to view their profile (when authenticated).
- [x] Users must be able to see the total number of check-ins they have made.
- [x] Users must be able to retrieve their check-in history.
- [x] Users must be able to search gyms nearby (within 10km).
- [x] Users must be able to search gyms by name.
- [x] Users must be able to perform a check-in at a gym.
- [x] Users must be able to validate a check-in.
- [x] Admins must be able to register gyms.

### 🔒 Business Rules (BRs)

- [x] A user cannot register with a duplicate e-mail.
- [x] A user cannot check in more than once per day.
- [x] A user can only check in if they are within 100m of the gym.
- [x] A check-in can only be validated within 20 minutes of creation.
- [x] Only admins can validate check-ins.
- [x] Only admins can register gyms.

### ⚙️ Non-Functional Requirements (NFRs)

- [x] User passwords must be stored encrypted.
- [x] All data must be persisted in a PostgreSQL database.
- [x] All paginated lists must return 20 items per page.
- [x] Users must be identified using a JWT (JSON Web Token).

---

## 🏗️ Architecture

The project follows **Clean Architecture** principles and is structured in layers:

- **Controllers** → Handle HTTP requests and responses.
- **Services** → Contain all the business logic.
- **Repositories** → Data access layer implementing the **Repository Pattern**.
- **Factories** → Responsible for instantiating services (Dependency Injection).

---

## ✅ Best Practices

- **Repository & Factory Patterns** → Improve testability and maintainability.
- **Separation of Concerns** → Clear division between controllers, services, and repositories.
- **Automated Tests** →  
  - **Unit tests** run on every `push`.
  - **E2E tests** run on every `pull request`.
- **CI/CD** → Configured with **GitHub Actions** in `.github/workflows` to ensure code quality.
- **Environment Variables** → Configuration via `.env` for easy portability.

---

## 📌 Requirements

- Node.js >= 18
- Docker and Docker Compose
- PostgreSQL (if running outside Docker)

---

## 🐳 Docker Setup
  ```bash
  docker-compose up -d

---
## 🧪 Testing

The project includes **unit tests** (isolated functions) and **E2E tests** (full request/response flow).

```bash
# Run all tests
npm run test

# Run only unit tests
npm run test:watch

# Run only E2E tests
npm run test:e2e
