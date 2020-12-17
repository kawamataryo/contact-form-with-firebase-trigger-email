# Contact Form with Firebase Trigger Email 

Sample for Contact form with Firebase Trigger Email.

![](https://i.gyazo.com/a274433266ca1167458090181c00d799.png)

## Project setup
Install dependencies.
```
yarn
cd functions & npm install
```

Set firebase project

```
npm i -g firebase-tools
firebase use YOUR_PROJECT_NAME
```

Set enviroment variables.
```
cp .env.sample .env
# set firebase enviroment variables to .env
```

Set admin email address.
```
firebase functions:config:set mail.admin_address="example@example.com"
```


## deploy

Deploy to Firebase.
```
# in functions/
npm run deploy 
```

