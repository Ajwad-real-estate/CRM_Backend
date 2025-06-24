import { getPool } from "../../../db/db.js";
import { salesQueries } from "../queries/salesDashboard.quires.js";

export const prepareSalesDashboard = async (salesID,managerID) => {
    const pool = await getPool()
    console.log(salesQueries.target);
    
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
          pool.query(salesQueries.target, [salesID,managerID]),
          pool.query(salesQueries.followUp, [salesID,managerID]),
          pool.query(salesQueries.meeting, [salesID,managerID]),
          pool.query(salesQueries.followMeet, [salesID,managerID]),
          pool.query(salesQueries.email, [salesID,managerID]),
          pool.query(salesQueries.newClients, [salesID,managerID]),
          pool.query(salesQueries.qualifiedClients, [salesID,managerID]),
          pool.query(salesQueries.reservedClients, [salesID,managerID]),
          pool.query(salesQueries.doneClients, [salesID,managerID]),
        ]);

        const dashboardData = {
            target: parseInt(targetResult.rows[0]?.target ?? '0', 10),
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
        throw new Error(error);
    }     
};