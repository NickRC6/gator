import { XMLParser } from "fast-xml-parser";

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

    const channel = parsedResult?.rss?.channel;
    if (!channel) throw new Error("Invalid feed, channel field does not exist.");

    const title = requireString(channel, "title", "feed");
    const link = requireString(channel, "link", "feed");
    const description = requireString(channel, "description", "feed");

    let items = [];
    let validatedAndExtractedItems = [];
    if (channel.item) {
        if (Array.isArray(channel.item)) {
            items = channel.item;  
        }
        else {
            items = [channel.item];
        }
    }
    for (const item of items) {
        const { title, link, description, pubDate } = item;
        if (!title || !link || !description || !pubDate) continue;
        validatedAndExtractedItems.push({ title, link, description, pubDate });
    }

    const rssObject = {
        channel: {
            title,
            link,
            description,
            item: validatedAndExtractedItems,
        }
    };

    return rssObject;
}