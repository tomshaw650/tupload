import { Command } from "commander";
import { uploadImage } from "./upload";

const cli = new Command();

cli
  .version("0.0.1")
  .description("give it an image, you get a permalink")
  .option("-i, --image [value]", "Returns a permalink with your image")
  .parse(process.argv);

const options = cli.opts();

if (options.image) {
  const imagePath = options.image;

  (async () => {
    try {
      const url = await uploadImage(imagePath);
      console.log(url); // Output the permalink URL
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  })();
}
