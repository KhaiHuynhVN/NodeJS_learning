const express = require('express');
const app = express();
const port = 3123;

app.get('/', (req, res) => {
   const a = 'Khai Huynh';
   const b = 'Ngan Le';

   const c = a + ' ' + b;

   return res.send('<h1>Hello World</h1>');
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
