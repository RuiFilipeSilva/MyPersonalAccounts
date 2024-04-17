const jwt = require('jsonwebtoken');

exports.generateTokens = (user) => {
    console.log("Criar Tokens");
    const accessToken = jwt.sign({ data: user }, process.env.SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ data: user }, process.env.REFRESH_SECRET, { expiresIn: '1w' });
    return { accessToken, refreshToken };
  }