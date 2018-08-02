## Express Webpack Starter Kit

## Stack
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](http://mongoosejs.com/) + Bluebird
- [Webpack](https://webpack.js.org/) for sass
- [Jade/Pug](https://pugjs.org/api/getting-started.html)
- [Passport](http://www.passportjs.org/) for session security
- [Lusca](https://github.com/krakenjs/lusca) for application security
- [Redis](https://redis.io/) for memory cache

## Installation
run ```npm install```

## Serve
First start the Redis and MongoDB using these commands.
```
sudo service mongod start
redis-server &
```

then run ```npm start``` to start server.
see scripts in [package.json](https://github.com/adilxiqbal/express-webpack-starter/blob/master/package.json) for more npm commands 
