// const http = require('http');

// const hostname = '127.0.0.1'; //ip address, 4 bytes, 0-255. represent this computer.
// const port = 3000; //register os

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('You ask for ' + req.url);
//   // res.write("Going");
//   // for(let index=0; index < 30; index++){
//   //   res.write(".");
//   //   const seconds = 0.5;
//   //   var waitTill = new Date(new Date().getTime() + seconds + 500);
//   //   while(waitTill > new Date());
//   // }
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// const express = require('express');
// const path = require('path');
// require('dotenv').config();

// console.log(`The best class at New Paltz is ${process.env.BEST_CLASS}`);

// const usersController = require('./controllers/users');
// const postsController = require('./controllers/posts');

// const app = express()
// const port = process.env.PORT || 3000

// app
//   // .get('*',(req, res, next) => {
//   //   console.log('A request came in');
//   //   next();
//   // })
//   // .get('/', (req, res) => {
//   //   res.send('Hello World!')
//   // })
//   // .get('/newpaltz',(req, res) => {
//   //   res.send("Hello New Paltz!")
//   // })

//   .use('/', express.static(path.join(__dirname, '../docs')))
//   .use('/users',usersController)
//   .use('/posts', postsController)

// app
//   .get('*', (req,res) => {
//     res.sendFile(path.join(__dirname, '../docs/index.html'))
//   })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

const express = require('express');
const path = require('path');
require('dotenv').config();

console.log(`The best class at New Paltz is ${process.env.BEST_CLASS}`);

const usersController = require('./controllers/users');
const postsController = require('./controllers/posts');

const app = express()
const port = process.env.PORT || 3000;

app
    .use('/', express.static(path.join(__dirname, '../docs')) )

    /*
        Access-Control-Allow-Origin: https://foo.example
        Access-Control-Allow-Methods: POST, GET, OPTIONS
        Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
    */

    .use( (req, res, next) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        next();
    } )

    .use(express.json())
    .use('/users', usersController )
    .use('/posts', postsController)

app
    .get('*', (req, res) => res.sendFile(path.join(__dirname, '../docs/index.html')) )

app
    .use((err, req, res, next)=>{
        // Besides for sending the error to the client. It is helpful to write it to the terminal/console.
        // More information can be serialized to the console than can be serialized to JSON for transfer over the wire.
        // Eventually you may want to add logic to prevent sensitive information from being sent to the client and to reformat the error message to make it more user friendly
        console.error(err);
        res.status(err.code || 500).send(err);
    })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})