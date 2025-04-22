import * as userModel from '../model/userModel.js';

export const handleRegister = async (req, res) => {
  try {
    const manager_id_from_userpayload = req.user.agentId;
    const userData = { ...req.body, manager_id: manager_id_from_userpayload };
    const result = await userModel.registerUser(userData);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const reGemail = async (req, res) => {
  try {
    const { currentEmail, newEmail } = req.body;
    const agentId = req.user.agentId;
    const result = await userModel.updateEmail(agentId, currentEmail, newEmail);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const reGemailById = async (req, res) => {
  try {
    const { newEmail } = req.body;
    const agentId = req.params.id;
    const result = await userModel.updateEmailById(agentId, newEmail);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const rePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const agentId = req.user.agentId;
    const result = await userModel.updatePassword(agentId, email, newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const rePasswordById = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const agentId = req.params.id;
    const result = await userModel.updatePasswordById(agentId, newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};