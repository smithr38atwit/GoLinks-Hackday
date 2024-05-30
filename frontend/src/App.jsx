import './App.css'
import { useState } from 'react';
import { getReposInfo } from './scripts/api';

function App() {
  const [username, setUsername] = useState('')
  const [numRepos, setNumRepos] = useState(null)
  const [numForks, setNumForks] = useState(null)
  const [languages, setLanguages] = useState(null)

  const search = async (e) => {
    e.preventDefault();

    // setNumRepos(null)
    // setNumForks(null)
    // setLanguages(null)

    if (username == '') {
      return;
    }

    try {
      const response = await getReposInfo(username);
      const data = await response.json()

      setNumRepos(data.repo_count)
      setNumForks(data.forks_count)
      setLanguages(data.language_counts)
    } catch (error) {
      console.error('Search error: ', error)
    }
  }

  return (
    <>
      <h1>GoLinks Hackday - Info for Github User's Repos</h1>
      <div className='input'>
        <form className="search" onSubmit={search}>
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input
            type="text"
            placeholder="Search..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </form>
      </div>
      <div className='results'>
        <div className='repos'><span>Number of public repositories:</span>{numRepos && <span> {numRepos}</span>}</div>
        <div className='forks'><span>Number of forked repositories:</span>{numForks && <span> {numForks}</span>}</div>
        <div className='languages'>
          <div>Languages used:</div>
          <ol>
            {languages && languages.map((lang, index) => (
              <li key={index}>{lang[0]}: {lang[1]}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  )
}

export default App
