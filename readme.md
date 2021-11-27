# MyWallet

## About

This is the backend repo for MyWallet. A financial management app.

### Check out the front-end repo of the app.

[https://github.com/Deltinha/mywallet-front](https://github.com/Deltinha/mywallet-front)

## Technologies

- NodeJS
- ExpressJS
- nodemon
- pg
- dotenv
- cors
- Jest
- supertest
- bcrypt
- uuid
- joi

## Running locally

1. Clone this repo

```sh
git clone https://github.com/Deltinha/mywallet-back.git
```

2. Install NPM packages for the back-end repo

```sh
npm install
```

3. Restore the database using the file `./dump.sql`

4. Create a new file called `.env` in the root folder using `.env-example` as template. Feed the newly created file with the info of your database.

5. Run the app in development mode

```sh
npm run dev
```