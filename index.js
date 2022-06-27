const express = require('express');
const bodyParser = require('body-parser');

const readFIle = require('./helpers/readFile.js');
const generateToken = require('./helpers/generateToken');
const loginMiddleware = require('./middlewares/loginMiddleware');

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

app.post('/login', loginMiddleware, async (req, res) => {
  try {
    const token = generateToken(16);
    console.log(token.length);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
