const url = 'https://www.nytimes.com/svc/games/state/wordle/latest';

export async function fetchWordle(token: string) {
    const req = await fetch(url, {
        headers: {
            'Cookie': `NYT-S=${token};`
        }
    });
    const json = await req.json();
    return {
        win: json.game_data.game.status,
        tries: json.game_data.game.boardState.length,
        lastPlayed: json.game_data.game.timestamps.lastPlayed
    }
}