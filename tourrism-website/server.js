const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/your-angular-app-name'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/your-angular-app-name/'}),
);

app.listen(process.env.PORT || 8080);
