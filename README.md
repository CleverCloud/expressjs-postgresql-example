# Express.js REST + PostgreSQL + StatsD Example Application on Clever Cloud
[![Clever Cloud - PaaS](https://img.shields.io/badge/Clever%20Cloud-PaaS-orange)](https://clever-cloud.com)

This is a simple Express.js application that demonstrates how to build a CRUD web app backed by PostgreSQL with StatsD metrics, and deploy it to Clever Cloud.

## About the Application

This application is a simple value list where you can add or delete entries. It uses:

- **PostgreSQL** for data persistence
- **StatsD** for tracking metrics (creations, deletions, and a gauge for total values)

### Endpoints

- `GET /` - Renders the main page with all values
- `POST /values` - Create a new value
- `DELETE /values/:id` - Delete a value by ID

## Technology Stack

- [Express.js 5](https://expressjs.com/) - Web framework for Node.js
- [pg](https://node-postgres.com/) - PostgreSQL client for Node.js
- [Pug 3](https://pugjs.org/) - Template engine
- [Bootstrap 5](https://getbootstrap.com/) - Frontend CSS framework
- [hot-shots](https://github.com/brightcove/hot-shots) - StatsD client
- Node.js 24+
- PostgreSQL

## Prerequisites

- Node.js 24+
- npm

## Running the Application Locally

```bash
npm install
npm start
```

The application will be accessible at http://localhost:8080.

> The application requires a running PostgreSQL instance. Set the `POSTGRESQL_ADDON_URI` environment variable to your PostgreSQL connection string.

## Deploying on Clever Cloud

You have two options to deploy your application on Clever Cloud: using the Web Console or using the Clever Tools CLI.

### Option 1: Deploy using the Web Console

#### 1. Create an account on Clever Cloud

If you don't already have an account, go to the [Clever Cloud console](https://console.clever-cloud.com/) and follow the registration instructions.

#### 2. Set up your application on Clever Cloud

1. Log in to the [Clever Cloud console](https://console.clever-cloud.com/)
2. Click on "Create" and select "An application"
3. Choose "Node.js" as the runtime environment
4. Configure your application settings (name, region, etc.)

#### 3. Add a PostgreSQL Add-on

1. In your application's dashboard, go to "Service dependencies"
2. Click "Link add-ons" and select "PostgreSQL"
3. Choose the plan that fits your needs
4. Link the add-on to your application

The `POSTGRESQL_ADDON_URI` environment variable will be automatically set.

#### 4. Deploy Your Application

You can deploy your application using Git:

```bash
# Add Clever Cloud as a remote repository
git remote add clever git+ssh://git@push-par-clevercloud-customers.services.clever-cloud.com/app_<your-app-id>.git

# Push your code to deploy
git push clever master
```

### Option 2: Deploy using Clever Tools CLI

#### 1. Install Clever Tools

Install the Clever Tools CLI following the [official documentation](https://www.clever-cloud.com/doc/clever-tools/getting_started/):

```bash
# Using npm
npm install -g clever-tools

# Or using Homebrew (macOS)
brew install clever-tools
```

#### 2. Log in to your Clever Cloud account

```bash
clever login
```

#### 3. Create a new application

```bash
# Initialize the current directory as a Clever Cloud application
clever create --type node <YOUR_APP_NAME>

# Add a PostgreSQL add-on
clever addon create postgresql-addon <YOUR_ADDON_NAME> --link <YOUR_APP_NAME>
```

#### 4. Deploy your application

```bash
clever deploy
```

#### 5. Open your application in a browser

Once deployed, you can access your application at the URL provided by Clever Cloud.

```bash
clever open
```

### Monitoring Your Application

Once deployed, you can monitor your application through:

- **Web Console**: The Clever Cloud console provides logs, metrics, and other tools to help you manage your application.
- **CLI**: Use `clever logs` to view application logs and `clever status` to check the status of your application.

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [node-postgres Documentation](https://node-postgres.com/)
- [Clever Cloud Node.js Documentation](https://www.clever-cloud.com/developers/doc/applications/nodejs/)
- [Clever Cloud Documentation](https://www.clever-cloud.com/doc/)
