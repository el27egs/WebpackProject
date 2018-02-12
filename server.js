const path = require('path');
const express = require ('express');


const app = express();


//IMPORTANT: Server routes here, before all webpack configuration
app.get('hello', (req, res) => res.send({hi: 'there'}));

console.log('process.env.NODE_ENV = ', process.env.NODE_ENV );

/*
In production we don't set NODE_ENV, in production Server
use NODE_ENV=production node server.js or whatever that server
indicates.
*/
if (process.env.NODE_ENV !== 'production'){
  console.log('Serving from middleware....');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  const options = webpack(webpackConfig);

  app.use(webpackMiddleware(options));
  app.use(webpackHotMiddleware(options));

}else{
  console.log('Serving from statis directory....');
  /*
  This line is to make public and no restrictions to serve
  any file into dist directory to the client
  */
  app.use(express.static('dist'));

  /*
  This line serve the correct indx.html and it's compatible with
   React Router and its history component.
  */
  app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

}

/*
In production we don't set NODE_PORT, in production Server
use this in place or whatever port set by server provider,
else use 3050 port
*/
app.listen(process.env.PORT || 3050, () => console.log('Listening'));
