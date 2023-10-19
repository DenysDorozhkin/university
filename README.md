# University application

This application was created in the S-pro Academy Full Stack Course.
The following technologies were used:
Typescript, Nest.js, PostgreSQL, TypeORM, Docker, Swagger, React, Redux.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.
Install Node and Docker if you do not have it already installed.
You will also need your smtp (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD) for the application to work.

### Usage

Clone the repository

```
git clone https://github.com/DenysDorozhkin/university.git
```

Back
(create (in the `back` folder) and fill (according to `.env.example`) the `.env` file)

```
cd back
docker-compose up
```

Front
(create (in the `front` folder) and fill (according to `.env.example`) the `.env` file)

```
cd front
npm i
npm run start
```

Now the application is ready! Enjoy using it! :)
