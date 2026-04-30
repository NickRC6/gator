import { XMLParser } from "fast-xml-parser";
import { parse } from "node:path";

function requireString(obj: any, field: string, context: string): string {
    if (typeof obj[field] !== "string") {
        throw new Error(`missing or invalid '${field}' in ${context}`);
    }
    return obj[field];
}

export async function fetchFeed(feedURL: string) {
    const response = await fetch(feedURL, {
    method: "GET",
    headers: {
        "User-Agent": "gator"
        },
    });
    const resToText = await response.text();
    const parser = new XMLParser({processEntities: false,});
    const parsedResult = parser.parse(resToText);

    const channel = parsedResult.channel;
    if (!channel) throw new Error("Invalid feed, channel field does not exist.");

    const title = requireString(channel, "title", "feed");
    const link = requireString(channel, "link", "feed");
    const description = requireString(channel, "description", "feed");

    console.log(resToText);
}