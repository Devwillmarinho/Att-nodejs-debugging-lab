// Guia de ferramentas de debugging para Node.js
console.log("=== GUIA DE FERRAMENTAS DE DEBUGGING ===\n")

// Informações sobre as ferramentas disponíveis
const debuggingTools = {
  console: {
    name: "Console Methods",
    description: "Métodos built-in do Node.js para debugging",
    methods: [
      "console.log() - Output básico",
      "console.error() - Erros",
      "console.warn() - Avisos",
      "console.info() - Informações",
      "console.debug() - Debug detalhado",
      "console.table() - Dados tabulares",
      "console.time()/timeEnd() - Medição de tempo",
      "console.trace() - Stack trace",
      "console.assert() - Asserções",
    ],
  },

  nodeInspector: {
    name: "Node.js Inspector",
    description: "Debugger integrado do Node.js",
    usage: [
      "node --inspect script.js",
      "node --inspect-brk script.js (pausa no início)",
      "Abrir chrome://inspect no Chrome",
      "Usar breakpoints visuais",
    ],
  },

  vscode: {
    name: "VS Code Debugger",
    description: "Debugger integrado do Visual Studio Code",
    setup: [
      "Criar .vscode/launch.json",
      'Configurar tipo "node"',
      "Definir program e args",
      "Usar F5 para iniciar debug",
    ],
  },
}

// Demonstração prática de cada ferramenta
console.log("1. CONSOLE METHODS DEMO:")
console.log("------------------------")

// console.table para dados estruturados
const userData = [
  { id: 1, name: "João", age: 25 },
  { id: 2, name: "Maria", age: 30 },
  { id: 3, name: "Pedro", age: 28 },
]
console.table(userData)

// console.time para performance
console.time("operacao-lenta")
for (let i = 0; i < 100000; i++) {
  Math.sqrt(i)
}
console.timeEnd("operacao-lenta")

// console.trace para stack trace
function funcaoA() {
  funcaoB()
}

function funcaoB() {
  funcaoC()
}

function funcaoC() {
  console.trace("Stack trace atual:")
}

funcaoA()

// console.assert para validações
const idade = 15
console.assert(idade >= 18, "Usuário deve ser maior de idade")

console.log("\n2. DEBUGGING BEST PRACTICES:")
console.log("-----------------------------")

const bestPractices = [
  "✅ Use console.log estrategicamente (não em excesso)",
  "✅ Remova console.logs antes do deploy",
  "✅ Use try-catch para capturar erros",
  "✅ Valide inputs das funções",
  "✅ Use ferramentas de linting (ESLint)",
  "✅ Escreva testes unitários",
  "✅ Use debugger; para breakpoints no código",
  "✅ Configure seu editor para debugging",
]

bestPractices.forEach((practice) => console.log(practice))

console.log("\n3. EXEMPLO DE CONFIGURAÇÃO VS CODE:")
console.log("------------------------------------")

const vscodeConfig = {
  version: "0.2.0",
  configurations: [
    {
      name: "Debug Node.js",
      type: "node",
      request: "launch",
      program: "${workspaceFolder}/app.js",
      console: "integratedTerminal",
      skipFiles: ["<node_internals>/**"],
    },
  ],
}

console.log(JSON.stringify(vscodeConfig, null, 2))
