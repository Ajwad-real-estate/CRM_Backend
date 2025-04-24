import Joi from 'joi';

const taskSchema = Joi.object({
  title: Joi.string().required().max(100),
  detail: Joi.string().allow('').max(500),
  status_id: Joi.number().integer().min(1).max(5),
  priority_id: Joi.number().integer().min(1).max(3),
  date: Joi.date().required(),
  time: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
});

export const validateTaskData = async (data, isUpdate = false) => {
  const schema = isUpdate 
    ? taskSchema.fork(Object.keys(taskSchema.describe().keys), (schema) => schema.optional())
    : taskSchema;
    
  try {
    await schema.validateAsync(data);
  } catch (error) {
    error.status = 400;
    throw error;
  }
};