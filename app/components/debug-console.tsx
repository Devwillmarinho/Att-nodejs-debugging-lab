"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Terminal, Play, Trash2, Download } from "lucide-react"

interface ConsoleMessage {
  id: number
  type: "log" | "error" | "warn" | "info" | "success"
  message: string
  timestamp: string
}

export function DebugConsole() {
  const [messages, setMessages] = useState<ConsoleMessage[]>([])
  const [command, setCommand] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const addMessage = (type: ConsoleMessage["type"], message: string) => {
    const newMessage: ConsoleMessage = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const executeCommand = async () => {
    if (!command.trim()) return

    setIsExecuting(true)
    addMessage("info", `> ${command}`)

    // Simular diferentes comandos de debugging
    setTimeout(() => {
      switch (command.toLowerCase()) {
        case "node --inspect app.js":
          addMessage("success", "Debugger listening on ws://127.0.0.1:9229/")
          addMessage("log", "For help, see: https://nodejs.org/en/docs/inspector")
          addMessage("success", "Server started on http://localhost:3000")
          break

        case "node --inspect-brk app.js":
          addMessage("success", "Debugger listening on ws://127.0.0.1:9229/")
          addMessage("info", "For help, see: https://nodejs.org/en/docs/inspector")
          addMessage("log", "Waiting for the debugger to disconnect...")
          addMessage("success", "✅ Chrome DevTools: chrome://inspect")
          break

        case "chrome://inspect":
          addMessage("info", "Abrindo Chrome DevTools...")
          addMessage("success", "✅ Interface de debugging carregada")
          addMessage("log", "Clique em 'Open dedicated DevTools for Node'")
          break

        case "ndb app.js":
          addMessage("info", "Iniciando ndb (Node Debugger by Google)...")
          addMessage("success", "✅ DevTools window opened")
          addMessage("log", "Breakpoint automático na primeira linha")
          addMessage("log", "Recursos: Memory inspection, Performance profiling")
          break

        case 'console.log("debug test")':
          addMessage("log", "debug test")
          break

        case 'console.error("test error")':
          addMessage("error", "test error")
          break

        case 'console.warn("test warning")':
          addMessage("warn", "test warning")
          break

        case "npm test":
          addMessage("log", "Running tests...")
          setTimeout(() => {
            addMessage("success", "✓ All tests passed")
            addMessage("log", "Test Suites: 1 passed, 1 total")
            addMessage("log", "Tests: 4 passed, 4 total")
          }, 1000)
          break

        case "node --version":
          addMessage("log", "v18.17.0")
          break

        case "help":
          addMessage("info", "Comandos disponíveis:")
          addMessage("log", "• node --inspect app.js - Iniciar com debugger")
          addMessage("log", "• node --inspect-brk app.js - Iniciar com debugger e aguardar conexão")
          addMessage("log", "• ndb app.js - Iniciar com Node Debugger by Google")
          addMessage("log", '• console.log("message") - Log de debug')
          addMessage("log", '• console.error("message") - Log de erro')
          addMessage("log", "• npm test - Executar testes")
          addMessage("log", "• clear - Limpar console")
          break

        case "clear":
          setMessages([])
          setIsExecuting(false)
          setCommand("")
          return

        default:
          addMessage("error", `Comando não reconhecido: ${command}`)
          addMessage("info", 'Digite "help" para ver comandos disponíveis')
      }

      setIsExecuting(false)
      setCommand("")
    }, 1000)
  }

  const clearConsole = () => {
    setMessages([])
  }

  const downloadLogs = () => {
    const logs = messages.map((msg) => `[${msg.timestamp}] ${msg.type.toUpperCase()}: ${msg.message}`).join("\n")

    const blob = new Blob([logs], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "debug-logs.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const getMessageColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-400"
      case "warn":
        return "text-yellow-400"
      case "success":
        return "text-green-400"
      case "info":
        return "text-blue-400"
      default:
        return "text-gray-300"
    }
  }

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "error":
        return "❌"
      case "warn":
        return "⚠️"
      case "success":
        return "✅"
      case "info":
        return "ℹ️"
      default:
        return "📝"
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Adicionar mensagens iniciais
  useEffect(() => {
    addMessage("info", "Console de Debug Node.js iniciado")
    addMessage("log", 'Digite "help" para ver comandos disponíveis')
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Console de Debug Interativo
              </CardTitle>
              <CardDescription>Simule comandos de debugging e veja a saída em tempo real</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={downloadLogs}>
                <Download className="h-4 w-4 mr-2" />
                Baixar Logs
              </Button>
              <Button variant="outline" size="sm" onClick={clearConsole}>
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Console Output */}
          <div className="bg-black rounded-lg p-4 h-96 overflow-hidden">
            <ScrollArea className="h-full" ref={scrollRef}>
              <div className="space-y-2 font-mono text-sm">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-2">
                    <span className="text-gray-500 text-xs mt-1">{msg.timestamp}</span>
                    <span className="text-xs mt-1">{getMessageIcon(msg.type)}</span>
                    <span className={getMessageColor(msg.type)}>{msg.message}</span>
                  </div>
                ))}
                {isExecuting && (
                  <div className="flex items-center gap-2 text-yellow-400">
                    <div className="animate-spin rounded-full h-3 w-3 border-b border-yellow-400"></div>
                    <span>Executando...</span>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Command Input */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-mono">$</span>
              <Input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && executeCommand()}
                placeholder="Digite um comando (ex: node --inspect app.js)"
                className="pl-8 font-mono"
                disabled={isExecuting}
              />
            </div>
            <Button
              onClick={executeCommand}
              disabled={isExecuting || !command.trim()}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Executar
            </Button>
          </div>

          {/* Quick Commands */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setCommand("node --inspect app.js")}
            >
              node --inspect
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setCommand("node --inspect-brk app.js")}
            >
              --inspect-brk
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setCommand("ndb app.js")}
            >
              ndb
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setCommand("npm test")}
            >
              npm test
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setCommand('console.log("debug test")')}
            >
              console.log
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => setCommand("help")}>
              help
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
