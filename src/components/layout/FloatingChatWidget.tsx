"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

// Placeholder for future context integration
export const ChatContext = React.createContext<any>(null)

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[350px] h-[500px] bg-background border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b bg-primary text-primary-foreground flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <h3 className="font-semibold text-sm">Asistente Virtual</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 text-primary-foreground hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Area (Mocked) */}
            <div className="flex-1 p-4 bg-muted/30 overflow-y-auto space-y-4">
              <div className="flex justify-start">
                <div className="bg-white border text-foreground rounded-lg p-3 max-w-[80%] text-sm shadow-sm">
                  Hola, ¿en qué puedo ayudarte con tu nuevo Range Rover?
                </div>
              </div>
               <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%] text-sm shadow-sm">
                  Me gustaría saber más sobre el modelo Sport.
                </div>
              </div>
            </div>

            {/* Input Area */}
            <form className="p-3 border-t bg-background flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 text-sm bg-transparent outline-none px-2 text-foreground placeholder:text-muted-foreground"
              />
              <Button size="icon" variant="ghost" type="submit" className="h-8 w-8 text-primary hover:bg-primary/10">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105"
        aria-label="Toggle Chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  )
}
