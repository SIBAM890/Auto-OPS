const aiService = require('../services/ai.service');

exports.createWorkflow = async (req, res) => {
    try {
        const { userPrompt, fileContext } = req.body;
        const workflow = await aiService.generateWorkflow(userPrompt, fileContext);
        res.json({ success: true, workflow });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.explainWorkflow = async (req, res) => {
    try {
        const { workflow } = req.body;
        const explanation = await aiService.explainWorkflow(workflow);
        res.json({ success: true, explanation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};