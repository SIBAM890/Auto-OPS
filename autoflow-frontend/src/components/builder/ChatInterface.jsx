import { useState, useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { workflowApi } from '../../services/workflowApi';
import { Paperclip, FileText, X } from 'lucide-react'; // Import Icons

export const ChatInterface = ({ onWorkflowGenerated }) => {
    const [messages, setMessages] = useState([
        { role: 'ai', content: "🤖 Hi! I'm AutoFlow. Upload your inventory file (Excel/CSV) for better accuracy, or just describe what you need!" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null); // { name, context }
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, uploadedFile]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsLoading(true);
        try {
            const data = await workflowApi.uploadFile(file);
            setUploadedFile({ name: data.fileName, context: data.context });
            setMessages(prev => [...prev, {
                role: 'system',
                content: `📂 Attached: ${data.fileName} (I'll use this data for your next workflow)`
            }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'system', content: "❌ Upload Failed: " + error.response?.data?.error || error.message }]);
        } finally {
            setIsLoading(false);
            if (fileInputRef.current) fileInputRef.current.value = ""; // Reset
        }
    };

    const clearFile = () => setUploadedFile(null);

    const handleSend = async (text) => {
        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setIsLoading(true);

        try {
            // Call API with File Context
            const fileContext = uploadedFile?.context || null;
            const data = await workflowApi.generate(text, fileContext);

            // Add AI response
            setMessages(prev => [...prev, {
                role: 'ai',
                content: "✅ Workflow generated based on your request" + (fileContext ? " and file data." : ".")
            }]);

            // Pass workflow data to parent
            if (onWorkflowGenerated && data.workflow) {
                onWorkflowGenerated(data.workflow);
            }

            // Optional: Clear file after use? Or keep it? Let's keep it for context unless manually cleared.

        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: "❌ Sorry, I encountered an error while building the workflow. Please try again.",
                error: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                    <MessageBubble key={i} message={msg} />
                ))}

                {isLoading && (
                    <div className="mr-auto">
                        <TypingIndicator />
                        <span className="text-xs text-gray-400 ml-2">Processing...</span>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* File Attachment Indicator */}
            {uploadedFile && (
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                        <FileText size={16} />
                        <span>Using: {uploadedFile.name}</span>
                    </div>
                    <button onClick={clearFile} className="text-gray-400 hover:text-red-500">
                        <X size={16} />
                    </button>
                </div>
            )}

            <div className="border-t border-gray-100 p-2 flex items-center gap-2">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".csv, .xlsx, .xls"
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Upload Inventory/Data"
                >
                    <Paperclip size={20} />
                </button>
                <div className="flex-1">
                    <ChatInput onSend={handleSend} disabled={isLoading} />
                </div>
            </div>
        </div>
    );
};
