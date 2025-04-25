export const checkUserAndPhonesQuery = `
  SELECT a.username, a.email, ap.phone_number
  FROM account AS a
  LEFT JOIN agent_phone AS ap ON a.agent_id = ap.agent_id
  WHERE a.username = $1 OR a.email = $2 OR ap.phone_number = ANY ($3::text[]);
`;

export const insertAgentQuery = `
  INSERT INTO agent (name, role_id, city_id, street, manager_id)
  VALUES ($1, $2, $3, $4, $5) RETURNING id;
`;

export const insertAccountQuery = `
  INSERT INTO account (username, agent_id, email, password)
  VALUES ($1, $2, $3, $4);
`;

export const insertPhoneQuery = `
  INSERT INTO agent_phone (agent_id, phone_number)
  VALUES ($1, $2);
`;

export const getAgentsUnderManagerQuery = `
  SELECT
    agent.id,
    agent.name,
    role.title,
    agent.status_id,
    agent_status.name AS status,
    agent.manager_id,
    manager.name AS manager_name
  FROM
    agent
  JOIN role ON agent.role_id = role.id
  JOIN agent_status ON agent.status_id = agent_status.id
  LEFT JOIN agent AS manager ON agent.manager_id = manager.id
  WHERE agent.manager_id = $1;
`;
