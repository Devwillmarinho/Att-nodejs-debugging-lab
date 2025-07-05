"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Play, Pause, RotateCcw, CheckCircle, AlertTriangle, Code } from "lucide-react"

interface Step {
  id: number
  title: string
  description: string
  code: string
  expectedOutput: string
  bugType: string
  completed: boolean
}

export function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState("")
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps: Step[] = [
    {
      id: 1,
      title: "Detectar Bug de Array Index",
      description: "Identifique o problema no loop que causa acesso a índice inexistente",
      code: `function calculateSum(numbers) {
  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) {
    console.log('Acessando índice:', i, 'Valor:', numbers[i]);
    sum += numbers[i];
  }
  return sum;
}

calculateSum([1, 2, 3]);`,
      expectedOutput: `Acessando índice: 0 Valor: 1
Acessando índice: 1 Valor: 2
Acessando índice: 2 Valor: 3
Acessando índice: 3 Valor: undefined
❌ Bug: Acesso a índice inexistente!`,
      bugType: "Array Index Error",
      completed: false,
    },
    {
      id: 2,
      title: "Corrigir Loop Condition",
      description: "Corrija a condição do loop para evitar acesso a índices inexistentes",
      code: `function calculateSum(numbers) {
  let sum = 0;
  // Correção: i < numbers.length (não <=)
  for (let i = 0; i < numbers.length; i++) {
    console.log('Acessando índice:', i, 'Valor:', numbers[i]);
    sum += numbers[i];
  }
  return sum;
}

calculateSum([1, 2, 3]);`,
      expectedOutput: `Acessando índice: 0 Valor: 1
Acessando índice: 1 Valor: 2
Acessando índice: 2 Valor: 3
✅ Soma calculada corretamente: 6`,
      bugType: "Fixed",
      completed: false,
    },
    {
      id: 3,
      title: "Detectar Null Reference",
      description: "Identifique o problema ao acessar propriedades de objetos undefined",
      code: `function getUserInfo(user) {
  console.log('Processando usuário:', user);
  const fullName = user.firstName + ' ' + user.lastName;
  const email = user.email.toLowerCase();
  return { fullName, email };
}

getUserInfo(null);`,
      expectedOutput: `Processando usuário: null
❌ TypeError: Cannot read property 'firstName' of null
Bug detectado: Null Reference Error`,
      bugType: "Null Reference",
      completed: false,
    },
    {
      id: 4,
      title: "Adicionar Validação",
      description: "Adicione validação adequada para evitar erros de null reference",
      code: `function getUserInfo(user) {
  console.log('Processando usuário:', user);
  
  // Validação adicionada
  if (!user) {
    throw new Error('Usuário não pode ser null ou undefined');
  }
  
  const fullName = user.firstName + ' ' + user.lastName;
  const email = user.email ? user.email.toLowerCase() : 'N/A';
  return { fullName, email };
}

try {
  getUserInfo({ firstName: 'João', lastName: 'Silva' });
} catch (error) {
  console.log('Erro capturado:', error.message);
}`,
      expectedOutput: `Processando usuário: { firstName: 'João', lastName: 'Silva' }
✅ Usuário processado com sucesso
Resultado: { fullName: 'João Silva', email: 'N/A' }`,
      bugType: "Fixed",
      completed: false,
    },
  ]

  const runStep = () => {
    setIsRunning(true)
    setOutput("")

    setTimeout(() => {
      setOutput(steps[currentStep].expectedOutput)
      setIsRunning(false)

      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep])
      }
    }, 2000)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setOutput("")
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setOutput("")
    }
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setOutput("")
    setCompletedSteps([])
  }

  const progress = (completedSteps.length / steps.length) * 100

  const getBugTypeColor = (bugType: string) => {
    switch (bugType) {
      case "Fixed":
        return "bg-green-100 text-green-800"
      case "Array Index Error":
        return "bg-red-100 text-red-800"
      case "Null Reference":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Demo Interativo de Debugging</h3>
              <p className="text-sm text-gray-600">
                Passo {currentStep + 1} de {steps.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getBugTypeColor(steps[currentStep].bugType)}>{steps[currentStep].bugType}</Badge>
              <Button variant="outline" size="sm" onClick={resetDemo}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso Geral</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              {steps[currentStep].title}
            </CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{steps[currentStep].code}</code>
              </pre>
            </div>

            <div className="flex gap-2">
              <Button onClick={runStep} disabled={isRunning} className="flex items-center gap-2">
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Executando...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Executar Código
                  </>
                )}
              </Button>

              {completedSteps.includes(currentStep) && (
                <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Concluído
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Saída do Console</CardTitle>
            <CardDescription>Observe o comportamento do código e identifique os problemas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded-lg min-h-[200px] font-mono text-sm">
              {isRunning ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
                  <span>Executando código...</span>
                </div>
              ) : output ? (
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <div className="text-gray-500">Clique em "Executar Código" para ver a saída</div>
              )}
            </div>

            {output && (
              <Alert className="mt-4">
                {steps[currentStep].bugType === "Fixed" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
                <AlertDescription>
                  {steps[currentStep].bugType === "Fixed"
                    ? "Código executado com sucesso! Bug corrigido."
                    : "Bug detectado! Analise a saída para entender o problema."}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
              ← Passo Anterior
            </Button>

            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                    index === currentStep
                      ? "bg-blue-500"
                      : completedSteps.includes(index)
                        ? "bg-green-500"
                        : "bg-gray-300"
                  }`}
                  onClick={() => {
                    setCurrentStep(index)
                    setOutput("")
                  }}
                />
              ))}
            </div>

            <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
              Próximo Passo →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
