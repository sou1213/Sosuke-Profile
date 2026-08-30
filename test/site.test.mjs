import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("HomeとWorkで共通ナビゲーションを提供する", async () => {
    const [home, work] = await Promise.all([read("index.html"), read("work.html")]);

    for (const html of [home, work]) {
        assert.match(html, /<nav class="site-nav" aria-label="メインナビゲーション">/);
        assert.match(html, /href="\.\/index\.html"/);
        assert.match(html, /href="\.\/work\.html"/);
        assert.match(html, /href="\.\/styles\.css"/);
        assert.match(html, /src="\.\/theme\.js" defer/);
    }

    assert.match(home, /href="\.\/index\.html" aria-current="page"/);
    assert.match(work, /href="\.\/work\.html" aria-current="page"/);
});

test("Workページは制作物と未完成の範囲を明記する", async () => {
    const work = await read("work.html");

    assert.match(work, /TaskManager/);
    assert.match(work, /Apple Pencil/);
    assert.match(work, /Goodnotes/);
    assert.match(work, /シンプルさと使いやすさ/);
    assert.match(work, /App Storeにはまだ公開していません/);
    assert.doesNotMatch(work, /https:\/\/github\.com\/sou1213\/TaskManager/);
    assert.match(work, /Your Feel Of Wallpaper/);
    assert.match(work, /Work in Progress/);
    assert.match(work, /現在は開発途中です/);
    assert.match(work, /https:\/\/your-feel-of-wallpaper-q8m4x7\.pages\.dev\//);
    assert.match(work, /Source code: Private/);
});

test("Cloudflare公開物へ基本的な防御ヘッダーを設定する", async () => {
    const headers = await read("_headers");

    assert.match(headers, /Content-Security-Policy: [^\r\n]*script-src 'self'/);
    assert.match(headers, /frame-ancestors 'none'/);
    assert.match(headers, /X-Frame-Options: DENY/);
    assert.match(headers, /X-Content-Type-Options: nosniff/);
});
