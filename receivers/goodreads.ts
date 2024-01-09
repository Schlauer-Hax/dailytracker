import {
    DOMParser,
    Element,
} from "https://deno.land/x/deno_dom@v0.1.43/deno-dom-wasm.ts";

const url = 'https://www.goodreads.com/widgets/user_update_widget?num_updates=10&user=';

export async function fetchGoodreads(userid: string) {
    const req = await fetch(url + userid, {
        headers: {
            'Content-Type': 'text/html'
        }
    });

    const raw = await req.text();
    const html = new DOMParser().parseFromString(raw, "text/html");
    if (!html) {
        throw new Error(`HTML error! html: ${raw}`);
    }

    const updates = html.querySelectorAll("#gr_reviews_widget > div.gr_review_container > div.update");
    let currentDate = "";
    return Array.from(updates).map((update) => {
        const newdate = (update as Element).querySelector("p");
        if (newdate) {
            currentDate = newdate.textContent;
        }
        const updateAction = (update as Element).querySelector(".updateAction");
        const bookTitle = (update as Element).querySelector(".bookTitle");
        const authorName = (update as Element).querySelector(".authorName");
        if (updateAction && bookTitle && authorName) {
            return {
                date: currentDate, 
                updateAction: updateAction.textContent.split(" with ")[0].split(" ").map(x => x.trim()).filter(x => x).join(" "),
                bookTitle: bookTitle.textContent,
                authorName: authorName.textContent
            }
        }
        return null;
    }).filter(x => x).filter(x => new Date(x!.date).getMonth() === new Date().getMonth() && Number(x!.date.split(" ")[1]) === new Date().getDate() && !x!.date.includes(","));
}