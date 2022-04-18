const express = require('express');
const app = express();
const port = 2323;
app.get('/', (req, res) => res.send('EasyMusic est co!'));

app.listen(port, () => console.log(`EasyMusic écoute / port : http://localhost:${port}`));