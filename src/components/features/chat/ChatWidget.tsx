"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { useChat } from "@/lib/context/ChatContext";

interface Message {
    role: "user" | "assistant";
    text: string;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState("");
    const [isTyping, setIsTyping] = React.useState(false);
    const [sessionId, setSessionId] = React.useState<string>("");
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const { isChatOpen, setIsChatOpen, pendingAIMessage, clearPendingAIMessage } = useChat();

    // Initialize session ID
    React.useEffect(() => {
        let storedSession = localStorage.getItem("dante_session_id");
        if (!storedSession) {
            storedSession = crypto.randomUUID();
            localStorage.setItem("dante_session_id", storedSession);
        }
        setSessionId(storedSession);

        // Initial greeting if no messages
        if (messages.length === 0) {
            setMessages([
                {
                    role: "assistant",
                    text: "Hola! Soy Dante, tu asesor virtual. ¿En que puedo ayudarte?",
                },
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Auto-scroll
    React.useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    const sendMessageToAI = async (userMessage: string) => {
        setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
        setIsTyping(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_DANTE_API_URL || "";
            const response = await fetch(`${apiUrl}/api/chat/direct`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tenantId: "d28a1c9e-4f4b-8b11-9bc1-1a2b3c4d5e6f", // UUID de Automotora Dante en la DB
                    userId: sessionId,
                    text: userMessage,
                }),
            });

            if (!response.ok) throw new Error("Error en la conexión con el servidor");
            const data = await response.json();
            setMessages((prev) => [...prev, { role: "assistant", text: data.text }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "Lo siento, tuve un problema al procesar tu solicitud. Por favor, intenta de nuevo en un momento." },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    // Listen for incoming messages from CarCards across the site
    React.useEffect(() => {
        if (pendingAIMessage) {
            const msg = pendingAIMessage;
            clearPendingAIMessage();
            sendMessageToAI(msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pendingAIMessage]);

    const handleSend = () => {
        if (!input.trim() || isTyping) return;
        const msg = input.trim();
        setInput("");
        sendMessageToAI(msg);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="mb-4 w-[350px] sm:w-[400px] bg-slate-950/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col pointer-events-auto"
                        style={{ height: "min(600px, calc(100vh - 120px))" }}
                    >
                        {/* Header */}
                        <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <div>
                                    <h3 className="text-white font-black uppercase tracking-widest text-xs">Dante AI</h3>
                                    <p className="text-white/50 text-[10px] uppercase font-light tracking-wide">Asistente Virtual</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsChatOpen(false)}
                                className="text-white/50 hover:text-white transition-colors p-1"
                                aria-label="Cerrar chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl py-3 px-4 ${message.role === "user"
                                            ? "bg-primary text-primary-foreground rounded-br-sm"
                                            : "bg-white/10 text-white rounded-bl-sm border border-white/5"
                                            }`}
                                    >
                                        <p className={`text-sm ${message.role === "assistant" ? "font-light" : "font-medium"} leading-relaxed whitespace-pre-wrap break-words`}>
                                            {message.text}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/10 text-white rounded-2xl rounded-bl-sm py-4 px-5 border border-white/5 flex gap-1.5 items-center">
                                        <motion.div className="w-1.5 h-1.5 bg-white/50 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                                        <motion.div className="w-1.5 h-1.5 bg-white/50 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                                        <motion.div className="w-1.5 h-1.5 bg-white/50 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-black/20 border-t border-white/10">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Escribe tu consulta..."
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-light tracking-wide"
                                    disabled={isTyping}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-2 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                                    aria-label="Enviar mensaje"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/30 text-white z-50 pointer-events-auto"
                aria-label="Abrir chat de asistencia"
            >
                <AnimatePresence mode="wait">
                    {isChatOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageSquare className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
