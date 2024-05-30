const api = "http://127.0.0.1:8000"

export function getReposInfo(username) {
    const url = `${api}/users/${username}/repos`
    console.debug(`GET ${url}...`)
    const response = fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    return response;
}