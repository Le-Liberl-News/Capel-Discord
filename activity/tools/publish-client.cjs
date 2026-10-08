const fs = require("node:fs/promises"),
  path = require("node:path"),
  crypto = require("node:crypto"),
  { execFileSync } = require("node:child_process");
(async () => {
  const root = path.resolve(__dirname, ".."),
    output = path.resolve(process.argv[2] || "");
  if (!process.argv[2])
    throw Error(
      "Usage: node activity/tools/publish-client.cjs <website/activite>",
    );
  await fs.mkdir(output, { recursive: true });
  for (const [source, target] of [
    ["deploy/index.php", "index.php"],
    ["deploy/api.php", "api.php"],
    ["bundle.js", "bundle.js"],
  ])
    await fs.copyFile(path.join(root, source), path.join(output, target));
  await fs.cp(path.join(root, "assets"), path.join(output, "assets"), {
    recursive: true,
  });
  const files = {};
  async function hash(folder) {
    for (const e of await fs.readdir(folder, { withFileTypes: true })) {
      const file = path.join(folder, e.name);
      if (e.isDirectory()) await hash(file);
      else {
        if (
          [".php", ".js", ".json", ".gltf", ".txt"].includes(path.extname(file))
        )
          await fs.writeFile(
            file,
            (await fs.readFile(file, "utf8")).replace(/\r\n/g, "\n"),
          );
        files[path.relative(output, file).split(path.sep).join("/")] = crypto
          .createHash("sha256")
          .update(await fs.readFile(file))
          .digest("hex");
      }
    }
  }
  await hash(path.join(output, "assets"));
  for (const name of ["index.php", "api.php", "bundle.js"]) {
    await fs.writeFile(
      path.join(output, name),
      (await fs.readFile(path.join(output, name), "utf8")).replace(
        /\r\n/g,
        "\n",
      ),
    );
    files[name] = crypto
      .createHash("sha256")
      .update(await fs.readFile(path.join(output, name)))
      .digest("hex");
  }
  const commit = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    encoding: "utf8",
  }).trim();
  await fs.writeFile(
    path.join(output, "release.json"),
    JSON.stringify(
      { source: "Le-Liberl-News/Capel-Discord", commit, files },
      null,
      2,
    ) + "\n",
  );
  console.log(
    "Production client:",
    Object.keys(files).length,
    "files, bot commit",
    commit,
  );
})().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
