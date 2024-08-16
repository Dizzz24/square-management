const express = require('express');
const cors = require('cors');
const router = require('./routes');
const errorHandle = require('./middlewares/errorHandle');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Run Brody!!!");
});

app.use(router);

app.use(errorHandle);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
