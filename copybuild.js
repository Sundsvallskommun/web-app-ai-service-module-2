import { copyFile } from "copy-file";

try {
  await copyFile(
    "./dist/js/assistant-service.js",
    "../sitevision/assets/assistant-service.js"
  );
} catch (e) {
  console.log(e);
}
