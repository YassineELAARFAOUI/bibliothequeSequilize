const express = require('express');
const livreRoutes = require('./routes/livreRoutes');
const auteurRoutes = require('./routes/auteurRoutes');
const app = express();

app.use(express.json());  // Middleware for parsing JSON bodies

const port = 3000;

// Use the livreRoutes for '/apilivre' and auteurRoutes for '/apiauteur'
app.use('/apilivre', livreRoutes);
app.use('/apiauteur', auteurRoutes);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
