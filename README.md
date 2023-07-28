
#  Login Auth with Node + PostgreSQL + Docker + Sequelize

###  Setup your .env file

  

In order to properly configure your development environment, it's important to modify certain variables in your configuration file and create a new .env file based on the provided .env.dev file. Follow the steps below to make these changes:

Locate your configuration file: Depending on your project setup, your configuration file may be named different things or located in different places. However, it is usually located in the root of your project directory and named something like config.json.
```
- config
   - config.json
- src
```

**Modify development variables**

```
"development": {
   "username": "yourdatabaseusername",
   "password": "yourdatabasepassword",
   "database": "yourdatabasename",
   "host": "yourdatabasehost",
   "dialect": "postgres"
},
```

  

- Create a new .env file: In the root of your project directory, create a new file named .env. This file will contain environment variables that are specific to your development environment.

  

- Copy contents of .env.dev: Open the .env.dev file and copy its contents.

  

- Paste contents into new .env file: Paste the copied contents into the new .env file that you created in previous step.

  

- Check `DockerFile` and `docker-compose.yml` for the environment configs.

  

- Save and use: Save your changes to the .env file and begin using your development environment.

## TODO
- [ ] Routes
  - [x] Check API
  - [x] Login route 
  - [x] Refresh token for login
  - [ ] revoke token for login
  - [ ] Logout route
  - [x] List All Users
- [ ] Create
  - [x] Create New User 
- [ ] Update
- [ ] Delete
  - [x] Delete user


Note: Be sure to keep your .env file secure and never share it publicly, as it may contain sensitive information such as API keys or database credentials.
