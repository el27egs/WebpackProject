
const express = require ('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const options = webpack(webpackConfig);

const app = express();
app.use(webpackMiddleware(options));
app.use(webpackHotMiddleware(options));

app.listen(3050, () => console.log('listening'));

app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, "index.html"));
});
