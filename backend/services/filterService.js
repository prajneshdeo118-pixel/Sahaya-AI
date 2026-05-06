/**
 * Filters the schemes based on the user's profile.
 * 
 * @param {Array} schemes - Array of all schemes from schemes.json
 * @param {Object} profile - User profile containing { age, income, category, sector, state }
 * @returns {Array} List of eligible schemes
 */
function getEligibleSchemes(schemes, profile) {
    const { age, income, category, sector, state } = profile;
    
    // Default values if user omits
    const userAge = age ? parseInt(age) : null;
    const userIncome = income ? parseFloat(income) : null;
    const userCategory = category || "All";
    const userSector = sector || "All";
    const userState = state || "All";

    // Social category keywords to match in eligibility text
    const categoryKeywords = {
        "SC": ["scheduled caste", "sc ", "sc/", "sc,", " sc ", "dalit"],
        "ST": ["scheduled tribe", "st ", "st/", "st,", " st ", "tribal"],
        "OBC": ["other backward class", "obc", "backward class"],
        "EWS": ["economically weaker", "ews", "economically weak"],
        "Minorities": ["minority", "minorities", "muslim", "christian", "sikh", "buddhist", "jain", "parsi"],
        "Women": ["women", "woman", "female", "girl", "widow", "mahila"],
        "Persons with Disabilities": ["disabilit", "handicap", "divyang", "pwd", "differently abled"],
        "Senior Citizens": ["senior citizen", "old age", "elderly", "pension"],
        "General": [] // General matches everything
    };

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

        // 3. Check Sector (maps to scheme.category array in JSON)
        if (userSector !== "All" && !scheme.category.includes("All") && !scheme.category.includes(userSector)) {
            return false;
        }

        // 4. Check Social Category (search in eligibility + name text)
        if (userCategory !== "All" && userCategory !== "General") {
            const keywords = categoryKeywords[userCategory] || [];
            if (keywords.length > 0) {
                const searchText = (
                    (scheme.eligibility || '') + ' ' + 
                    (scheme.name || '') + ' ' + 
                    (scheme.benefit || '')
                ).toLowerCase();
                
                const matches = keywords.some(keyword => searchText.includes(keyword));
                if (!matches) {
                    return false;
                }
            }
        }

        // 5. Check State
        // Data has "Central" or "State" in scheme.state array
        // User selects a specific state name or "All"
        if (userState !== "All") {
            // Central schemes apply to everyone
            if (scheme.state.includes("Central")) {
                // Central schemes are available in all states — include them
            } else if (scheme.state.includes("State")) {
                // State-level schemes: check if scheme eligibility/name mentions the user's state
                const searchText = (
                    (scheme.eligibility || '') + ' ' + 
                    (scheme.name || '') + ' ' + 
                    (scheme.benefit || '')
                ).toLowerCase();
                const stateName = userState.toLowerCase();
                
                if (!searchText.includes(stateName)) {
                    return false;
                }
            } else if (!scheme.state.includes("All") && !scheme.state.includes(userState)) {
                return false;
            }
        }

        return true;
    });
}

module.exports = {
    getEligibleSchemes
};
