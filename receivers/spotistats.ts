export async function fetchSpotistats(userid: string) {
    const req = await fetch(`https://beta-api.stats.fm/api/v1/users/${userid}/streams/stats?after=${new Date().getTime() - 1000 * 60 * 60 * 24}&before=${new Date().getTime()}`);
    const json = await req.json();
    return {
        count: json.items.count,
        durationMs: json.items.durationMs,
        cardinality: json.items.cardinality,
    };
}