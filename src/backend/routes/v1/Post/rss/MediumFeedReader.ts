import RssFeedReaderDefault from "./type/RssFeedReader";
import { RssPostDefault, RssPostSocialNetworks } from "./type/RssPost";
import Parser from "rss-parser";

export default class implements RssFeedReaderDefault {
  async read(username: string): Promise<RssPostDefault[]> {
    const parser: Parser = new Parser();

    const feed = await parser.parseURL(
      `https://medium.com/@${username.replace("@", "")}/feed`
    );
    return feed.items.map((v) => {
      return {
        socialNetwork: RssPostSocialNetworks.medium,
        title: v.title,
        text: v["content:encoded"] || v["content"],
        ownerUsername: v.creator,
        link: v.link,
        createdAt: Math.floor(Date.parse(v.pubDate as string) / 1000),
      } as RssPostDefault;
    });
  }
}
