"use strict";
const express = require("express");
const _port = 3000;
const _app_folder = 'www';
const app = express();
// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, { maxAge: '1y' }));
app.use(`/*`, express.static(_app_folder, { maxAge: '1y' }));

app.listen(_port, () => console.log('Successful run at '+_port));
