// Lógica da função inspirada nesse link -> https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/

function generateToken(size) {
  let token = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < size; i += 1) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

module.exports = generateToken;
