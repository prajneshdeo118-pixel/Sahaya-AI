/**
 * Filters the schemes based on the user's profile.
 * 
 * @param {Array} schemes - Array of all schemes from schemes.json
 * @param {Object} profile - User profile containing { age, income, category, state }
 * @returns {Array} List of eligible schemes
 */
function getEligibleSchemes(schemes, profile) {
    const { age, income, category, state } = profile;
    
    // Default values if user omits
    const userAge = age ? parseInt(age) : null;
    const userIncome = income ? parseFloat(income) : null;
    const userCategory = category || "All";
    const userState = state || "All";

    return schemes.filter(scheme => {
        // 1. Check Income
        if (scheme.income_limit !== null && userIncome !== null) {
            if (userIncome > scheme.income_limit) {
                return false;
            }
        }

        // 2. Check Age
        if (scheme.age_min !== null && userAge !== null) {
            if (userAge < scheme.age_min) {
                return false;
            }
        }

        // 3. Check Category
        if (userCategory !== "All" && !scheme.category.includes("All") && !scheme.category.includes(userCategory)) {
            return false;
        }

        // 4. Check State
        if (userState !== "All" && !scheme.state.includes("All") && !scheme.state.includes(userState)) {
            return false;
        }

        return true;
    });
}

module.exports = {
    getEligibleSchemes
};
