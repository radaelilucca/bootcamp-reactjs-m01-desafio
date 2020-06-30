import React, {useState, useEffect} from "react";
import api from './services/api'


import "./styles.css";

function App() {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('Desafio ReactJS')
  const [url, setUrl] = useState('https://github.com/josepholiveira')
  const [techs, setTechs] = useState(["React", "Node.js"])
  const [id, setId] = useState('123')

  useEffect(() => {
    async function loadRepos(){
      const response = await api.get('repositories')

      setProjects(response.data)
    } 
    loadRepos()

  }, [])

  async function handleAddRepository() {

    const project = {
      id,
      url,
      title,
      techs,
    }
    const response = await api.post('repositories', project)

    if(response.status === 200){
      console.log('Repositório cadastrado com sucesso')
      setProjects([project, ...projects])
    }else {
      console.log('Ocorreu um erro ao cadastrar o repositório, tente novamente.')
    }
    
  }

  async function handleRemoveRepository(id) {
    const newProjectsList = projects.filter(project => project.id !== id)
    
    const response = await api.delete(`/repositories/${id}`)
    
    if(response.status === 204){
      console.log('Repositório deletado com sucesso')
      setProjects(newProjectsList)
    }else {
      console.log('Ocorreu um erro ao deletar o repositório, tente novamente.')
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => (
          <li key={project.id}>
          <p>{project.title}</p>

          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
        </li>
        ))}
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
