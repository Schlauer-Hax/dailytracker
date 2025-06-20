import "std/dotenv/load.ts";

import { fetchGoodreads } from "./receivers/goodreads.ts";
import { fetchWordle } from "./receivers/wordle.ts";
import { fetchDuolingo } from "./receivers/duolingo.ts";
import { fetchSpotistats } from "./receivers/spotistats.ts";
import { fetchSteam } from "./receivers/steam.ts";

// This is supposed to run on update, so once a day but at the end of the day that should be logged.
const today = {
    goodreads: await fetchGoodreads(Deno.env.get("GOODREADS_USER_ID")!).catch(() => {
        console.error("Failed to fetch Goodreads data. Please check your configuration.");
        return null;
    }),
    //wordle: await fetchWordle(Deno.env.get("WORDLE_TOKEN")!),
    duolingo: await fetchDuolingo(Deno.env.get("DUOLINGO_USERNAME")!).catch(() => {
        console.error("Failed to fetch Duolingo data. Please check your configuration.");
        return null;
    }),
    spotistats: await fetchSpotistats(Deno.env.get("SPOTISTATS_USER_ID")!).catch(() => {
        console.error("Failed to fetch Spotistats data. Please check your configuration.");
        return null;
    }),
    steam: await fetchSteam(Deno.env.get("STEAM_KEY")!, Deno.env.get("STEAM_ID")!).catch(() => {
        console.error("Failed to fetch Steam data. Please check your configuration.");
        return null;
    }),
}

Deno.writeTextFileSync("./output.json", JSON.stringify(today, null, 2));