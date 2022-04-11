const express = require("express");
const cors = require("cors");
const { chromium } = require("playwright");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  app.get("/crawl", async (req, res, next) => {
    try {
      const visited = {[req.query.url]: true};
      const queue = [req.query.url];
      const collection = [];
      const collectionSizeLimit = 10000;
      const timeLimit = 30000;

      let timeLimitReached = false;
      setTimeout(() => {
        timeLimitReached = true;
      }, timeLimit);

      while (queue.length && collection.length < collectionSizeLimit && !timeLimitReached) {
        const nextUrl = queue.shift();
        await page.goto(nextUrl);
        const hrefsOnPage = await page.$$eval("a", elements => elements.map(element => element.href));
        while (hrefsOnPage.length && collection.length < collectionSizeLimit) {
          const href = hrefsOnPage.shift();
          if (href.length && !visited[href]) {
            visited[href] = true;
            queue.push(href);
            collection.push(href);
          }
        }
      }
      return res.json({data: collection});
    } catch (error) {
      return next(error);
    }
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})();