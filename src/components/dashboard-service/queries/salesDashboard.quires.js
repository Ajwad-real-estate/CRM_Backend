export const salesQueries = {
  target: `
    SELECT a.target 
    FROM agent a 
    WHERE a.id = $1 AND a.manager_id = $2
  `,

  followUp: `
    SELECT COUNT(*) 
    FROM action a 
    JOIN agent b ON a.agent_id = b.id 
    WHERE a.agent_id = $1 AND a.type_id = 1 AND b.manager_id = $2
  `,

  meeting: `
    SELECT COUNT(*) 
    FROM action a 
    JOIN agent b ON a.agent_id = b.id 
    WHERE a.agent_id = $1 AND a.type_id = 2 AND b.manager_id = $2
  `,

  followMeet: `
    SELECT COUNT(*) 
    FROM action a 
    JOIN agent b ON a.agent_id = b.id 
    WHERE a.agent_id = $1 AND a.type_id = 3 AND b.manager_id = $2
  `,

  email: `
    SELECT COUNT(*) 
    FROM action a 
    JOIN agent b ON a.agent_id = b.id 
    WHERE a.agent_id = $1 AND a.type_id = 4 AND b.manager_id = $2
  `,

  newClients: `
    SELECT COUNT(*) 
    FROM client c 
    JOIN agent a ON c.agent_id = a.id 
    WHERE c.agent_id = $1 AND c.status_id = 1 AND a.manager_id = $2
  `,

  qualifiedClients: `
    SELECT COUNT(*) 
    FROM client c 
    JOIN agent a ON c.agent_id = a.id 
    WHERE c.agent_id = $1 AND c.status_id = 2 AND a.manager_id = $2
  `,

  reservedClients: `
    SELECT COUNT(*) 
    FROM client c 
    JOIN agent a ON c.agent_id = a.id 
    WHERE c.agent_id = $1 AND c.status_id = 3 AND a.manager_id = $2
  `,

  doneClients: `
    SELECT COUNT(*) 
    FROM client c 
    JOIN agent a ON c.agent_id = a.id 
    WHERE c.agent_id = $1 AND c.status_id = 4 AND a.manager_id = $2
  `,
};
