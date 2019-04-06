# GeoTrend
Project #2

## Usage
GeoTrend can be used with a local server and MySQL server or can be run on a heroku instance with a supported mysql add-on (currently JAWSDB).
### Local Development

**Dependencies**
- nodejs
- mysql server

**Installation**

```git clone http://github.com/alextyk/GeoTrend```

```cd GeoTrend```

**Creating the database and seeding it with data**
```
mysql -u username -pPassword >> models/schema.sql
mysql -u username -pPassword >> models/seed.sql
```

### Heroku 
This app can be deployed on Heroku using the free tier along with the MySQL database addon.
This app currently supports the JAWSDB Heroku add-on but the other backends are easily added by configuring your .env file.

Deployment is done using TravisCI. You will need to create an app using the heroku website or cli tool. After authorizing the cli tool you can add your heroku encrypted key to your .travis.yml file with this command:
```travis encrypt $(heroku auth:token) --add deploy.api_key```

Be sure to change the app name in the  ```.travis.yml``` file to your heroku app name.


## Deployment to Heroku

In order to deploy to Heroku you will need to create a heroku app with the JawsDB add-on.
Once you have received your JAWSDB_URL string, add a line to your .env file in the root