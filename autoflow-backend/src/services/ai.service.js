const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Validate workflow structure
 */
function validateWorkflow(parsed) {
  // Support both wrappers
  const nodes = parsed.nodes || parsed.steps || parsed.workflow?.nodes;

  if (!nodes || !Array.isArray(nodes)) {
    throw new Error("Invalid structure: Missing 'nodes' or 'steps' array");
  }

  return nodes;
}

/**
 * Generate fallback workflow when AI fails
 */
function generateFallbackWorkflow(reason = "System Busy") {
  return {
    nodes: [
      {
        id: "1",
        type: "trigger",
        position: { x: 100, y: 100 },
        data: {
          label: "Message Received",
          triggerType: "whatsapp_message",
          config: { platform: "whatsapp" }
        }
      },
      {
        id: "2",
        type: "action",
        position: { x: 400, y: 100 },
        data: {
          label: "Automated Reply",
          actionType: "send_whatsapp",
          config: {
            recipient: "{{trigger.from}}",
            message: `Service Temporarily unavailable. Reason: ${reason}`
          }
        }
      }
    ]
  };
}

const googleSheetService = require('./googleSheet.service');

exports.generateWorkflow = async (userPrompt, fileContext = "") => {
  console.log("🤖 AI Service: Generating workflow for:", userPrompt);

  // 1. Try to fetch Real Inventory from Google Sheets
  let inventoryData = null;
  try {
    inventoryData = await googleSheetService.syncInventory();
    console.log(`📊 Loaded ${inventoryData.length} items from Google Sheets`);
  } catch (e) {
    console.warn("⚠️ Failed to load Google Sheet inventory, falling back to file context or empty.");
  }

  // 2. Fallback to file context if Sheet is empty/failed
  if (!inventoryData || inventoryData.length === 0) {
    inventoryData = fileContext?.preview || fileContext?.data || null;
  }

  const inventoryColumns = inventoryData && inventoryData.length > 0 ? Object.keys(inventoryData[0]) : [];
  // Sample data for AI context
  const sampleData = inventoryData ? inventoryData.slice(0, 3) : [];

  if (fileContext) {
    console.log("📂 With File Context:", inventoryColumns.join(', '));
  }

  // ⚡ USE FLASH MODEL FOR SPEED (As requested)
  const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-flash-latest", "gemini-pro-latest"];

  for (const modelName of modelsToTry) {
    try {
      console.log(`🔄 Attempting Model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
      You are an **Elite Conversation Designer** for WhatsApp Automation.
      Your goal is to build a high-conversion, empathetic, and logical workflow based on the user's request: "${userPrompt}"

      ### 📊 AVAILABLE DATA CONTEXT:
      ${sampleData.length > 0 ? `
      - **Linked Database**: Google Sheet
      - **Columns**: [${inventoryColumns.join(', ')}]
      - **Sample Data**: ${JSON.stringify(sampleData[0])}
      - *Tip*: You can create 'condition' nodes to check values (e.g., if 'Stock' > 0, if 'Price' < 1000).
      ` : '- No external data connected yet. Build a generic flow.'}

      ### 🎨 DESIGN RULES:
      1. **Start Strong**: Always begin with a 'trigger' node (label: "Incoming Message").
      2. **Smart Routing**: 
         - If the request implies choices (e.g., "sales vs support"), use an 'ai_agent' or 'router' node.
         - If the request implies data checking (e.g., "check stock"), use a 'condition' node.
      3. **Natural Flow**: 
         - Don't just dump info. Break long messages into multiple 'action' nodes.
         - Use emojis (ℹ️, 📦, ✅) to make it friendly and professional.
      4. **Structure**:
         - Linear: A -> B -> C
         - Branching: A -> (Condition) -> True: B / False: C

      ### 🛑 STRICT JSON OUTPUT FORMAT:
      Return **ONLY** valid JSON. No markdown backticks.
      {
        "nodes": [
           { 
             "id": "1", 
             "type": "trigger", 
             "position": { "x": 50, "y": 250 },
             "data": { "label": "Start" },
             "next": ["2"] 
           },
           {
             "id": "2",
             "type": "ai_agent", 
             "position": { "x": 300, "y": 250 },
             "data": { 
                "label": "Analyze Intent",
                "systemPrompt": "Classify user intent: buy OR support",
                "outputs": { "buy": "3", "support": "4" } 
             }
           },
           {
             "id": "3", 
             "type": "action", 
             "position": { "x": 600, "y": 100 },
             "data": { "label": "Show Products", "actionType": "send_message", "payload": "Here are our latest items... 🛍️" },
             "next": []
           },
           {
             "id": "4", 
             "type": "action", 
             "position": { "x": 600, "y": 400 },
             "data": { "label": "Contact Support", "actionType": "send_message", "payload": "Connecting you to an agent... 📞" },
             "next": []
           }
        ]
      }
      `.trim();

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log(`✅ ${modelName} Success. Length:`, text.length);

      // Clean JSON
      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      const nodes = validateWorkflow(parsed);

      return { nodes };

    } catch (error) {
      console.warn(`⚠️ ${modelName} Failed:`, error.message);
      if (modelName === modelsToTry[modelsToTry.length - 1]) {
        console.error("❌ All models failed.");
        return generateFallbackWorkflow();
      }
    }
  }
};

exports.explainWorkflow = async (workflowJson) => {
  // ⚡ Simple Text Explanation (Prevents Frontend Crash)
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const prompt = `
      Analyze this workflow and explain it in simple terms.
      
      Workflow: ${JSON.stringify(workflowJson).substring(0, 2000)}
      
      RULES:
      1. Output PLAIN TEXT only. Do NOT output a JSON object.
      2. Use a professional, technical tone. Use bullet points.
      3. Do NOT use emojis.
      4. Keep it brief (max 3-4 lines).
      `.trim();

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Double cleaning just in case
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").replace(/^{"explanation":/g, "").replace(/}$/g, "").trim();

    return { explanation: cleanText };
  } catch (e) {
    return { explanation: "AI could not generate explanation." };
  }
};