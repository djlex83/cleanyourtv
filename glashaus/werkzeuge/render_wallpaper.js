const { chromium } = require('playwright');
const [,, out, top, bottom, night] = process.argv;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, colorScheme: 'dark' });
  await p.goto('file://' + (process.env.GLASHAUS_DIR || process.cwd() + '/glashaus-vis2') + '/docs/index.html#standby');
  await p.waitForTimeout(1500);
  await p.addStyleTag({ content: `.screen-in{visibility:hidden} .shint{visibility:hidden} .nav,.wrap{visibility:hidden}
    .screen-in{position:fixed;left:0;right:0;top:${bottom}px}` });
  await p.evaluate(() => window.SCULPT && window.SCULPT.place());
  await p.waitForTimeout(9000);
  await p.screenshot({ path: out });
  await b.close();
})();
