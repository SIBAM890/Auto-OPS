import {
    MessageSquare, Zap, Divide, Link, Mail,
    Smartphone, Database, ShoppingCart, Globe,
    CreditCard, Users, Code, Cloud, Clock,
    Bot, Facebook, Twitter, Instagram, Linkedin,
    Slack, Github, Trello, Calendar
} from 'lucide-react';

export const TOOL_CATEGORIES = [
    {
        id: 'core',
        name: 'Core Logic',
        tools: [
            { id: 'trigger', label: 'Manual Trigger', type: 'trigger', icon: 'MessageSquare' },
            { id: 'webhook', label: 'Webhook', type: 'trigger', icon: 'Globe' },
            { id: 'condition', label: 'Condition (If/Else)', type: 'condition', icon: 'Divide' },
            { id: 'delay', label: 'Delay / Wait', type: 'action', icon: 'Clock' },
            { id: 'http', label: 'HTTP Request', type: 'action', icon: 'Code' },
            { id: 'code', label: 'Run JavaScript', type: 'action', icon: 'Code' },
            { id: 'split', label: 'Split Text', type: 'action', icon: 'Divide' },
            { id: 'format', label: 'Format Date', type: 'action', icon: 'Clock' },
        ]
    },
    {
        id: 'communication',
        name: 'Communication',
        tools: [
            { id: 'whatsapp', label: 'WhatsApp', type: 'action', icon: 'MessageSquare' },
            { id: 'gmail', label: 'Gmail', type: 'action', icon: 'Mail' },
            { id: 'slack', label: 'Slack', type: 'action', icon: 'Slack' },
            { id: 'discord', label: 'Discord', type: 'action', icon: 'MessageSquare' },
            { id: 'telegram', label: 'Telegram', type: 'action', icon: 'MessageSquare' },
            { id: 'twilio', label: 'Twilio SMS', type: 'action', icon: 'Smartphone' },
            { id: 'outlook', label: 'Outlook', type: 'action', icon: 'Mail' },
            { id: 'teams', label: 'Microsoft Teams', type: 'action', icon: 'Users' },
            { id: 'zoom', label: 'Zoom Meeting', type: 'action', icon: 'Globe' },
            { id: 'meet', label: 'Google Meet', type: 'action', icon: 'Globe' },
        ]
    },
    {
        id: 'crm',
        name: 'CRM & Sales',
        tools: [
            { id: 'salesforce', label: 'Salesforce', type: 'action', icon: 'Database' },
            { id: 'hubspot', label: 'HubSpot', type: 'action', icon: 'Database' },
            { id: 'pipedrive', label: 'Pipedrive', type: 'action', icon: 'Database' },
            { id: 'zoho', label: 'Zoho CRM', type: 'action', icon: 'Database' },
            { id: 'zendesk', label: 'Zendesk', type: 'action', icon: 'Users' },
            { id: 'intercom', label: 'Intercom', type: 'action', icon: 'MessageSquare' },
            { id: 'freshdesk', label: 'Freshdesk', type: 'action', icon: 'Users' },
            { id: 'activecampaign', label: 'ActiveCampaign', type: 'action', icon: 'Mail' },
            { id: 'mailchimp', label: 'Mailchimp', type: 'action', icon: 'Mail' },
            { id: 'convertkit', label: 'ConvertKit', type: 'action', icon: 'Mail' },
        ]
    },
    {
        id: 'ai',
        name: 'AI & Intelligence',
        tools: [
            { id: 'chatgpt', label: 'ChatGPT (OpenAI)', type: 'action', icon: 'Bot' },
            { id: 'gemini', label: 'Google Gemini', type: 'action', icon: 'Bot' },
            { id: 'claude', label: 'Claude AI', type: 'action', icon: 'Bot' },
            { id: 'dalle', label: 'DALL·E Image', type: 'action', icon: 'Bot' },
            { id: 'whisper', label: 'Whisper Audio', type: 'action', icon: 'Bot' },
            { id: 'midjourney', label: 'Midjourney', type: 'action', icon: 'Bot' },
            { id: 'huggingface', label: 'Hugging Face', type: 'action', icon: 'Bot' },
            { id: 'pinecone', label: 'Pinecone DB', type: 'action', icon: 'Database' },
        ]
    },
    {
        id: 'productivity',
        name: 'Productivity',
        tools: [
            { id: 'sheets', label: 'Google Sheets', type: 'action', icon: 'Database' },
            { id: 'airtable', label: 'Airtable', type: 'action', icon: 'Database' },
            { id: 'notion', label: 'Notion', type: 'action', icon: 'Database' },
            { id: 'trello', label: 'Trello', type: 'action', icon: 'Trello' },
            { id: 'asana', label: 'Asana', type: 'action', icon: 'Users' },
            { id: 'clickup', label: 'ClickUp', type: 'action', icon: 'Users' },
            { id: 'monday', label: 'Monday.com', type: 'action', icon: 'Users' },
            { id: 'calendar', label: 'Google Calendar', type: 'action', icon: 'Calendar' },
            { id: 'drive', label: 'Google Drive', type: 'action', icon: 'Cloud' },
            { id: 'dropbox', label: 'Dropbox', type: 'action', icon: 'Cloud' },
        ]
    },
    {
        id: 'ecommerce',
        name: 'E-Commerce',
        tools: [
            { id: 'shopify', label: 'Shopify', type: 'action', icon: 'ShoppingCart' },
            { id: 'woocommerce', label: 'WooCommerce', type: 'action', icon: 'ShoppingCart' },
            { id: 'stripe', label: 'Stripe', type: 'action', icon: 'CreditCard' },
            { id: 'paypal', label: 'PayPal', type: 'action', icon: 'CreditCard' },
            { id: 'square', label: 'Square', type: 'action', icon: 'CreditCard' },
            { id: 'gumroad', label: 'Gumroad', type: 'action', icon: 'ShoppingCart' },
            { id: 'razorpay', label: 'Razorpay', type: 'action', icon: 'CreditCard' },
        ]
    },
    {
        id: 'social',
        name: 'Social Media',
        tools: [
            { id: 'twitter', label: 'Twitter / X', type: 'action', icon: 'Twitter' },
            { id: 'linkedin', label: 'LinkedIn', type: 'action', icon: 'Linkedin' },
            { id: 'facebook', label: 'Facebook', type: 'action', icon: 'Facebook' },
            { id: 'instagram', label: 'Instagram', type: 'action', icon: 'Instagram' },
            { id: 'youtube', label: 'YouTube', type: 'action', icon: 'Globe' },
            { id: 'tiktok', label: 'TikTok', type: 'action', icon: 'Smartphone' },
            { id: 'pinterest', label: 'Pinterest', type: 'action', icon: 'Globe' },
        ]
    },
    {
        id: 'dev',
        name: 'Developer Tools',
        tools: [
            { id: 'github', label: 'GitHub', type: 'action', icon: 'Github' },
            { id: 'gitlab', label: 'GitLab', type: 'action', icon: 'Code' },
            { id: 'jira', label: 'Jira', type: 'action', icon: 'Code' },
            { id: 'aws', label: 'AWS Lambda', type: 'action', icon: 'Cloud' },
            { id: 'firebase', label: 'Firebase', type: 'action', icon: 'Database' },
            { id: 'vercel', label: 'Vercel', type: 'action', icon: 'Globe' },
            { id: 'netlify', label: 'Netlify', type: 'action', icon: 'Globe' },
            { id: 'docker', label: 'Docker', type: 'action', icon: 'Cloud' },
        ]
    }
];
