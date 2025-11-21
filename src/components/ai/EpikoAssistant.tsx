"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const sampleMessages = [
  { role: "assistant", content: "Hi! I'm your Epiko AI Assistant. How can I help you today?" },
]

export function EpikoAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(sampleMessages)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    setMessages([...messages, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content: "I'm here to help! This is a demo response. In the full version, I'll be able to answer questions about the Epiko ecosystem, games, NFTs, and rewards."
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)

    setInput("")
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#866bff] text-white shadow-[0_0_20px_rgba(134,107,255,0.5)] flex items-center justify-center z-50 border border-white/20"
          >
            <Sparkles className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[380px] h-[600px] z-50 flex flex-col shadow-2xl"
          >
            <Card className="flex-1 flex flex-col bg-[#1c1f2a]/90 backdrop-blur-xl border-white/10 overflow-hidden rounded-3xl shadow-2xl">
              <CardHeader className="bg-[#866bff] text-white p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                       <Bot className="h-5 w-5" />
                    </div>
                    <div>
                       <CardTitle className="text-white text-lg">Epiko AI</CardTitle>
                       <p className="text-xs text-white/80 font-medium">Always here to help</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4" ref={scrollRef}>
                    {messages.map((msg, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl p-4 ${
                            msg.role === "user"
                              ? "bg-[#866bff] text-white rounded-tr-sm"
                              : "bg-white/10 text-gray-100 rounded-tl-sm border border-white/5"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 bg-black/20 border-t border-white/5 backdrop-blur-md">
                  <div className="relative flex items-center gap-2">
                    <Input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ask me anything..."
                      className="flex-1 rounded-xl border-white/10 bg-white/5 px-4 py-6 text-white placeholder:text-gray-500 focus-visible:ring-[#866bff] pr-12"
                    />
                    <Button
                      size="icon"
                      onClick={handleSend}
                      className="absolute right-2 h-8 w-8 bg-[#99ee2d] text-black hover:bg-[#88d428] rounded-lg"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-[10px] text-center text-gray-500 mt-3">
                    Powered by Epiko AI • Ask about games, NFTs, rewards, and more
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
