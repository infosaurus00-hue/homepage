/* ============================================================
   ビルドスクリプト
   使い方:  node build/build.mjs
   content/daiki.js と config/site.js の内容から index.html を生成します。
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import layout from './layout.js';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import ProofStrip from './components/ProofStrip.js';
import CurrentProjects from './components/CurrentProjects.js';
import StoryIntro from './components/StoryIntro.js';
import StoryTimeline from './components/StoryTimeline.js';
import Philosophy from './components/Philosophy.js';
import UseMe from './components/UseMe.js';
import ForYou from './components/ForYou.js';
import SessionFlow from './components/SessionFlow.js';
import Personal from './components/Personal.js';
import FinalCTA from './components/FinalCTA.js';
import Footer from './components/Footer.js';
import StickyCta from './components/StickyCta.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const page = layout(`
${Header()}

<main id="main">
${Hero()}
${ProofStrip()}
${CurrentProjects()}
${StoryIntro()}
${StoryTimeline()}
${Philosophy()}
${UseMe()}
${ForYou()}
${SessionFlow()}
${Personal()}
${FinalCTA()}
</main>

${Footer()}
${StickyCta()}
`);

const out = path.join(ROOT, 'index.html');
fs.writeFileSync(out, page, 'utf-8');

const kb = (fs.statSync(out).size / 1024).toFixed(1);
console.log(`✓ built  ${path.relative(process.cwd(), out)}  (${kb} KB)`);

// 写真スロットの状況を表示（差し替え漏れが分かるように）
const { photos } = await import('../content/daiki.js');
const missing = Object.entries(photos).filter(([, p]) => !fs.existsSync(path.join(ROOT, p.src)));
if (missing.length) {
  console.log(`  写真プレースホルダー表示中（${missing.length}枠）:`);
  for (const [key, p] of missing) console.log(`   - ${p.no} ${key.padEnd(10)} → ${p.src}  （${p.hint}）`);
} else {
  console.log('  すべての写真スロットに画像があります。');
}
