const jwt = require('jsonwebtoken');

const secret = process.env.MINHA_CHAVE_JWT || 'sua_chave_secreta_aqui';
const token1 = jwt.sign({ _id: "user1" }, secret, { expiresIn: '1h' });
console.log("Token para user1:", token1);

const token2 = jwt.sign({ _id: "user2" }, secret, { expiresIn: '1h' });
console.log("Token para user2:", token2);