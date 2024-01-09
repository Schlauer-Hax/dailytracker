export async function fetchDuolingo(username: string) {
    const res = await fetch("https://www.duolingo.com/2017-06-30/users?username="+username);
    const json = await res.json();
    return json.users[0].streakData.currentStreak
}