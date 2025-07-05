"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Code, Terminal, Eye, Chrome, Settings, Play } from "lucide-react"

export function ToolsPanel() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const tools = [
    {
      id: "console",
      name: "Console Methods",
      icon: Terminal,
      description: "Métodos built-in do Node.js para debugging",
      category: "basic",
      methods: [
        { name: "console.log()", desc: "Output básico para debugging" },
        { name: "console.error()", desc: "Exibir mensagens de erro" },
        { name: "console.warn()", desc: "Exibir avisos" },
        { name: "console.table()", desc: "Exibir dados em formato tabular" },
        { name: "console.time()", desc: "Medir tempo de execução" },
        { name: "console.trace()", desc: "Mostrar stack trace" },
      ],
    },
    {
      id: "inspector",
      name: "Node.js Inspector",
      icon: Eye,
      description: "Debugger integrado do Node.js",
      category: "advanced",
      commands: [
        { cmd: "node --inspect script.js", desc: "Iniciar com debugger" },
        { cmd: "node --inspect-brk script.js", desc: "Pausar no início" },
        { cmd: "chrome://inspect", desc: "Abrir DevTools no Chrome" },
      ],
    },
    {
      id: "vscode",
      name: "VS Code Debugger",
      icon: Code,
      description: "Debugger integrado do Visual Studio Code",
      category: "ide",
      features: [
        "Breakpoints visuais",
        "Watch variables",
        "Call stack inspection",
        "Debug console",
        "Step through code",
      ],
    },
    {
      id: "chrome",
      name: "Chrome DevTools",
      icon: Chrome,
      description: "Ferramentas de desenvolvimento do Chrome para Node.js",
      category: "browser",
      commands: [
        { cmd: "node --inspect-brk app.js", desc: "Iniciar com debugger pausado" },
        { cmd: "chrome://inspect", desc: "Abrir interface de debugging" },
        { cmd: "Open dedicated DevTools for Node", desc: "Abrir DevTools dedicado" },
      ],
      features: [
        "Inspecionar variáveis em tempo real",
        "Ver stack trace completo",
        "Usar breakpoints visuais",
        "Executar comandos no console",
        "Profiling de performance",
        "Inspeção de memória",
      ],
    },
  ]

  const configurations = {
    vscode: `{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Node App",
      "program": "\${workspaceFolder}/app.js",
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}`,
    package: `{
  "scripts": {
    "dev": "NODE_OPTIONS='--inspect' node app.js",
    "debug": "node --inspect-brk app.js",
    "test:debug": "NODE_OPTIONS='--inspect-brk' npm test"
  }
}`,
    ndb: `# Instalação do ndb (Node Debugger by Google)
npm install -g ndb

# Uso
ndb app.js

# Recursos:
- Quebra na primeira linha automaticamente
- Inspeção de memória
- Profiling de performance
- Interface DevTools dedicada`,
  }

  const additionalTools = [
    {
      name: "ndb (Node Debugger)",
      description: "Debugger moderno by Google",
      installation: "npm install -g ndb",
      usage: "ndb app.js",
      features: ["Quebra automática", "Inspeção de memória", "Profiling"],
    },
    {
      name: "node-inspector",
      description: "Ferramenta descontinuada (ainda citada)",
      installation: "npm install -g node-inspector",
      usage: "node-debug app.js",
      status: "Descontinuado - use Chrome DevTools",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Tools Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => {
          const IconComponent = tool.icon
          return (
            <Card
              key={tool.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTool === tool.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{tool.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {tool.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-gray-600">{tool.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tool Details */}
      {selectedTool && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(() => {
                const tool = tools.find((t) => t.id === selectedTool)
                const IconComponent = tool?.icon || Settings
                return <IconComponent className="h-5 w-5" />
              })()}
              {tools.find((t) => t.id === selectedTool)?.name}
            </CardTitle>
            <CardDescription>{tools.find((t) => t.id === selectedTool)?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="usage">Como Usar</TabsTrigger>
                <TabsTrigger value="config">Configuração</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {selectedTool === "console" && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">Métodos Disponíveis:</h4>
                    {tools
                      .find((t) => t.id === "console")
                      ?.methods?.map((method, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <Badge variant="outline" className="font-mono text-xs">
                            {method.name}
                          </Badge>
                          <span className="text-sm text-gray-600">{method.desc}</span>
                        </div>
                      ))}
                  </div>
                )}

                {selectedTool === "inspector" && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">Comandos Principais:</h4>
                    {tools
                      .find((t) => t.id === "inspector")
                      ?.commands?.map((command, index) => (
                        <div key={index} className="space-y-2 p-3 bg-gray-50 rounded-lg">
                          <code className="text-sm bg-black text-green-400 px-2 py-1 rounded">{command.cmd}</code>
                          <p className="text-sm text-gray-600">{command.desc}</p>
                        </div>
                      ))}
                  </div>
                )}

                {(selectedTool === "vscode" || selectedTool === "chrome") && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">Recursos Principais:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {tools
                        .find((t) => t.id === selectedTool)
                        ?.features?.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="usage" className="space-y-4">
                <Alert>
                  <Play className="h-4 w-4" />
                  <AlertDescription>
                    Instruções passo a passo para usar {tools.find((t) => t.id === selectedTool)?.name}
                  </AlertDescription>
                </Alert>

                {selectedTool === "console" && (
                  <div className="space-y-4">
                    <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                      <div>// Exemplo de uso dos métodos console</div>
                      <div>console.log('Debugging info:', variable);</div>
                      <div>console.error('Erro encontrado:', error);</div>
                      <div>console.table(arrayData);</div>
                      <div>console.time('operacao');</div>
                      <div>// ... código ...</div>
                      <div>console.timeEnd('operacao');</div>
                    </div>
                  </div>
                )}

                {selectedTool === "inspector" && (
                  <div className="space-y-4">
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>
                        Execute: <code className="bg-gray-100 px-2 py-1 rounded">node --inspect app.js</code>
                      </li>
                      <li>
                        Abra o Chrome e vá para <code className="bg-gray-100 px-2 py-1 rounded">chrome://inspect</code>
                      </li>
                      <li>Clique em "Configure" e adicione localhost:9229</li>
                      <li>Clique em "inspect" no seu processo Node.js</li>
                      <li>Use a aba "Sources" para adicionar breakpoints</li>
                    </ol>
                  </div>
                )}

                {selectedTool === "chrome" && (
                  <div className="space-y-4">
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>
                        Execute: <code className="bg-gray-100 px-2 py-1 rounded">node --inspect-brk app.js</code>
                      </li>
                      <li>
                        Abra o Chrome e vá para <code className="bg-gray-100 px-2 py-1 rounded">chrome://inspect</code>
                      </li>
                      <li>Clique em "Open dedicated DevTools for Node"</li>
                      <li>O Chrome abre um depurador como se estivesse debugando código frontend</li>
                      <li>Use as abas Sources, Console, Memory e Profiler</li>
                    </ol>

                    <Alert>
                      <Chrome className="h-4 w-4" />
                      <AlertDescription>
                        O Chrome DevTools para Node.js oferece a mesma experiência de debugging do frontend, mas para
                        código servidor!
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="config" className="space-y-4">
                {selectedTool === "vscode" && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Arquivo .vscode/launch.json:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                      {configurations.vscode}
                    </pre>
                  </div>
                )}

                <div className="space-y-4">
                  <h4 className="font-semibold">Scripts no package.json:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {configurations.package}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
