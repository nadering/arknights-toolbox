import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: ".env.local",
});

const loadRequiredPathFromEnv = (envName: string) => {
  const envValue = process.env[envName];

  if (envValue === undefined || envValue.trim() === "") {
    throw new Error(
      `${envName}가 설정되지 않았습니다. .env.local을 확인해주세요.`,
    );
  }

  return path.resolve(process.cwd(), envValue);
};

/**
 * KR/global 최신 인게임 데이터를 읽기 위한 경로입니다.
 *
 * 기존 스크립트 호환을 위해 ARKNIGHTS_GAMEDATA_PATH를 기본 global 경로로 사용합니다.
 */
export const loadGamedataPath = () => {
  return loadRequiredPathFromEnv("ARKNIGHTS_GAMEDATA_PATH");
};

/**
 * CN 히스토리 기반 출시순 분석을 위한 경로입니다.
 *
 * 2019년부터의 character/activity/gacha Git history를 추적할 때 사용합니다.
 */
export const loadCnGamedataPath = () => {
  return loadRequiredPathFromEnv("ARKNIGHTS_CN_GAMEDATA_PATH");
};
