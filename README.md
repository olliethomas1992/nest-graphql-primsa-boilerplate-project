# NestJs - GraphQl- Prisma - Boilerplate Project

## Development

Before you start make sure you have Node, NPM and Docker Installed

### Install Packages

```bash
npm install
```

### Change boilerplate text

Change texts (e.g passwords) in the following files:

```bash
config/development.env
config/production.env
prisma/docker-compose.yml
```

Add lines to .gitignore:

```bash
config
```

### Run the local docker container

```bash
cd prisma
docker-compose up -d
```

### Deploy the Prisma data model

```bash
prisma deploy -e ../config/development.env
```

## Deploy to Production

### Create Server

Create a new server at https://app.prisma.io

This includes creating a new database on Heroku.

After this you should have a new DB and Server, both on Heroku but accessible via Prisma.io.

### Create New Service

Create a new temp folder. Then run prisma init. Select to create a new service on the server you just created.
Set a name for your service as well as the name for your stage (e.g prod).
Select don't generate for prisma client language generation.

```bash
mkdir prisma-prod
cd prisma-prod
prisma init
```

### Copy the service info into the existing setup.

One of the newly created files is:

```bash
prisma.yml
```

Copy the value of endpoint (e.g https://some-project-name.herokuapp.com/project-name/stage) to
the value of PRISMA_ENDPOINT in config/production.env

### Remove the temp folder we created

```bash
cd ..
rm -Rf ./prisma-prod
```

### Deploy Prisma Production

Deploy to the production version of your prisma project:

```bash
cd prisma
prisma deploy -e ../config/production.env
```

## Running the app

```bash
# development
npm run dev

# production mode
npm run build
npm run start:prod
```
