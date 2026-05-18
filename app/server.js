const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'app', 'public')));
app.use(express.static(path.join(__dirname, 'app', 'views')));