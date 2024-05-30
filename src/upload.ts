import FormData from "form-data";
import axios from "axios";
import fs from "fs";

// insert personal api key below
const API_KEY = "";

export async function uploadImage(imagePath: string): Promise<string> {
  if (!fs.existsSync(imagePath)) {
    throw new Error(`File '${imagePath}' does not exist.`);
  }

  const form = new FormData();
  form.append("key", API_KEY);
  form.append("image", fs.createReadStream(imagePath));

  const response = await axios.post("https://api.imgbb.com/1/upload", form, {
    headers: {
      ...form.getHeaders(),
    },
  });

  if (response.data.status !== 200) {
    throw new Error(response.data.error.message);
  }

  return response.data.data.url;
}
