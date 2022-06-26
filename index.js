const express = require('express');
const bodyParser = require('body-parser');
const { randomUUID } = require('crypto');

const readFIle = require('./helpers/readFile.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('Hello world');
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const talkersList = await readFIle();
    const filterTalker = talkersList.filter((talker) => talker.id === Number(id));

    if (filterTalker.length === 0) {
      res.status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(200).json(filterTalker[0]);
  } catch (error) {
    console.log(error);
  }
});

app.get('/talker', async (_req, res) => {
  try {
    const talkersList = await readFIle();
    res.status(200).json(talkersList);
  } catch (error) {
    console.log(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    // const { email, password } = req.body;
    const token = randomUUID().split('-').join('').substring(0, 16);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
