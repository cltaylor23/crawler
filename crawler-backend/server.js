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
      await page.goto(req.query.url);
      const hrefs = await page.$$eval("a", elements => elements.map(element => element.href).filter(href => href.length > 0));
      return res.json({data: hrefs});
    } catch (error) {
      return next(error);
    }
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})();