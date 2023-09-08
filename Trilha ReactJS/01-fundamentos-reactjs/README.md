** Diferença entre Default Exports e Named Exports:

- O export default permite que durante a importação o nome do componente possa ser diferente do que foi exportado. EX:

/*
function App() {

  return (
      <h1>Hello World!</h1>
  )
}

export default App

|||||||||||||||||||||||||||||||

import AppComponent from './App'
*/

- Já no Named export o nome deverá ser igual ao que foi exportado (para usar basta colocar export na criação da fucnção). EX:

/*
export function App() {

  return (
      <h1>Hello World!</h1>
  )
}

|||||||||||||||||||||||||||||||

import App from './App'
*/




------------------------------------------------

Iteração: É repetir algo, criar uma estrutura de repetição, percorrer por algo (Ex: percorrer um array)

Imutabilidade: As variáveis não sofrm mutação, nós criamos um novo valor (um espaço na memória)



ATENÇÃO!!!

Sempre que você for atualizar uma informação e essa informação depende do valor que ela tinha interiormente (ou seja dela mesma)
utilize esse padrão de uma arrow function:

funtion nomeFuncao(propriedade) {
  outraFuncao(() => {
      return propriedade
  })
}