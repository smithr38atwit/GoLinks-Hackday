import { useEffect } from 'react';
import './App.css'
import { Octokit } from "octokit"
import { useState } from 'react';


function App() {
  const [result, setResult] = useState([])

  const octokit = new Octokit({
    auth: import.meta.env.VITE_API_KEY
  });

  const search = async () => {
    const response = await octokit.request('GET /search/repositories', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'accept': 'application/vnd.github+json'
      },
      q: 'warehouse in:readme'
    });
    let arr = []
    for (let item of response.data.items) {
      arr.push(item.html_url);
    }
    setResult(arr)
  }

  useEffect(() => {
    search();
  }, [])


  return (
    <>
    </>
  )
}

export default App
