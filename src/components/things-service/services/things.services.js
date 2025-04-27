// services/things/city.service.js
import * as dbHelper from "../utils/helpers/things.utils.helper.js";
import { queries } from "../utils/quires/things.utils.quires.js";

export const getAllCities = async () => {
    return await dbHelper.executeQuery(queries.city.getAll);
};

// services/things/status.service.js
export const getAgentStatuses = async () => {
    return await dbHelper.executeQuery(queries.status.getAgentStatuses);
};

// services/things/taskStatus.service.js
export const getTaskStatuses = async () => {
    return await dbHelper.executeQuery(queries.status.getTaskStatuses);
};