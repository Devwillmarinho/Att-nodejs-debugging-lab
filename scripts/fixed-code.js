// Código corrigido com explicações
const fs = require("fs")
const path = require("path")

// CORREÇÃO 1: Função calculateAverage corrigida
function calculateAverage(numbers) {
  // Validação: verifica se o array não está vazio
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error("Array deve conter pelo menos um número")
  }

  let sum = 0
  // CORREÇÃO: loop correto (i < numbers.length, não <=)
  for (let i = 0; i < numbers.length; i++) {
    // Validação: verifica se é um número
    if (typeof numbers[i] !== "number") {
      throw new Error(`Elemento no índice ${i} não é um número`)
    }
    sum += numbers[i]
  }

  return sum / numbers.length
}

// CORREÇÃO 2: Função de leitura de arquivo melhorada
function readFileSafely(filename) {
  try {
    // CORREÇÃO: caminho correto e verificação de existência
    const fullPath = path.resolve(filename)

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Arquivo não encontrado: ${fullPath}`)
    }

    const data = fs.readFileSync(fullPath, "utf8")
    return data
  } catch (error) {
    // CORREÇÃO: tratamento adequado do erro
    console.error("Erro ao ler arquivo:", error.message)
    throw error // Re-lança o erro para o chamador decidir o que fazer
  }
}

// CORREÇÃO 3: Processamento seguro de usuário
function processUser(user) {
  // CORREÇÃO: validação completa do objeto user
  if (!user || typeof user !== "object") {
    throw new Error("Usuário deve ser um objeto válido")
  }

  // Validação de campos obrigatórios
  if (!user.firstName || typeof user.firstName !== "string") {
    throw new Error("firstName é obrigatório e deve ser uma string")
  }

  if (typeof user.age !== "number" || user.age < 0) {
    throw new Error("age deve ser um número válido")
  }

  // CORREÇÃO: tratamento seguro de campos opcionais
  const lastName = user.lastName || ""
  const fullName = user.firstName + (lastName ? " " + lastName : "")
  const isAdult = user.age >= 18

  // CORREÇÃO: validação de email antes de processar
  let processedEmail = null
  if (user.email && typeof user.email === "string") {
    processedEmail = user.email.toLowerCase()
  }

  return {
    name: fullName,
    adult: isAdult,
    email: processedEmail,
  }
}

// CORREÇÃO 4: Função findMaxValue segura
function findMaxValue(arr) {
  // CORREÇÃO: validação de array vazio
  if (!Array.isArray(arr)) {
    throw new Error("Parâmetro deve ser um array")
  }

  if (arr.length === 0) {
    throw new Error("Array não pode estar vazio")
  }

  // Validação: todos elementos devem ser números
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number") {
      throw new Error(`Elemento no índice ${i} não é um número`)
    }
  }

  let max = arr[0]
  // CORREÇÃO: loop começa do índice 1 (já temos arr[0] como inicial)
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i]
    }
  }
  return max
}

// Testando as funções corrigidas
console.log("=== TESTANDO CÓDIGO CORRIGIDO ===")

try {
  // Teste 1 - Cálculo de média
  console.log("\n--- Teste 1: Cálculo de Média ---")
  const numbers = [1, 2, 3, 4, 5]
  const average = calculateAverage(numbers)
  console.log(`Média de [${numbers.join(", ")}]:`, average)

  // Teste 2 - Leitura de arquivo (simulando arquivo inexistente)
  console.log("\n--- Teste 2: Leitura de Arquivo ---")
  try {
    const fileContent = readFileSafely("arquivo-inexistente.txt")
    console.log("Conteúdo do arquivo:", fileContent)
  } catch (error) {
    console.log("Erro esperado capturado:", error.message)
  }

  // Teste 3 - Processamento de usuário
  console.log("\n--- Teste 3: Processamento de Usuário ---")
  const validUser = {
    firstName: "João",
    lastName: "Silva",
    age: 25,
    email: "JOAO@EMAIL.COM",
  }
  const processedUser = processUser(validUser)
  console.log("Usuário processado:", processedUser)

  // Teste com usuário incompleto
  const incompleteUser = { firstName: "Maria", age: 30 }
  const processedIncompleteUser = processUser(incompleteUser)
  console.log("Usuário incompleto processado:", processedIncompleteUser)

  // Teste 4 - Valor máximo
  console.log("\n--- Teste 4: Valor Máximo ---")
  const numberArray = [10, 5, 8, 20, 3]
  const maxValue = findMaxValue(numberArray)
  console.log(`Valor máximo de [${numberArray.join(", ")}]:`, maxValue)
} catch (error) {
  console.error("Erro:", error.message)
}

console.log("\n=== TODOS OS TESTES CONCLUÍDOS ===")
