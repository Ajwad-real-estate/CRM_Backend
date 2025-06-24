import { authorizeUser } from './authorizeUser.js';

export const authorizeManager = async (req, res, next) => {
  try {
    await authorizeUser(req, res, () => {
      if (req.user.roleId !== 2) {
        return res.sendStatus(403);
      }
      
      next();
    });
  } catch (error) {
    res.sendStatus(403);
  }
};