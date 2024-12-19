import { verifyAccessToken } from "../utils/authUtils.js";
import authorizeUser from "./authorizeUser.js";


const authorizeManager = async (req, res, next) => {
  console.log("authorizeManager")
  try {
    await authorizeUser(req, res, async () => {
      // Check if the user's role is 'manager'
      if (req.user.roleId !== 2) {
        return res.sendStatus(403); // Forbidden
      }
      next();
    });
  } catch (error) {
    res.sendStatus(403);
  }
};

export default authorizeManager;
