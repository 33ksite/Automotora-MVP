"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Message = {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
};

export type CarData = {
    id: string;
    model: string;
    price: string;
    specs?: string;
};

interface ChatContextType {
    messages: Message[];
    addMessage: (text: string, sender: 'user' | 'ai') => void;
    cars: CarData[];
    addCar: (car: Omit<CarData, 'id'>) => void;
    isChatOpen: boolean;
    setIsChatOpen: (isOpen: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const CHAT_CHANNEL_NAME = 'luxeauto_chat_sync';

/**
 * ChatProvider uses BroadcastChannel to sync state across browser tabs in real-time.
 * This ensures the client tab and admin tab see messages instantly without a real backend.
 */
export function ChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Bienvenido a LUXEAUTO. Soy tu asistente virtual. ¿En qué vehículo extraordinario estás interesado hoy?',
            sender: 'ai',
            timestamp: new Date()
        }
    ]);

    const [cars, setCars] = useState<CarData[]>([
        { id: '1', model: 'Range Rover Heritage 1991', price: '$145,000' },
        { id: '2', model: 'Porsche 911 Carrera', price: '$209,000' },
        { id: '3', model: 'Mercedes-Benz G550', price: '$156,000' }
    ]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        const channel = new BroadcastChannel(CHAT_CHANNEL_NAME);

        channel.onmessage = (event) => {
            const { type, payload } = event.data;
            if (type === 'NEW_MESSAGE') {
                // Recover date object
                const msg = { ...payload, timestamp: new Date(payload.timestamp) };
                setMessages(prev => {
                    // prevent duplicates if already added locally
                    if (prev.some(m => m.id === msg.id)) return prev;
                    return [...prev, msg];
                });
            } else if (type === 'NEW_CAR') {
                setCars(prev => {
                    if (prev.some(c => c.id === payload.id)) return prev;
                    return [...prev, payload];
                });
            }
        };

        return () => channel.close();
    }, []);

    const addMessage = (text: string, sender: 'user' | 'ai') => {
        if (!text.trim()) return;
        const msg: Message = { id: Date.now().toString(), text, sender, timestamp: new Date() };
        setMessages(prev => [...prev, msg]);

        const channel = new BroadcastChannel(CHAT_CHANNEL_NAME);
        channel.postMessage({ type: 'NEW_MESSAGE', payload: msg });
        channel.close();
    };

    const addCar = (car: Omit<CarData, 'id'>) => {
        const newCar = { ...car, id: Date.now().toString() };
        setCars(prev => [...prev, newCar]);

        const channel = new BroadcastChannel(CHAT_CHANNEL_NAME);
        channel.postMessage({ type: 'NEW_CAR', payload: newCar });
        channel.close();
    };

    return (
        <ChatContext.Provider value={{ messages, addMessage, cars, addCar, isChatOpen, setIsChatOpen }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
