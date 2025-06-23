export const salesQueries = {
    target: 'SELECT target FROM agent WHERE id = $1;',
    followUp: 'SELECT COUNT(*) FROM action WHERE agent_id = $1',
    meeting: 'SELECT COUNT(*) FROM action WHERE agent_id = $1;',
    followMeet: 'SELECT COUNT(*) FROM action WHERE agent_id = $1;',
    email: 'SELECT COUNT(*) FROM action WHERE agent_id = $1;',
    newClients: 'SELECT COUNT(*) FROM client WHERE agent_id = $1',
    qualifiedClients: 'SELECT COUNT(*) FROM client WHERE agent_id = $1',
    reservedClients: 'SELECT COUNT(*) FROM client WHERE agent_id = $1',
    doneClients: 'SELECT COUNT(*) FROM client WHERE agent_id = $1',
  };