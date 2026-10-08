const test = require("node:test"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path");
const root = path.join(__dirname, "..");
test("published activity pages contain no avatar picker or dialogue test form", () => {
  for (const file of ["activity/index.html", "activity/deploy/index.php"]) {
    const page = fs.readFileSync(path.join(root, file), "utf8");
    assert.doesNotMatch(
      page,
      /<select|<form|Tester une bulle|Tester deux bulles|dialogue-test|id="personnage"/,
    );
  }
});
test("production bundle omits the local preview controls", () => {
  const bundle = fs.readFileSync(path.join(root, "activity/bundle.js"), "utf8");
  assert.equal(
    /Tester une bulle|Tester deux bulles|window\.__activityPreview|Aperçu local/.test(
      bundle,
    ),
    false,
    "Production bundle must omit local preview controls",
  );
  assert.equal(
    bundle.includes("Ouvrez cette activit"),
    true,
    "Outside Discord the production page must request an activity launch",
  );
});
test("local preview keeps its separate page and bundle", () => {
  const page = fs.readFileSync(
    path.join(root, "activity/preview.html"),
    "utf8",
  );
  assert.match(page, /id="personnage"/);
  assert.match(page, /preview-bundle\.js/);
});
