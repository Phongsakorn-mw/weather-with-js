const express = require('express');
const app = express();

const PORT = 3333;

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
