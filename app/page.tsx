"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CodeEditor } from "./components/code-editor"
import { BugDetector } from "./components/bug-detector"
import { DebugConsole } from "./components/debug-console"
import { ToolsPanel } from "./components/tools-panel"
import { InteractiveDemo } from "./components/interactive-demo"
import { Bug, CheckCircle, AlertTriangle, Code, Zap } from "lucide-react"

export default function DebuggingDashboard() {
  const [activeTab, setActiveTab] = useState("detector")
  const [bugsFound, setBugsFound] = useState(0)
  const [bugsFixed, setBugsFixed] = useState(0)
  const [debuggingProgress, setDebuggingProgress] = useState(0)

  const updateProgress = () => {
    const progress = bugsFixed > 0 ? (bugsFixed / bugsFound) * 100 : 0
    setDebuggingProgress(progress)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-red-100 rounded-full">
              <Bug className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Node.js Debugging Lab</h1>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plataforma interativa para aprender e praticar técnicas de depuração em Node.js
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Bug className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-700">{bugsFound}</p>
                  <p className="text-sm text-red-600">Bugs Detectados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-700">{bugsFixed}</p>
                  <p className="text-sm text-green-600">Bugs Corrigidos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Code className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-700">4</p>
                  <p className="text-sm text-blue-600">Ferramentas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-700">{Math.round(debuggingProgress)}%</p>
                  <p className="text-sm text-purple-600">Progresso</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso do Debugging</span>
                <span>{Math.round(debuggingProgress)}%</span>
              </div>
              <Progress value={debuggingProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="detector" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Detector
            </TabsTrigger>
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="console" className="flex items-center gap-2">
              <Bug className="h-4 w-4" />
              Console
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Ferramentas
            </TabsTrigger>
            <TabsTrigger value="demo" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Demo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="detector">
            <BugDetector onBugsFound={setBugsFound} onBugsFixed={setBugsFixed} onProgressUpdate={updateProgress} />
          </TabsContent>

          <TabsContent value="editor">
            <CodeEditor />
          </TabsContent>

          <TabsContent value="console">
            <DebugConsole />
          </TabsContent>

          <TabsContent value="tools">
            <ToolsPanel />
          </TabsContent>

          <TabsContent value="demo">
            <InteractiveDemo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
