import "std/dotenv/load.ts";

import { fetchGoodreads } from "./receivers/goodreads.ts";
import { fetchWordle } from "./receivers/wordle.ts";
import { fetchDuolingo } from "./receivers/duolingo.ts";
import { fetchSpotistats } from "./receivers/spotistats.ts";

// This is supposed to run on update, so once a day but at the end of the day that should be logged.
const today = {
    goodreads: await fetchGoodreads(Deno.env.get("GOODREADS_USER_ID")!),
    wordle: await fetchWordle(Deno.env.get("WORDLE_TOKEN")!),
    duolingo: await fetchDuolingo(Deno.env.get("DUOLINGO_USERNAME")!),
    spotistats: await fetchSpotistats(Deno.env.get("SPOTISTATS_USER_ID")!),
}

Deno.writeTextFileSync("./output.json", JSON.stringify(today, null, 2));