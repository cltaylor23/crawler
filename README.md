# Crawler
Simple app to scrape links from a user defined URL.

Consists of a basic backend and frontend each in their own directories.

Most of the work is happening in `crawler-backend/server.js` and `crawler-frontend/src/App.vue`.

## Dependencies
Make sure you have node/npm installed on your system.


## Start Crawler Backend
In a terminal window navigate to the crawler-backend directory
```
cd crawler-backend
```

Install backend dependencies
```
npm install
```

Start backend server (with nodemon)
```
npm run dev
```
or (without nodemon)
```
npm run start
```

## Start Crawler Frontend
In a seperate terminal window or tab navigate to the crawler-frontend directory
```
cd crawler-frontend
```

Install frontend dependencies
```
npm install
```

Start frontend dev server
```
npm run dev
```
In your browser you can now navigate to http://localhost:3000/ and use the app