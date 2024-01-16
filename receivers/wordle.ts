const url = 'https://www.nytimes.com/svc/games/state/wordle/latest';

export async function fetchWordle(token: string) {
    const req = await fetch(url, {
        headers: {
            'Cookie': `NYT-S=${token};`
        }
    });
    const json = await req.json();
    if (json.game_data.game.timestamps.lastPlayed > new Date().getTime() - 1000 * 60 * 60 * 24) {
        return {
            win: json.game_data.game.status === "WIN",
            tries: json.game_data.game.currentRowIndex,
            lastPlayed: json.game_data.game.timestamps.lastPlayed
        }
    } else {
        return {
            win: false,
            tries: 0,
            lastPlayed: json.game_data.game.timestamps.lastPlayed
        }
    }
}