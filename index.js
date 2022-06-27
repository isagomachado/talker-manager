const express = require('express');
const bodyParser = require('body-parser');

const readFIle = require('./helpers/readFile.js');
const writeFile = require('./helpers/writeFile');
const generateToken = require('./helpers/generateToken');
const loginMiddleware = require('./middlewares/loginMiddleware');
const tokenMiddleware = require('./middlewares/tokenMiddleware');
const nameMiddleware = require('./middlewares/nameMiddleware');
const ageMiddleware = require('./middlewares/ageMiddleware');
const talkMiddleware = require('./middlewares/talkMiddleware');
const watchedAtMiddleware = require('./middlewares/watchedAtMiddleware');
const rateMiddleware = require('./middlewares/rateMiddleware');

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

app.post('/talker',
  tokenMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  watchedAtMiddleware,
  rateMiddleware,
  async (req, res) => {
  try {
    const { name, age, talk } = req.body;
    const talkersList = await readFIle();
    const newTalker = { id: talkersList.length + 1, name, age, talk };
    talkersList.push(newTalker);
    await writeFile(talkersList);
    console.log(talkersList);
    res.status(201).json(newTalker);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/talker/:id', tokenMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const talkersList = await readFIle();
    const talkerIndex = talkersList.findIndex((talker) => talker.id === Number(id));

    talkersList.splice(talkerIndex, 1);

    await writeFile(talkersList);

    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
});

app.put('/talker/:id',
  tokenMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  watchedAtMiddleware,
  rateMiddleware,
  async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkersList = await readFIle();

    const talkerIndex = talkersList.findIndex((talker) => talker.id === Number(id));

    talkersList[talkerIndex] = { ...talkersList[talkerIndex], name, age, talk };

    await writeFile(talkersList);

    res.status(200).json(talkersList[talkerIndex]);
  } catch (error) {
    console.log(error);
  }
});

app.post('/login', loginMiddleware, async (_req, res) => {
  try {
    const token = generateToken(16);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
