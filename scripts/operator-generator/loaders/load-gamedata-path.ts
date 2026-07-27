import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: ".env.local",
});

export const loadGamedataPath = () => {
  const gamedataPath = process.env.ARKNIGHTS_GAMEDATA_PATH;

  if (gamedataPath === undefined || gamedataPath.trim() === "") {
    throw new Error(
      "ARKNIGHTS_GAMEDATA_PATH가 설정되지 않았습니다. .env.local을 확인해주세요.",
    );
  }

  return path.resolve(process.cwd(), gamedataPath);
};
