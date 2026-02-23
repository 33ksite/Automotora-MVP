"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useChat } from "@/lib/context/ChatContext"

export function FloatingChatWidget() {
  const { messages, addMessage, isChatOpen, setIsChatOpen } = useChat()
  const [inputText, setInputText] = React.useState("")
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    if (isChatOpen) {
      scrollToBottom()
    }
  }, [messages, isChatOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return
    addMessage(inputText, 'user')
    setInputText("")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[350px] h-[500px] bg-background border border-border/50 rounded-xl shadow-2xl flex flex-col overflow-hidden glass-hover"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/50 bg-eclipse text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_5px_rgba(74,222,128,0.5)]" />
                <h3 className="font-semibold text-sm tracking-wide">Asistente Virtual</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsChatOpen(false)}
                className="h-6 w-6 text-white hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 bg-muted/20 overflow-y-auto space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`rounded-lg p-3 max-w-[80%] text-sm shadow-sm ${msg.sender === 'user'
                      ? 'bg-eclipse text-white rounded-tr-none'
                      : 'bg-white border border-border/30 text-foreground rounded-tl-none font-serif text-[15px] leading-relaxed tracking-wide'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form className="p-3 border-t border-border/50 bg-background flex gap-2" onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tu consulta..."
                className="flex-1 text-sm bg-transparent outline-none px-2 text-foreground placeholder:text-muted-foreground"
              />
              <Button size="icon" variant="ghost" type="submit" className="h-8 w-8 text-eclipse hover:bg-eclipse/10">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg bg-eclipse text-white hover:bg-eclipse/90 transition-transform hover:scale-105 border-2 border-almond/20"
        aria-label="Toggle Chat"
      >
        {isChatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  )
}
