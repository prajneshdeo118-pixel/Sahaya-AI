const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env before using it
dotenv.config();

const schemesData = require('./data/schemes.json');
const filterService = require('./services/filterService');
const { explainScheme } = require('./services/huggingfaceService');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// POST Endpoint to filter schemes
app.post('/api/find-schemes', (req, res) => {
    try {
        const userProfile = req.body;
        // userProfile should contain: { age, income, category, sector, state }
        
        const eligibleSchemes = filterService.getEligibleSchemes(schemesData, userProfile);
        
        res.json({
            success: true,
            count: eligibleSchemes.length,
            schemes: eligibleSchemes
        });
    } catch (error) {
        console.error("Error filtering schemes:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// POST Endpoint to explain a specific scheme via OpenAI
app.post('/api/explain-scheme', async (req, res) => {
    try {
        const { schemeName, schemeDetails } = req.body;
        
        if (!process.env.HUGGINGFACE_API_KEY) {
            return res.status(400).json({ 
                success: false, 
                message: "Hugging Face API Key is not configured on the server."
            });
        }
        
        const explanation = await explainScheme(schemeName, schemeDetails);
        res.json({ success: true, explanation });
    } catch (error) {
        console.error("Error explaining scheme:", error);
        res.status(500).json({ success: false, message: "Failed to generate explanation" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
