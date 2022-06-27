const watchedAtMiddleware = (req, res, next) => {
  const { talk } = req.body;
  const validDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!validDate.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  return next();
};

module.exports = watchedAtMiddleware;
