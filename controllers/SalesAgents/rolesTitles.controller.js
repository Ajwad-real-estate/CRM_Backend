import { getPool } from "../../configs/dbConfig.js";

// Define the role hierarchy based on the role titles
const roleHierarchy = [
  'IT Admin',        // 
  'CEO',             // Highest role
  'Sales Manager',   // Next level
  'Team Lead',       // Lower than Sales Manager
  'Sales Agent',     // Lower than Team Lead
  'Intern'           // Lowest role
];

const rolesTitles = async (req, res) => {
  console.log("Fetching roles titles");

  const pool = await getPool();

  try {
    // Assuming `req.user.roleId` contains the ID of the user's current role
    const userRoleId = req.user.roleId;

    // First, fetch the user's role title from the database
    const userRoleQuery = `SELECT title FROM role WHERE id = $1`;
    const { rows: userRoleRows } = await pool.query(userRoleQuery, [userRoleId]);

    if (userRoleRows.length === 0) {
      return res.status(404).json({ message: "User role not found." });
    }

    const userRoleTitle = userRoleRows[0].title;

    // Get the index of the user's role in the hierarchy
    const userRoleIndex = roleHierarchy.indexOf(userRoleTitle);

    if (userRoleIndex === -1) {
      return res.status(404).json({ message: "User role is not in the predefined hierarchy." });
    }

    // Filter out roles that are lower than the user's role based on the hierarchy
    const lowerRoles = roleHierarchy.slice(userRoleIndex + 1);

    // Now fetch the roles from the database that match the lower roles
    const rolesQuery = `
      SELECT id, title 
      FROM role
      WHERE title = ANY($1)
      ORDER BY array_position($1, title);
    `;
    const { rows: roles } = await pool.query(rolesQuery, [lowerRoles]);

    // If no roles are found, return a 404
    if (roles.length === 0) {
      return res.status(404).json({ message: "No roles found lower than your role." });
    }

    res.status(200).json({ roles });
  } catch (error) {
    console.error("Error fetching roles-titles:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default rolesTitles;
