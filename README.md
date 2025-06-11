# Backend

This is the backend service, a starter kit designed for building multi-company management systems. Built with Node.js, TypeScript, Fastify, and PostgreSQL, this backend provides a solid foundation for applications that need to handle multiple companies, user roles, and invitation-based access control.

## 🚀 Technologies

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/) - High-performance web framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Docker](https://www.docker.com/) - Containerization
- [JWT](https://jwt.io/) - Authentication
- [Zod](https://zod.dev/) - Schema validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- Docker and Docker Compose
- npm or yarn

## 🔧 Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://main:main@localhost:5432/main"
JWT_SECRET="your-secret-key"
```

## 🐳 Running with Docker

The application uses Docker Compose to run the PostgreSQL database. To start the database:

```bash
docker-compose up -d
```

## 🚀 Development

To start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:3333` with hot-reload enabled.

## 📁 Project Structure

```
backend/
├── src/              # Source code
├── prisma/           # Database schema and migrations
├── docker-compose.yml # Docker configuration
├── package.json      # Project dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## 📋 About the Project

A starter kit that provides essential features for building multi-company applications:

- **Multi-company Support**: Built-in structure for managing multiple companies/organizations
- **Invitation System**: Ready-to-use invitation flow for adding new users to companies
- **Role-based Access**: Flexible permission system for different user roles within companies
- **Company Management**: Tools for managing company profiles, settings, and members
- **API-First Design**: Modern RESTful API architecture for easy frontend integration

This starter kit is perfect for developers who want to build applications that need to:
- Handle multiple companies/organizations
- Manage user invitations and access control
- Implement role-based permissions
- Scale with growing user and company bases

The backend service provides all the necessary infrastructure and business logic to get started quickly with these features.

The backend service handles core business logic, data persistence, and integration with external systems, while maintaining high performance and security standards. 
