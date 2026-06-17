import { NextResponse } from "next/server";
import characterTable from "@/data/character_table.json";
import uniequipTable from "@/data/uniequip_table.json";
import {
  generateOperatorCode,
  type GenerateOperatorCodeInput,
} from "@/data/operator-code-generator";

export const runtime = "nodejs";

type GenerateOperatorRequest = Partial<GenerateOperatorCodeInput>;

/** API Route 동작 여부 확인용 */
export const GET = async () => {
  return NextResponse.json({ message: "operator-maker API is working" });
};

/**
 * 사용자의 입력을 body로 요청받으면, 오퍼레이터 데이터를 생성 후 반환
 * @param request
 * @returns
 */
export const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as GenerateOperatorRequest;
    const code = generateOperatorCode(
      {
        id: Number(body.id),
        koreanName: body.koreanName ?? "",
        chineseName: body.chineseName ?? "",
        skills: Array.isArray(body.skills) ? body.skills : [],
      },
      characterTable,
      uniequipTable,
    );
    return NextResponse.json({ code });
  } catch (error) {
    console.error("operator-maker error:", error);
    const message =
      error instanceof Error ? error.message : "데이터 생성에 실패했습니다.";
    return NextResponse.json({ message }, { status: 400 });
  }
};
