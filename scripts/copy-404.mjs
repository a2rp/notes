import { copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// GitHub Pages serves `404.html` when someone opens a nested app route
// directly, such as `/notes/about`. Copying the built app there lets the
// client-side router load and choose the correct page instead of showing
// GitHub Pages' default not-found screen.

// Build paths from this script's location, rather than the terminal's
// current folder, so this works no matter where `npm run build` was started.
const source = fileURLToPath(new URL("../dist/index.html", import.meta.url));
const destination = fileURLToPath(new URL("../dist/404.html", import.meta.url));

// Keep the fallback identical to the built entry page. `await` ensures the
// copy finishes before this script (and the `postbuild` npm step) exits.
await copyFile(source, destination);
