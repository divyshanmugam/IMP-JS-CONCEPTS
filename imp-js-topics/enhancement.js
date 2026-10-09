function findMaxEnhancement(cost, budget) {
    let totalEnhancement = 0;
    let remainingBudget = budget;

    // Iterate from the largest index down to 0
    for (let i = cost.length - 1; i >= 0; i--) {
        if (cost[i] <= remainingBudget) {
            remainingBudget -= cost[i];
            
            // Calculate 2^i using Math.pow
            totalEnhancement += Math.pow(2, i); 
        }
    }

    return  totalEnhancement;
}

// --- Example Usage ---
const costsArray = [5, 10, 20, 40]; // Indices: 0, 1, 2, 3
const userBudget = 50;

const result = findMaxEnhancement(costsArray, userBudget);
console.log('Maximum enhancement:', result);