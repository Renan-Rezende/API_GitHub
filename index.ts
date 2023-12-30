// Interface que servira como "contrado" do usuario
interface UserData {
  id: number
  login: string
  name: string
  publicRepos: number
  reposURL: string
}
// Array para armazenar os usuarios
let users = []

// Função que "pega" o usuario inserido, obtem os dados através da requisição fetch na API GitHub
// e armazena-o no array "users"
async function saveUser(userName: string): Promise<UserData | null> {

  try {

    let URLGitHubUser = `https://api.github.com/users/${userName}`

    let response = await fetch(URLGitHubUser)
    if (!response.ok) {
      throw new Error(`Erro ao obter dados do usuário. Usuario não encontrado`);
    }

    let responseData = await response.json()

    let userData: UserData = {
      id: responseData.id,
      login: responseData.login,
      name: responseData.name,
      publicRepos: responseData.public_repos,
      reposURL: responseData.repos_url
    }

    users.push(userData)
    return userData

  } catch (error) {
    console.log(error)
    return error

  }

}

// Função para mostar informações de um usuario salvo
function showDataUser(userName: string) {
  // Mostrando dados do usuario
  let user = users.find((user) => user.login === userName)
  console.log(user)

  if (user) {
    // Mostrando dados dos repositorios 
    showDataRepos(userName)
  } else {
    console.log(`Usuario "${userName}" não encontrado!`)
  }


}

// Função para mostrar todos o usuarios salvos
function showUsers() {
  console.log(`Usuários salvos:`)
  for (let i = 0; i < users.length; i++) {
    console.log(users[i].login);
  }
}

// Função para mostrar o numero dos repositorios dos usuarios somados
function sumRepos() {
  let sum: number
  for (let i = 0; i <= users.length; i++) {
    sum += users[i].public_repos;
  }
  console.log(`Soma de repositorios dos usuários: ${sum}`)
}

// Função para mostrar o top 5 usuarios com mais respositórios
function showTopUsers() {
  const sortedUsers = users.sort((a, b) => b.publicRepos - a.publicRepos)
  for (let i = 0; i < 5; i++) {
    console.log(`${i + 1} - Usuario: ${sortedUsers[i].name} Reposítiorios: ${sortedUsers[i].publicRepos}`)
  }
}

// Função auxiliar para mostrar dados do usuario
async function showDataRepos(userName: string) {
  // Mostrando dados de alguns de seus repositórios
  let URLGitHubUserRepos = `https://api.github.com/users/${userName}/repos`
  let response = await fetch(URLGitHubUserRepos)

  if (!response.ok) {
    console.log(`Erro ao obter dados do repositório de ${userName}.`);
  } else {
    const repos = await response.json()

    repos.forEach(repo => {
      console.log(`Nome do repositório ${repo.name}`)
      console.log(`Descrição do repositório ${repo.description || `Sem descrição`}`)
      console.log(`Número de estrelas: ${repo.stargazers_count}`)

      if (repo.fork) {
        console.log(`Este repositório é um fork.`)
      } else {
        console.log(`Este repositório não é um fork.`)
      }

    });
  }


}
async function main() {
  await saveUser(`Renan-Rezende`)
  //...Adicione quantos usuarios quiser
  showDataUser(`Renan-Rezende`)
  showUsers()
}

main()






