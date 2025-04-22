// Auth Related Queries
export const AUTH_QUERIES = {
    GET_USER_BY_IDENTIFIER: `
      SELECT username, agent_id, password 
      FROM account 
      WHERE username = $1 OR email = $1;
    `,
    GET_AGENT_DETAILS: `
      SELECT title, role.id 
      FROM role 
      JOIN agent ON role_id = role.id 
      WHERE agent.id = $1;
    `,
    INSERT_REFRESH_TOKEN: `
      INSERT INTO refresh_tokens VALUES ($1);
    `,
    DELETE_REFRESH_TOKEN: `
      DELETE FROM refresh_tokens WHERE refresh_token = $1;
    `,
    CHECK_REFRESH_TOKEN: `
      SELECT * FROM refresh_tokens WHERE refresh_token = $1;
    `
  };
  
  // User Related Queries
  export const USER_QUERIES = {
    CHECK_USER_EXISTS: `
      SELECT a.username, a.email, ap.phone_number
      FROM account AS a
      LEFT JOIN agent_phone AS ap ON a.agent_id = ap.agent_id
      WHERE a.username = $1 OR a.email = $2 OR ap.phone_number = ANY ($3::text[]);
    `,
    CREATE_AGENT: `
      INSERT INTO agent (name, role_id, city_id, street, manager_id)
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING id;
    `,
    CREATE_ACCOUNT: `
      INSERT INTO account (username, agent_id, email, password)
      VALUES ($1, $2, $3, $4);
    `,
    ADD_PHONE_NUMBER: `
      INSERT INTO agent_phone (agent_id, phone_number)
      VALUES ($1, $2);
    `,
    CHECK_EMAIL_EXISTS: `
      SELECT email FROM account WHERE email = $1;
    `,
    VERIFY_USER_EMAIL: `
      SELECT agent_id FROM account WHERE agent_id = $1 AND email = $2;
    `,
    UPDATE_EMAIL: `
      UPDATE account SET email = $1 WHERE agent_id = $2;
    `,
    VERIFY_USER_EXISTS: `
      SELECT agent_id FROM account WHERE agent_id = $1;
    `,
    UPDATE_PASSWORD: `
      UPDATE account SET password = $1 WHERE agent_id = $2;
    `,
    GET_USER_EMAIL: `
      SELECT email FROM account WHERE agent_id = $1;
    `
  };
  
 