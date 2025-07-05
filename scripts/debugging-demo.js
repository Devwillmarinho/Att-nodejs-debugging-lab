// Demonstração de técnicas de debugging
console.log("=== DEMONSTRAÇÃO DE TÉCNICAS DE DEBUGGING ===\n")

// 1. Console.log estratégico
function debugWithConsole() {
  console.log("--- 1. Debugging com console.log ---")

  function problematicFunction(data) {
    console.log("🔍 Entrada da função:", data)

    const result = []
    for (let i = 0; i < data.length; i++) {
      console.log(`🔍 Iteração ${i}, valor:`, data[i])

      if (data[i] > 0) {
        result.push(data[i] * 2)
        console.log("🔍 Valor adicionado ao result:", data[i] * 2)
      }
    }

    console.log("🔍 Resultado final:", result)
    return result
  }

  const testData = [-1, 2, 0, 4, -3, 6]
  problematicFunction(testData)
}

// 2. Debugging com try-catch detalhado
function debugWithTryCatch() {
  console.log("\n--- 2. Debugging com try-catch ---")

  function riskyOperation(obj) {
    try {
      console.log("🔍 Tentando acessar propriedades do objeto:", obj)

      // Operação que pode falhar
      const result = obj.data.values.map((x) => x.toUpperCase())

      console.log("🔍 Operação bem-sucedida:", result)
      return result
    } catch (error) {
      console.error("❌ Erro capturado:")
      console.error("   Tipo:", error.name)
      console.error("   Mensagem:", error.message)
      console.error("   Stack:", error.stack)

      // Debugging: verificar estado do objeto
      console.log("🔍 Estado do objeto no momento do erro:")
      console.log("   obj existe?", obj !== undefined && obj !== null)
      console.log("   obj.data existe?", obj && obj.data !== undefined)
      console.log("   obj.data.values existe?", obj && obj.data && obj.data.values !== undefined)

      return null
    }
  }

  // Teste com objeto incompleto
  const incompleteObj = { data: {} } // Falta a propriedade 'values'
  riskyOperation(incompleteObj)
}

// 3. Debugging com breakpoints simulados
function debugWithBreakpoints() {
  console.log("\n--- 3. Debugging com breakpoints simulados ---")

  function complexCalculation(numbers) {
    const step1 = numbers.filter((n) => n > 0)
    // BREAKPOINT: verificar filtro
    console.log("🔍 BREAKPOINT 1 - Após filtro:", step1)

    const step2 = step1.map((n) => n * n)
    // BREAKPOINT: verificar mapeamento
    console.log("🔍 BREAKPOINT 2 - Após quadrado:", step2)

    const step3 = step2.reduce((acc, curr) => acc + curr, 0)
    // BREAKPOINT: verificar redução
    console.log("🔍 BREAKPOINT 3 - Após soma:", step3)

    const finalResult = Math.sqrt(step3)
    // BREAKPOINT: resultado final
    console.log("🔍 BREAKPOINT 4 - Resultado final:", finalResult)

    return finalResult
  }

  const testNumbers = [-2, 3, -1, 4, 5]
  console.log("Entrada:", testNumbers)
  const result = complexCalculation(testNumbers)
  console.log("Saída:", result)
}

// 4. Debugging de performance
function debugPerformance() {
  console.log("\n--- 4. Debugging de Performance ---")

  function slowFunction() {
    console.time("slowFunction")

    // Simulando operação lenta
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += Math.random()
    }

    console.timeEnd("slowFunction")
    return result
  }

  function optimizedFunction() {
    console.time("optimizedFunction")

    // Versão otimizada
    const result = Math.random() * 1000000

    console.timeEnd("optimizedFunction")
    return result
  }

  console.log("Comparando performance:")
  slowFunction()
  optimizedFunction()
}

// Executar todas as demonstrações
debugWithConsole()
debugWithTryCatch()
debugWithBreakpoints()
debugPerformance()
