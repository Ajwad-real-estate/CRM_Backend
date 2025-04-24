export const agentQueries = {
    target: 'SELECT target FROM agent WHERE id = $1;',
    followUp: 'SELECT COUNT(*) FROM action WHERE agent_id = $1 AND type_id = 1;',
    meeting: 'SELECT COUNT(*) FROM action WHERE agent_id = $1 AND type_id = 2;',
    followMeet: 'SELECT COUNT(*) FROM action WHERE agent_id = $1 AND type_id = 3;',
    email: 'SELECT COUNT(*) FROM action WHERE agent_id = $1 AND type_id = 4;',
    newClients: 'SELECT COUNT(*) FROM client WHERE agent_id = $1 AND status_id = 1;',
    qualifiedClients: 'SELECT COUNT(*) FROM client WHERE agent_id = $1 AND status_id = 2;',
    reservedClients: 'SELECT COUNT(*) FROM client WHERE agent_id = $1 AND status_id = 3;',
    doneClients: 'SELECT COUNT(*) FROM client WHERE agent_id = $1 AND status_id = 4;',
  };
  
  export const managerQueries = {
    target: 'SELECT target FROM agent WHERE id = $1;',
    followUp: 'SELECT COUNT(*) FROM action WHERE type_id = 1;',
    meeting: 'SELECT COUNT(*) FROM action WHERE type_id = 2;',
    followMeet: 'SELECT COUNT(*) FROM action WHERE type_id = 3;',
    email: 'SELECT COUNT(*) FROM action WHERE type_id = 4;',
    newClients: 'SELECT COUNT(*) FROM client WHERE agent_id IS NULL AND status_id = 1;',
    newAssignedClients: 'SELECT COUNT(*) FROM client WHERE agent_id IS NOT NULL AND status_id = 1;',
    qualifiedClients: 'SELECT COUNT(*) FROM client WHERE status_id = 2;',
    reservedClients: 'SELECT COUNT(*) FROM client WHERE status_id = 3;',
    doneClients: 'SELECT COUNT(*) FROM client WHERE status_id = 4;',
  };