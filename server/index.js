import cors from "cors";
import express from "express";
import RSSParser from "rss-parser";

const feedURL = "https://zinzy.website/index.xml";

const blogroll = [
    "https://barryfrost.com/rss?post-type=article",
    "https://granary.io/url?input=html&output=atom&url=https://jamesg.blog/longform-feed/",
    "https://www.zinzy.website/index.xml",
    "https://davidralphlewis.co.uk/feed.xml",
    "https://manuelmoreale.com/feed/rss",
    "https://rachsmith.com/feed.xml",
    "https://bastianallgeier.com/feed",
    "https://jacobhall.net/feeds/rss/v1.rss",
    "https://laurakalbag.com/index.xml",
];

const parser = new RSSParser();
let articles = [];

const parse = async url => {
    const feed = await parser.parseURL(url);

    feed.items.slice(0,1).forEach(item => {
        articles.push({item})
    })
}

blogroll.forEach((element) => parse(element));

// Solving iframe problem? https://stackoverflow.com/questions/57259514/how-to-get-the-x-frame-options-value-from-a-website-urls-response-headers-in-an
console.log(blogroll);

let app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send(articles);
})

const server = app.listen("4000", () => {
    console.log("App is listening at http://localhost:4000")
})

export default server;