const whatsappService = require('../services/whatsapp.service');

exports.deployAgent = async (req, res) => {
    try {
        console.log("🚀 API: Deploy Agent Requested");
        const result = await whatsappService.connectToWhatsApp();

        if (result.error) {
            return res.status(500).json({ success: false, error: result.error });
        }

        res.json({ success: true, status: result.status });
    } catch (error) {
        console.error("Deploy Error:", error);
        res.status(500).json({ success: false, error: "Deployment failed" });
    }
};

exports.getStatus = (req, res) => {
    const status = whatsappService.getStatus();
    res.json({ success: true, ...status });
};

exports.logoutAgent = async (req, res) => {
    const result = await whatsappService.logout();
    res.json(result);
};
