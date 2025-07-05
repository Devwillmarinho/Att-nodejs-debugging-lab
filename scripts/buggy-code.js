// Código com bugs intencionais para demonstração
const fs = require("fs")
const path = require("path")

// Bug 1: Função com lógica incorreta
function calculateAverage(numbers) {
  let sum = 0
  // Bug: loop incorreto (deveria ser < numbers.length)
  for (let i = 0; i <= numbers.length; i++) {
    sum += numbers[i]
  }
  // Bug: divisão por zero não tratada
  return sum / numbers.length
}

// Bug 2: Função assíncrona mal implementada
function readFileSync(filename) {
  try {
    // Bug: caminho incorreto
    const data = fs.readFileSync(filename + ".txt", "utf8")
    return data
  } catch (error) {
    // Bug: erro não tratado adequadamente
    console.log("Erro:", error)
    return null
  }
}

// Bug 3: Manipulação de objetos com propriedades undefined
function processUser(user) {
  // Bug: não verifica se user existe
  const fullName = user.firstName + " " + user.lastName
  // Bug: não verifica se age existe
  const isAdult = user.age >= 18

  return {
    name: fullName,
    adult: isAdult,
    // Bug: propriedade que pode não existir
    email: user.email.toLowerCase(),
  }
}

// Bug 4: Array com métodos incorretos
function findMaxValue(arr) {
  // Bug: não verifica se array está vazio
  let max = arr[0]
  // Bug: loop começa do índice errado
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i]
    }
  }
  return max
}

// Testando as funções com bugs
console.log("=== TESTANDO CÓDIGO COM BUGS ===")

try {
  // Teste 1
  const numbers = [1, 2, 3, 4, 5]
  console.log("Média:", calculateAverage(numbers))

  // Teste 2
  const fileContent = readFileSync("nonexistent")
  console.log("Conteúdo do arquivo:", fileContent)

  // Teste 3
  const user = { firstName: "João", age: 25 } // lastName e email faltando
  console.log("Usuário processado:", processUser(user))

  // Teste 4
  const emptyArray = []
  console.log("Valor máximo:", findMaxValue(emptyArray))
} catch (error) {
  console.error("Erro capturado:", error.message)
}
