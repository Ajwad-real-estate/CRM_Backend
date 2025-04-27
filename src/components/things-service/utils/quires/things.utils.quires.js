
// utils/queries.js
export const queries = {
    city: {
        getAll: `
            SELECT id, name
            FROM city
            ORDER BY name ASC;
        `
    },
    status: {
        getAgentStatuses: `
            SELECT id, name
            FROM agent_status;
        `,
        getTaskStatuses: `
            SELECT id, name
            FROM task_status;
        `
    }
};