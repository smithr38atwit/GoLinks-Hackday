import collections

import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API = "https://api.github.com/"


@app.get("/users/{username}/repos")
def user_repos(username: str):
    req_url = API + f"users/{username}/repos"
    headersList = {
        "Accept": "application/vnd.github+json",
    }
    response = requests.request("GET", req_url, headers=headersList)
    if not response.ok:
        raise HTTPException(status_code=500, detail="Search error")
    data = response.json()

    repo_count = len(data)

    forks_count = sum([1 if repo["fork"] else 0 for repo in data])

    lang_count = collections.Counter()
    for repo in data:
        lang_url = repo["languages_url"]
        lang_response = requests.request("GET", lang_url, headers=headersList)
        lang_data = lang_response.json()
        lang_count.update({lang: 1 for lang in lang_data})

    return {
        "repo_count": repo_count,
        "forks_count": forks_count,
        "language_counts": lang_count.most_common(),
    }
