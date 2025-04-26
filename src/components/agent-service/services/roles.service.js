import { getPool } from "../../../db/db.js";
import { fetchRoleTitleById, fetchRolesByTitles } from "../utils/queries/roles.queries.js";

// Role hierarchy
const roleHierarchy = [
  "IT Admin",
  "CEO",
  "Sales Manager",
  "Team Lead",
  "Sales Agent",
  "Intern"
];

export const getRolesLowerThanUser = async (roleId) => {
  const pool = await getPool();

  // Get current user's role title
  const { rows: roleRows } = await pool.query(fetchRoleTitleById, [roleId]);
  if (roleRows.length === 0) {
    return { status: 404, body: { message: "User role not found." } };
  }

  const userRoleTitle = roleRows[0].title;
  const roleIndex = roleHierarchy.indexOf(userRoleTitle);

  if (roleIndex === -1) {
    return {
      status: 404,
      body: { message: "User role is not in the predefined hierarchy." },
    };
  }

  const lowerRoles = roleHierarchy.slice(roleIndex + 1);
  const { rows: roles } = await pool.query(fetchRolesByTitles, [lowerRoles]);

  if (roles.length === 0) {
    return {
      status: 404,
      body: { message: "No roles found lower than your role." },
    };
  }

  return { status: 200, body: { roles } };
};
