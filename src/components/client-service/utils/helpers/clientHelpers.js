// utils/helpers/clientHelpers.js
export const formatAgentAssignments = (agentsWithQuantity, agentsWithoutQuantity, clients) => {
    let currentClientIndex = 0;
    let agentIndex = 0;
    const assignments = [];
    
    // Step 1: Assign clients to agents with `quantity > 0`
    if (agentsWithQuantity.length > 0) {
      for (const agent of agentsWithQuantity) {
        for (let i = 0; i < agent.quantity; i++) {
          if (currentClientIndex >= clients.length) break;
  
          const clientId = clients[currentClientIndex];
          assignments.push({ agentId: agent.id, clientId });
  
          currentClientIndex++;
        }
      }
    }
  
    // Step 2: Distribute remaining clients to agents with `quantity === 0` using a round-robin
    if (agentsWithoutQuantity.length > 0) {
      while (currentClientIndex < clients.length) {
        const agent = agentsWithoutQuantity[agentIndex];
        const clientId = clients[currentClientIndex];
  
        assignments.push({ agentId: agent.id, clientId });
  
        currentClientIndex++;
        agentIndex = (agentIndex + 1) % agentsWithoutQuantity.length;
      }
    }
    
    return assignments;
  };
  
  export const formatStatusFilter = (status) => {
    if (!status) return null;
    
    const statusMap = {
      'new': 1,
      'qualified': 2,
      'reserved': 3,
      'done deal': 4,
      'done_deal': 4,
      'done-deal': 4,
      'archieved': 5,
      'lost': 6,
      'canceled': 7
    };
    
    const statusLower = status.toLowerCase();
    
    if (statusMap[statusLower]) {
      return statusMap[statusLower];
    } else if (!isNaN(status)) {
      return parseInt(status);
    }
    
    return null;
  };