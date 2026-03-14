# 🌊 AutoFlow: Autonomous Agent Builder

**Build. Visualize. Deploy.**  
The professional platform for building AI-driven agents with visual workflows and real-time inventory sync.

![Frontend](https://img.shields.io/badge/Frontend-React%2018-61DAFB?logo=react&logoColor=white&style=flat-square)
![Backend](https://img.shields.io/badge/Backend-Node.js-339933?logo=nodedotjs&logoColor=white&style=flat-square)
![AI](https://img.shields.io/badge/AI-Gemini%20Pro-4285F4?logo=google&logoColor=white&style=flat-square)
![Platform](https://img.shields.io/badge/Platform-WhatsApp-25D366?logo=whatsapp&logoColor=white&style=flat-square)
![Database](https://img.shields.io/badge/Database-Google%20Sheets-34A853?logo=googlesheets&logoColor=white&style=flat-square)

---

## 💡 Overview

**AutoFlow** is a comprehensive solution for businesses looking to automate customer interaction on WhatsApp/Facebook/Instagram. Unlike simple chatbots, AutoFlow agents are:

*   **Context-Aware**: They remember conversation history.
*   **Data-Connected**: They read/write to your Google Sheets inventory in real-time.
*   **Visual**: Built using a drag-and-drop node editor, generated instantly by AI.

> *"I need an agent for my bakery that handles cake orders and checks flavor availability."*  
> ↳ **AutoFlow builds the flows, connects the database, and deploys the agent.**

---

## ✨ Core Features

### 🛠️ No-Code Logic Builder
*   **Text-to-Flow**: Generate complex workflows from simple prompts.
*   **Drag & Drop**: Edit nodes using ReactFlow.
*   **Live Test**: Simulate conversations before deploying.

### 📱 Enterprise Deployment
*   **QR Authentication**: Secure, instance-based login.
*   **Auto-Healing**: Automatic session recovery and reconnection.
*   **Multi-Session**: Handle high-volume traffic.

### 📊 Intelligence Dashboard
*   **ROI Tracking**: Visualize time and cost savings.
*   **Sentiment Analysis**: Monitor user satisfaction.
*   **Inventory Sync**: Two-way sync with Google Sheets.

### 🧠 Hybrid Engine
*   **Gemini Pro**: Handles complex natural language understanding.
*   **Rule Engine**: Executes deterministic business logic (Refudns, Order Status).

---

## 🎨 System Architecture

AutoFlow employs a **Microservices-inspired architecture**. The frontend communicates with the backend via REST, while the backend maintains a persistent WebSocket connection to WhatsApp servers.

```mermaid
graph TD
    User([Customer - WhatsApp])
    WebVisitor([Website Visitor])
    Admin([Admin - Business Owner])
    WA_Servers[WhatsApp Servers]
    Google_AI[Google Gemini AI]
    Google_Sheets[Google Sheets DB]

    subgraph Frontend_React_Vite["Frontend - React + Vite"]
        direction TB
        subgraph Public_Facing["Public Facing"]
            Landing_Page[Landing Page]
            Hero[Hero Section]
            Navbar[Navigation Navbar]
        end
        
        subgraph App_Dashboard["App / Dashboard"]
            UI_Auth[Auth / Login]
            UI_Builder[Logic Builder - ReactFlow]
            UI_Deploy[Deployment Manager]
            UI_Dashboard[ROI Dashboard]
            UI_Sim[Simulator]
        end
    end

    subgraph Backend_Node_Express["Backend - Node.js + Express"]
        API[API Routes - /api]
        
        subgraph Controllers["Controllers"]
            Ctrl_WA[WhatsApp Controller]
            Ctrl_WF[Workflow Controller]
        end
        
        subgraph Core_Services["Core Services"]
            Svc_WA[WhatsApp Service - Baileys]
            Svc_Engine[Logic Engine]
            Svc_AI[AI Service]
            Svc_Sheets[Google Sheet Service]
        end
        
        Session_Store[Local Session Store]
    end

    User -->|E2E Encrypted| WA_Servers
    WebVisitor -->|Visits| Landing_Page
    Landing_Page --> Navbar
    Landing_Page --> Hero
    Navbar -->|Login| UI_Auth
    UI_Auth --> UI_Dashboard
    
    Admin -->|HTTP / WebSocket| UI_Dashboard
    Admin -->|Interacts| UI_Builder

    UI_Deploy -->|POST /whatsapp/deploy| API
    UI_Sim -->|POST /simulate-message| API
    UI_Builder -->|POST /generate-workflow| API

    API --> Ctrl_WA
    API --> Ctrl_WF
    
    Ctrl_WA --> Svc_WA
    Ctrl_WF --> Svc_AI

    Svc_WA -->|WebSocket| WA_Servers
    Svc_WA -->|Persist Auth| Session_Store
    Svc_WA -->|Incoming Msg| Svc_Engine
    Svc_Engine -->|Reply| Svc_WA

    Svc_Engine -->|Read/Write| Svc_Sheets
    Svc_Engine -.->|AI Logic| Svc_AI
    
    Svc_Sheets -->|REST API| Google_Sheets
    Svc_AI -->|REST API| Google_AI
```

### 🧩 Component Breakdown

#### A. Frontend Layer (React)
- **Landing Page Module**: High-conversion entry point with 3D animations.
- **Deployment Manager**: Handles QR code generation and session polling.
- **Logic Builder**: Visual node editor for creating conversation flows.

#### B. Backend Layer (Node.js)
- **WhatsApp Service**: Manages WebSocket connections via Baileys.
- **Logic Engine**: Hybrid processing using Regex for speed and Google Sheets for data.
- **AI Service**: Powered by Google Gemini for natural language understanding.

#### C. Data Persistence
- **Google Sheets**: Acts as a real-time CMS and database.
- **Local Filesystem**: Stores encrypted session credentials.

---

## � Message Processing Workflow

```mermaid
graph TD
    %% STYLES
    classDef user fill:#E5F4FD,stroke:#3B82F6,stroke-width:2px,color:#1e3a8a;
    classDef whatsapp fill:#DCFCE7,stroke:#22C55E,stroke-width:2px,color:#14532d;
    classDef engine fill:#F3E8FF,stroke:#A855F7,stroke-width:2px,color:#581c87;
    classDef sheets fill:#FEF3C7,stroke:#F59E0B,stroke-width:2px,color:#78350f;
    classDef ai fill:#FCE7F3,stroke:#EC4899,stroke-width:2px,color:#831843;

    %% EXTERNAL
    User((👤 User Phone)):::user
    WAServer[☁️ WhatsApp Cloud]:::whatsapp

    %% BACKEND CONTEXT
    subgraph Processing_System ["⚡ AutoFlow Processing System"]
        direction TB
        
        Baileys[🔌 Baileys Socket Service]:::whatsapp
        
        subgraph Engine_Core ["⚙️ Logic Engine Core"]
            Decrypt[🔓 Decrypt & Parse]:::engine
            PreProcess[🧹 Sanitize & Normalization]:::engine
            Router{🚦 Intent Router}:::engine
        end

        subgraph Handlers ["🛠️ Action Handlers"]
            H_Static[📝 Static Response]:::engine
            H_Sheet[📊 Sheet Service]:::sheets
            H_AI[🧠 AI Service]:::ai
        end

        ResponseBuilder[✉️ Response Formatter]:::engine
    end

    %% EXTERNAL DATA
    GSheets[(Google Sheets DB)]:::sheets
    GeminiAPI[✨ Gemini Pro API]:::ai

    %% CONNECTIONS & LOGIC FLOW
    User -->|1. Sends Msg| WAServer
    WAServer -->|2. WebSocket Push| Baileys
    Baileys -->|3. Event: messages.upsert| Decrypt
    Decrypt -->|4. Clean Text| PreProcess
    PreProcess -->|5. Analyzed Text| Router

    %% ROUTING LOGIC
    Router -->|'Hi', 'Menu'| H_Static
    Router -->|'Price', 'Stock'| H_Sheet
    Router -->|'Order', 'Buy'| H_Sheet
    Router -->|Unmatched/Complex| H_AI

    %% HANDLER EXECUTION
    H_Static -->|Get Template| ResponseBuilder
    
    H_Sheet -->|6a. Read/Write| GSheets
    GSheets -->|6b. Data Return| H_Sheet
    H_Sheet -->|Format Data| ResponseBuilder

    H_AI -->|7a. Prompt + Context| GeminiAPI
    GeminiAPI -->|7b. Generated Text| H_AI
    H_AI -->|Natural Response| ResponseBuilder

    %% FINAL REPLY
    ResponseBuilder -->|8. Final Payload| Baileys
    Baileys -->|9. Send Message| WAServer
    WAServer -->|10. Delivers| User
```

---

## �🚀 Quick Start

### 1️⃣ Prerequisites
*   **Node.js** v18 or higher
*   **Google Cloud Console** Account (Enabled Sheets API & Gemini API)

### 2️⃣ Installation
Clone the repository and install dependencies for both services.

```bash
# Clone Repo
git clone https://github.com/yourusername/autoflow.git

# Install Backend
cd autoflow/autoflow-backend
npm install

# Install Frontend
cd ../autoflow-frontend
npm install
```

### 3️⃣ Configuration
Create a `.env` file in `autoflow-backend/`:

```env
PORT=3000
# Get this from Google AI Studio
GEMINI_API_KEY=AIzaSy... 
# ID of your Google Sheet
GOOGLE_SHEET_ID=1xYz...
# Path to your service account json
GOOGLE_APPLICATION_CREDENTIALS=./credentials.json
```

### 4️⃣ Launch

```bash
# Terminal 1: Backend
cd autoflow-backend && npm start

# Terminal 2: Frontend
cd autoflow-frontend && npm run dev
```

Visit **`http://localhost:5173`** to access the dashboard.

---

## 📝 API Reference

<details>
<summary><b>📲 WhatsApp Endpoints (Click to Expand)</b></summary>

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/whatsapp/deploy` | Initializes the session and returns a QR code stream. |
| `GET` | `/api/whatsapp/status` | Returns connection status (`connected`, `scanning`, `disconnected`). |
| `POST` | `/api/whatsapp/logout` | Destroys the current session and clears filesystem auth. |

</details>

<details>
<summary><b>🧠 Workflow & AI Endpoints</b></summary>

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/generate-workflow` | Accepts a natural language prompt and returns a JSON workflow. |
| `POST` | `/api/simulate-message` | Sends a mock message to the engine for testing without WhatsApp. |

</details>

<details>
<summary><b>📊 Data & Sheets Endpoints</b></summary>

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/sheets/inventory` | Syncs and returns current stock levels. |
| `POST` | `/api/sheets/order` | Logs a new order row to the configured Sheet. |

</details>

---

## 📂 Project Structure

```bash
AutoFlow/
├── 📂 assets/                 # Project assets
│
├── 📂 autoflow-frontend/      # React Client (Vite)
│   ├── 📂 public/
│   │   ├── logo.png
│   │   └── vite.svg
│   ├── 📂 src/
│   │   ├── 📂 assets/
│   │   ├── 📂 components/     # Reusable UI Components
│   │   ├── 📂 constants/      # App Constants
│   │   ├── 📂 data/           # Static Data
│   │   ├── 📂 hooks/          # Custom React Hooks
│   │   ├── 📂 pages/          # Page Components
│   │   │   ├── Builder.jsx    # visual Workflow Builder
│   │   │   ├── Dashboard.jsx  # Analytics Dashboard
│   │   │   └── DeployPage.jsx # WhatsApp QR Deployment
│   │   ├── 📂 services/       # API Services (Axios)
│   │   ├── 📂 styles/         # Global Styles
│   │   ├── App.jsx            # Main App Component
│   │   └── main.jsx           # Entry Point
│   ├── 📄 index.html
│   ├── 📄 tailwind.config.js
│   └── 📄 vite.config.js
│
├── 📂 autoflow-backend/       # Node.js Server
│   ├── 📂 auth_info_baileys/  # WhatsApp Session Data (Generated)
│   ├── 📂 src/
│   │   ├── 📂 config/         # App Config
│   │   ├── 📂 controllers/    # Request Handlers
│   │   ├── 📂 routes/         # API Route Definitions
│   │   ├── 📂 services/       # Business Logic
│   │   │   ├── ai.service.js          # Gemini Integration
│   │   │   ├── engine.service.js      # Core Logic Engine
│   │   │   ├── googleSheet.service.js # Sheets API
│   │   │   └── whatsapp.service.js    # Baileys Socket
│   │   └── app.js             # Express App Setup
│   ├── 📂 uploads/            # File Uploads
│   ├── 📄 server.js           # Server Entry Point
│   ├── 📄 credentials.json    # Google Service Account Key
│   └── 📄 verify_orders_tab.js
│
├── 📂 landing/                # Static Landing Page
│   ├── index.html
│   ├── script.js
│   └── styles.css
│
└── 📄 README.md               # Documentation
```

---

## 🔧 Troubleshooting

<details>
<summary><b>❓ QR Code Not Generating</b></summary>

*   **Cause**: A session might already be hung in the background.
*   **Fix**: Click the "Force Logout" button in the UI or manually delete the `autoflow-backend/auth_info_baileys` folder and restart the server.

</details>

<details>
<summary><b>❓ Google Sheets 403 Error</b></summary>

*   **Cause**: The Service Account email has not been invited to edit the Sheet.
*   **Fix**: Copy the `client_email` from `credentials.json` and share your Google Sheet with that email as an **Editor**.

</details>

<details>
<summary><b>❓ AI Not Responding</b></summary>

*   **Cause**: API Key quota exceeded or invalid key.
*   **Fix**: Check your `GEMINI_API_KEY` in `.env`. Ensure billing is enabled if using Pro models heavily.

</details>
