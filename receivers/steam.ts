export async function fetchSteam(token: string, steamid: string) {
    const res = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${token}&steamid=${steamid}&format=json`)
    const json = await res.json();
    return json.response;
}