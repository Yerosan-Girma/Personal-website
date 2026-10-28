const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userDataDir = path.join(process.env.TEMP, 'edge-cdp-about-' + Date.now());
const port = 9370;

async function run() {
  const browser = spawn(chromePath, [
    '--remote-debugging-port=' + port,
    '--headless=new',
    '--disable-gpu',
    '--user-data-dir=' + userDataDir,
    '--window-size=390,844',
    'about:blank'
  ]);

  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:' + port + '/json/version');
      if (res.ok) break;
    } catch(e) {}
    await new Promise(r => setTimeout(r, 200));
  }

  const newTargetRes = await fetch('http://127.0.0.1:' + port + '/json/new?http%3A%2F%2Flocalhost%3A4174%2F', { method: 'PUT' });
  const targetData = await newTargetRes.json();
  const pageWs = new WebSocket(targetData.webSocketDebuggerUrl);
  await new Promise(r => pageWs.onopen = r);

  let id = 1;
  const send = (method, params = {}) => new Promise(res => {
    const curId = id++;
    const onMsg = (msg) => {
      const p = JSON.parse(msg.data);
      if (p.id === curId) {
        pageWs.removeEventListener('message', onMsg);
        res(p.result);
      }
    };
    pageWs.addEventListener('message', onMsg);
    pageWs.send(JSON.stringify({ id: curId, method, params }));
  });

  await send('Page.enable');
  await new Promise(r => setTimeout(r, 8500)); // wait for loading screen
  await send('Runtime.evaluate', { expression: 'document.getElementById("about")?.scrollIntoView({ behavior: "instant" });' });
  await new Promise(r => setTimeout(r, 1500));
  const snap = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('about_mobile_preview.png', Buffer.from(snap.data, 'base64'));
  console.log('Saved mobile preview:', fs.statSync('about_mobile_preview.png').size);
  pageWs.close();
  browser.kill();
}
run();
