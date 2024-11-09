import { KeyboardEvent } from "react";

/** 지수 표기법 기호를 입력할 수 없도록 설정 */
export const handleExponentialNotation = (
  event: KeyboardEvent<HTMLInputElement>
) => {
  // 지수 표기법 기호 목록
  const exponentialNotationList = ["e", "E", "-", "+", "."];

  if (exponentialNotationList.includes(event.key)) {
    event.preventDefault();
  }
};