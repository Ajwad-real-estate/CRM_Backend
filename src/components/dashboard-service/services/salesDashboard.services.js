import { getPool } from "../../../db/db.js";
import { salesQueries } from "../queries/salesDashboard.quires.js";

export const prepareSalesDashboard = async (id) => {
    const pool = await getPool()
    try {
        const [
          targetResult,
          followUpResult,
          meetingResult,
          followMeetResult,
          emailResult,
          newClientsResult,
          qualifiedClientsResult,
          reservedClientsResult,
          doneClientsResult,
        ] = await Promise.all([
          pool.query(salesQueries.target, [id]),
          pool.query(salesQueries.followUp, [id]),
          pool.query(salesQueries.meeting, [id]),
          pool.query(salesQueries.followMeet, [id]),
          pool.query(salesQueries.email, [id]),
          pool.query(salesQueries.newClients, [id]),
          pool.query(salesQueries.qualifiedClients, [id]),
          pool.query(salesQueries.reservedClients, [id]),
          pool.query(salesQueries.doneClients, [id]),
        ]);

        const dashboardData = {
            target: parseInt(targetResult.rows[0].target, 10),
            followUpCount: parseInt(followUpResult.rows[0].count, 10),
            meetingCount: parseInt(meetingResult.rows[0].count, 10),
            followMeetCount: parseInt(followMeetResult.rows[0].count, 10),
            emailCount: parseInt(emailResult.rows[0].count, 10),
            newClientsCount: parseInt(newClientsResult.rows[0].count, 10),
            qualifiedClientsCount: parseInt(qualifiedClientsResult.rows[0].count, 10),
            reservedClientsCount: parseInt(reservedClientsResult.rows[0].count, 10),
            doneClientsCount: parseInt(doneClientsResult.rows[0].count, 10),
        };

        return dashboardData
    }
    catch(error) {
        throw new Error(error.message);
    }     
};