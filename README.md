# Next.js Boilerplate with ShadCN, Prisma, and NextAuth

Welcome to the Next.js boilerplate! This template comes pre-configured with ShadCN, Prisma, and NextAuth, making it easier to kickstart your web development projects. Follow the steps below to get started.

## Features

- **Next.js**: The React framework for building modern web applications.
- **ShadCN**: A versatile set of UI components.
- **Prisma**: A powerful ORM to handle your database operations.
- **NextAuth**: Authentication solution for your Next.js apps.

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:anshux1/next-boilerplate.git
   
2. Navigate to the project directory:
    
   ```bash
   cd next-boilerplate
   
3. Set up your environment variables:
   
   Create a .env file in the root of the project with the following variables:
   ```bash 
   DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase?schema=public"
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000

4. Install the dependencies:
    ```bash
    pnpm install

5. Migrate the Database

    To migrate the database, execute the following command:
    ```bash
    pnpm migrate <migration_name>

6. Running the App

   To start the app locally, run the following command:
    ```bash
    pnpm dev

This will start the development server on http://localhost:3000.
