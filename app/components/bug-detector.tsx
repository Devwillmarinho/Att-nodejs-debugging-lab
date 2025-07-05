"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Bug, CheckCircle, AlertTriangle, Play, RotateCcw } from "lucide-react"

interface BugDetectorProps {
  onBugsFound: (count: number) => void
  onBugsFixed: (count: number) => void
  onProgressUpdate: () => void
}

export function BugDetector({ onBugsFound, onBugsFixed, onProgressUpdate }: BugDetectorProps) {
  const [code, setCode] = useState("")
  const [bugs, setBugs] = useState<
    Array<{
      id: number
      type: string
      line: number
      description: string
      severity: "high" | "medium" | "low"
      fixed: boolean
    }>
  >([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedBug, setSelectedBug] = useState<number | null>(null)

  const buggyCode = `function calculateAverage(numbers) {
  let sum = 0;
  // Bug: loop incorreto
  for (let i = 0; i <= numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}

function processUser(user) {
  // Bug: não verifica se user existe
  const fullName = user.firstName + " " + user.lastName;
  return {
    name: fullName,
    email: user.email.toLowerCase() // Bug: email pode ser undefined
  };
}

function findMaxValue(arr) {
  // Bug: não verifica array vazio
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`

  const detectBugs = () => {
    setIsAnalyzing(true)

    setTimeout(() => {
      const detectedBugs = [
        {
          id: 1,
          type: "Array Index Error",
          line: 4,
          description: "Loop condition permite acesso a índice inexistente (i <= length)",
          severity: "high" as const,
          fixed: false,
        },
        {
          id: 2,
          type: "Null Reference",
          line: 11,
          description: "Propriedade user pode ser undefined",
          severity: "high" as const,
          fixed: false,
        },
        {
          id: 3,
          type: "Property Access Error",
          line: 14,
          description: "user.email pode ser undefined, causará erro em toLowerCase()",
          severity: "medium" as const,
          fixed: false,
        },
        {
          id: 4,
          type: "Empty Array Error",
          line: 19,
          description: "Função não trata array vazio, retornará undefined",
          severity: "medium" as const,
          fixed: false,
        },
      ]

      setBugs(detectedBugs)
      onBugsFound(detectedBugs.length)
      setIsAnalyzing(false)
    }, 2000)
  }

  const fixBug = (bugId: number) => {
    setBugs((prev) => prev.map((bug) => (bug.id === bugId ? { ...bug, fixed: true } : bug)))

    const fixedCount = bugs.filter((bug) => bug.fixed).length + 1
    onBugsFixed(fixedCount)
    onProgressUpdate()
  }

  const resetAnalysis = () => {
    setBugs([])
    setCode("")
    onBugsFound(0)
    onBugsFixed(0)
    onProgressUpdate()
  }

  useEffect(() => {
    setCode(buggyCode)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Code Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Código para Análise
          </CardTitle>
          <CardDescription>Cole ou edite o código Node.js que deseja analisar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Cole seu código Node.js aqui..."
            className="min-h-[300px] font-mono text-sm"
          />

          <div className="flex gap-2">
            <Button onClick={detectBugs} disabled={isAnalyzing || !code.trim()} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              {isAnalyzing ? "Analisando..." : "Detectar Bugs"}
            </Button>

            <Button variant="outline" onClick={resetAnalysis} className="flex items-center gap-2 bg-transparent">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bug Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Bugs Detectados
          </CardTitle>
          <CardDescription>Clique em "Corrigir" para marcar um bug como resolvido</CardDescription>
        </CardHeader>
        <CardContent>
          {isAnalyzing ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2">Analisando código...</span>
            </div>
          ) : bugs.length === 0 ? (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>Nenhum bug detectado ainda. Execute a análise para começar.</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {bugs.map((bug) => (
                <Card
                  key={bug.id}
                  className={`transition-all cursor-pointer ${
                    selectedBug === bug.id ? "ring-2 ring-blue-500" : ""
                  } ${bug.fixed ? "opacity-60" : ""}`}
                  onClick={() => setSelectedBug(selectedBug === bug.id ? null : bug.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(bug.severity)}>{bug.severity.toUpperCase()}</Badge>
                          <Badge variant="outline">Linha {bug.line}</Badge>
                          {bug.fixed && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Corrigido
                            </Badge>
                          )}
                        </div>

                        <h4 className="font-semibold">{bug.type}</h4>
                        <p className="text-sm text-gray-600">{bug.description}</p>

                        {selectedBug === bug.id && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <h5 className="font-medium mb-2">Como corrigir:</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {bug.id === 1 && (
                                <>
                                  <li>
                                    • Alterar condição de <code>i &lt;= numbers.length</code> para{" "}
                                    <code>i &lt; numbers.length</code>
                                  </li>
                                  <li>• Adicionar validação para array vazio</li>
                                </>
                              )}
                              {bug.id === 2 && (
                                <>
                                  <li>
                                    • Verificar se <code>user</code> existe antes de acessar propriedades
                                  </li>
                                  <li>
                                    • Usar <code>if (!user) throw new Error(...)</code>
                                  </li>
                                </>
                              )}
                              {bug.id === 3 && (
                                <>
                                  <li>
                                    • Verificar se <code>user.email</code> existe
                                  </li>
                                  <li>
                                    • Usar <code>user.email?.toLowerCase()</code> ou validação condicional
                                  </li>
                                </>
                              )}
                              {bug.id === 4 && (
                                <>
                                  <li>
                                    • Adicionar verificação <code>if (arr.length === 0)</code>
                                  </li>
                                  <li>• Retornar valor padrão ou lançar erro apropriado</li>
                                </>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>

                      {!bug.fixed && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            fixBug(bug.id)
                          }}
                          className="ml-2"
                        >
                          Corrigir
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
