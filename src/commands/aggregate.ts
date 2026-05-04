import { fetchFeed } from "src/lib/rss.js";

export async function handlerAgg(cmdName: string) {
    const result = await fetchFeed("https://www.wagslane.dev/index.xml");
    console.dir(result, { depth: null });
}