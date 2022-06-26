const express = require('express');
const bodyParser = require('body-parser');

const readFIle = require('./helpers/readFile.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('Hello world');
});

app.get('/talker', async (req, res) => {
  try {
    const talkersList = await readFIle();
    console.log(talkersList);
    res.status(200).json(talkersList);
  } catch (error) {
    console.log(error);
  }
})

app.listen(PORT, () => {
  console.log('Online');
});
