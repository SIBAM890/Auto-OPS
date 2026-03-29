const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflow.controller');
const uploadController = require('../controllers/upload.controller');
const whatsappController = require('../controllers/whatsapp.controller');
const engineService = require('../services/engine.service');

// ── Tool Catalogue ─────────────────────────────────────────────────────────────
// NodePalette.jsx fetches this to populate the drag-and-drop toolbox.
// Mirrors the TOOL_CATEGORIES constant in the frontend (single source of truth on backend).
const TOOLS_CATALOGUE = [
    // Core Logic
    { id: 'trigger',      name: 'Manual Trigger',      category: 'Core Logic',       icon: 'MessageSquare', type: 'trigger'   },
    { id: 'webhook',      name: 'Webhook',              category: 'Core Logic',       icon: 'Zap',           type: 'trigger'   },
    { id: 'condition',    name: 'Condition (If/Else)',  category: 'Core Logic',       icon: 'GitBranch',     type: 'condition' },
    { id: 'delay',        name: 'Delay / Wait',         category: 'Core Logic',       icon: 'Clock',         type: 'action'    },
    { id: 'http',         name: 'HTTP Request',         category: 'Core Logic',       icon: 'Globe',         type: 'action'    },
    { id: 'code',         name: 'Run JavaScript',       category: 'Core Logic',       icon: 'Code',          type: 'action'    },
    // Communication
    { id: 'whatsapp',     name: 'WhatsApp',             category: 'Communication',    icon: 'MessageSquare', type: 'action'    },
    { id: 'gmail',        name: 'Gmail',                category: 'Communication',    icon: 'Mail',          type: 'action'    },
    { id: 'slack',        name: 'Slack',                category: 'Communication',    icon: 'Slack',         type: 'action'    },
    { id: 'telegram',     name: 'Telegram',             category: 'Communication',    icon: 'Send',          type: 'action'    },
    { id: 'twilio',       name: 'Twilio SMS',           category: 'Communication',    icon: 'Smartphone',    type: 'action'    },
    // AI & Intelligence
    { id: 'chatgpt',      name: 'ChatGPT (OpenAI)',     category: 'AI & Intelligence',icon: 'Bot',           type: 'action'    },
    { id: 'ollama',       name: 'Ollama (local LLM)',   category: 'AI & Intelligence',icon: 'Bot',           type: 'action'    },
    { id: 'claude',       name: 'Claude AI',            category: 'AI & Intelligence',icon: 'Bot',           type: 'action'    },
    { id: 'gemini',       name: 'Google Gemini',        category: 'AI & Intelligence',icon: 'Bot',           type: 'action'    },
    { id: 'huggingface',  name: 'Hugging Face',         category: 'AI & Intelligence',icon: 'Bot',           type: 'action'    },
    // Productivity
    { id: 'sheets',       name: 'Google Sheets',        category: 'Productivity',     icon: 'Database',      type: 'action'    },
    { id: 'notion',       name: 'Notion',               category: 'Productivity',     icon: 'Database',      type: 'action'    },
    { id: 'airtable',     name: 'Airtable',             category: 'Productivity',     icon: 'Database',      type: 'action'    },
    { id: 'trello',       name: 'Trello',               category: 'Productivity',     icon: 'Trello',        type: 'action'    },
    { id: 'calendar',     name: 'Google Calendar',      category: 'Productivity',     icon: 'Calendar',      type: 'action'    },
    { id: 'drive',        name: 'Google Drive',         category: 'Productivity',     icon: 'Cloud',         type: 'action'    },
    // E-Commerce
    { id: 'shopify',      name: 'Shopify',              category: 'E-Commerce',       icon: 'ShoppingCart',  type: 'action'    },
    { id: 'stripe',       name: 'Stripe',               category: 'E-Commerce',       icon: 'CreditCard',    type: 'action'    },
    { id: 'razorpay',     name: 'Razorpay',             category: 'E-Commerce',       icon: 'CreditCard',    type: 'action'    },
    // Social Media
    { id: 'twitter',      name: 'Twitter / X',          category: 'Social Media',     icon: 'Twitter',       type: 'action'    },
    { id: 'linkedin',     name: 'LinkedIn',             category: 'Social Media',     icon: 'Linkedin',      type: 'action'    },
    { id: 'instagram',    name: 'Instagram',            category: 'Social Media',     icon: 'Instagram',     type: 'action'    },
    // Developer Tools
    { id: 'github',       name: 'GitHub',               category: 'Developer Tools',  icon: 'Github',        type: 'action'    },
    { id: 'aws',          name: 'AWS Lambda',           category: 'Developer Tools',  icon: 'Cloud',         type: 'action'    },
    { id: 'firebase',     name: 'Firebase',             category: 'Developer Tools',  icon: 'Database',      type: 'action'    },
];

router.get('/tools', (req, res) => {
    res.json(TOOLS_CATALOGUE);
});

// WhatsApp Deployment Routes
router.post('/whatsapp/deploy', whatsappController.deployAgent);
router.get('/whatsapp/status', whatsappController.getStatus);
router.post('/whatsapp/logout', whatsappController.logoutAgent);

// AI Routes
router.post('/generate-workflow', workflowController.createWorkflow);
router.post('/explain-workflow', workflowController.explainWorkflow);

// File Upload Route
router.post('/upload', uploadController.uploadFile);

// Simulation Route (Test Bridge)
router.post('/simulate-message', async (req, res) => {
    try {
        const { message } = req.body;
        // Mock WhatsApp socket
        let botReply = "No reply generated.";
        const mockSock = {
            sendMessage: async (jid, content) => {
                botReply = content.text;
                console.log("🤖 Simulated Reply:", botReply);
            }
        };

        // Run engine logic
        await engineService.processMessage(mockSock, "TestUser", message);

        res.json({ success: true, reply: botReply });
    } catch (error) {
        console.error("Simulation Error:", error);
        res.status(500).json({ error: "Simulation failed" });
    }
});

module.exports = router;