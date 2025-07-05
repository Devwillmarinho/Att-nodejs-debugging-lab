"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Code, Play, Download, Copy, Check } from "lucide-react"

export function CodeEditor() {
  const [activeCode, setActiveCode] = useState("buggy")
  const [copied, setCopied] = useState(false)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const buggyCode = `// Código com bugs
function calculateAverage(numbers) {
  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) { // Bug: i <= length
    sum += numbers[i];
  }
  return sum / numbers.length;
}

function processUser(user) {
  const fullName = user.firstName + " " + user.lastName; // Bug: user pode ser null
  return {
    name: fullName,
    email: user.email.toLowerCase() // Bug: email pode ser undefined
  };
}

// Teste
try {
  console.log(calculateAverage([1, 2, 3, 4, 5]));
  console.log(processUser({firstName: "João", age: 25})); // lastName e email faltando
} catch (error) {
  console.error("Erro:", error.message);
}`

  const fixedCode = `// Código corrigido
function calculateAverage(numbers) {
  // Validação de entrada
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error("Array deve conter pelo menos um número");
  }
  
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) { // Correção: i < length
    if (typeof numbers[i] !== 'number') {
      throw new Error(\`Elemento no índice \${i} não é um número\`);
    }
    sum += numbers[i];
  }
  return sum / numbers.length;
}

function processUser(user) {
  // Validação completa
  if (!user || typeof user !== 'object') {
    throw new Error("Usuário deve ser um objeto válido");
  }
  
  if (!user.firstName || typeof user.firstName !== 'string') {
    throw new Error("firstName é obrigatório");
  }
  
  const lastName = user.lastName || "";
  const fullName = user.firstName + (lastName ? " " + lastName : "");
  
  // Validação de email
  let processedEmail = null;
  if (user.email && typeof user.email === 'string') {
    processedEmail = user.email.toLowerCase();
  }
  
  return {
    name: fullName,
    email: processedEmail
  };
}

// Teste seguro
try {
  console.log("Média:", calculateAverage([1, 2, 3, 4, 5]));
  console.log("Usuário:", processUser({firstName: "João", age: 25}));
  console.log("Usuário completo:", processUser({
    firstName: "Maria", 
    lastName: "Silva", 
    email: "MARIA@EMAIL.COM"
  }));
} catch (error) {
  console.error("Erro capturado:", error.message);
}`

  const getCurrentCode = () => {
    return activeCode === "buggy" ? buggyCode : fixedCode
  }

  const runCode = () => {
    setIsRunning(true)
    setOutput("")

    // Simular execução do código
    setTimeout(() => {
      if (activeCode === "buggy") {
        setOutput(`> Executando código com bugs...

Média: NaN
Erro capturado: Cannot read property 'toLowerCase' of undefined

❌ Problemas encontrados:
- Loop acessa índice inexistente
- Propriedades undefined não tratadas
- Falta validação de entrada`)
      } else {
        setOutput(`> Executando código corrigido...

Média: 3
Usuário: { name: "João", email: null }
Usuário completo: { name: "Maria Silva", email: "maria@email.com" }

✅ Código executado com sucesso!
- Todas as validações funcionando
- Erros tratados adequadamente
- Saída consistente e segura`)
      }
      setIsRunning(false)
    }, 1500)
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(getCurrentCode())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCode = () => {
    const blob = new Blob([getCurrentCode()], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${activeCode}-code.js`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Code Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Editor de Código Interativo
          </CardTitle>
          <CardDescription>Compare o código com bugs e a versão corrigida</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCode} onValueChange={setActiveCode}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="buggy" className="flex items-center gap-2">
                  <Badge variant="destructive" className="w-2 h-2 p-0 rounded-full" />
                  Código com Bugs
                </TabsTrigger>
                <TabsTrigger value="fixed" className="flex items-center gap-2">
                  <Badge variant="default" className="w-2 h-2 p-0 rounded-full bg-green-500" />
                  Código Corrigido
                </TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyCode}
                  className="flex items-center gap-2 bg-transparent"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copiado!" : "Copiar"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadCode}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button onClick={runCode} disabled={isRunning} className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  {isRunning ? "Executando..." : "Executar"}
                </Button>
              </div>
            </div>

            <TabsContent value="buggy">
              <Textarea
                value={buggyCode}
                readOnly
                className="min-h-[400px] font-mono text-sm bg-red-50 border-red-200"
              />
            </TabsContent>

            <TabsContent value="fixed">
              <Textarea
                value={fixedCode}
                readOnly
                className="min-h-[400px] font-mono text-sm bg-green-50 border-green-200"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Output Console */}
      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Console de Saída</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-line">
              {isRunning ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
                  Executando código...
                </div>
              ) : (
                output
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
