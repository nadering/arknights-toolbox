import { NextResponse } from "next/server";
import {
  generateOperatorCode,
  type GenerateOperatorCodeInput,
} from "@/data/operator-code-generator";

export const runtime = "nodejs";

const CHARACTER_TABLE_URL =
  "https://raw.githubusercontent.com/ArknightsAssets/ArknightsGamedata/refs/heads/master/bili/gamedata/excel/character_table.json";

const UNIEQUIP_TABLE_URL =
  "https://raw.githubusercontent.com/ArknightsAssets/ArknightsGamedata/refs/heads/master/bili/gamedata/excel/uniequip_table.json";

type GenerateOperatorRequest = Partial<GenerateOperatorCodeInput>;

/** 외부 JSON 가져오기 */
const fetchJson = async (url: string, dataName: string): Promise<unknown> => {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `${dataName} 다운로드 실패: ${response.status} ${response.statusText}`,
    );
  }

  try {
    return await response.json();
  } catch {
    throw new Error(`${dataName}을 JSON으로 해석하지 못했습니다.`);
  }
};

/** API 테스트 용도 */
export const GET = async () => {
  return NextResponse.json({
    message: "operator-maker API is working",
  });
};

/** 사용자의 입력으로부터, 오퍼레이터 데이터를 생성 후 반환 */
export const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as GenerateOperatorRequest;

    const [characterTable, uniequipTable] = await Promise.all([
      fetchJson(CHARACTER_TABLE_URL, "character_table.json"),
      fetchJson(UNIEQUIP_TABLE_URL, "uniequip_table.json"),
    ]);

    const code = generateOperatorCode(
      {
        id: Number(body.id),
        koreanName: body.koreanName ?? "",
        chineseName: body.chineseName ?? "",
        skills: Array.isArray(body.skills) ? body.skills : [],
      },
      characterTable as Parameters<typeof generateOperatorCode>[1],
      uniequipTable as Parameters<typeof generateOperatorCode>[2],
    );

    return NextResponse.json({ code });
  } catch (error) {
    console.error("operator-maker error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "오퍼레이터 데이터 생성에 실패했습니다.";

    return NextResponse.json({ message }, { status: 400 });
  }
};
