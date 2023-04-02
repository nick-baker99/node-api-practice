const User = require('../model/User');

const handleLogout = async (req, res) => {
  // on client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // success, no content back

  const refreshToken = cookies.jwt;

  // is refresh token in DB?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: true, secure: true });
    return res.sendStatus(204);
  }
  
  // delete refresh token from DB
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie('jwt', { httpOnly: true, sameSite: true, secure: true });
  res.sendStatus(204);
}

module.exports = { handleLogout };