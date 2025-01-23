export async function fetchDuolingo(username: string) {
    const res = await fetch("https://www.duolingo.com/2017-06-30/users?username="+username);
    const json = await res.json();
    const user = json.users[0];
    return {...user.streakData.currentStreak, courses: user.courses}
}