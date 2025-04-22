import * as authModel from '../utils/authUtils';

export const handleLogin = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const result = await authModel.loginUser(identifier, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const handleLogout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await authModel.logoutUser(refreshToken);
    res.sendStatus(204);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const handleToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await authModel.refreshToken(refreshToken);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};