const http = require("node:http"),
  fs = require("node:fs/promises"),
  path = require("node:path");
const root = path.resolve(__dirname, "..");
require("esbuild").buildSync({
  entryPoints: [path.join(root, "main.js")],
  bundle: true,
  format: "esm",
  minify: true,
  legalComments: "eof",
  define: { __ACTIVITY_PREVIEW__: "true" },
  outfile: path.join(root, "preview-bundle.js"),
});
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".ttf": "font/ttf",
  ".gltf": "model/gltf+json",
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost"),
        file = path.resolve(
          root,
          "." +
            decodeURIComponent(
              url.pathname === "/" ? "/preview.html" : url.pathname,
            ),
        );
      if (!file.startsWith(root + path.sep)) throw Error();
      const data = await fs.readFile(file);
      res.writeHead(200, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("introuvable");
    }
  })
  .listen(3012, "127.0.0.1", () =>
    console.log("Antérose: http://127.0.0.1:3012"),
  );
