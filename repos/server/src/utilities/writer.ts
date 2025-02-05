import Fs from "fs";
import Path from "path";

const writeFile = async (chunks: Buffer[]) => {
  const fileName = `audio_${Date.now()}.webm`;
  const fileLink = `${process.env.SERVER_URL}/${fileName}`;
  const pathParts = __dirname.split(Path.sep);
  pathParts[pathParts.length - 2] = "public";
  pathParts[pathParts.length - 1] = fileName;
  Fs.writeFileSync(pathParts.join(Path.sep), Buffer.concat(chunks));
  return {
    name: fileName,
    link: fileLink,
  };
};

export default writeFile;
