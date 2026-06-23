"use client";

import { FormEvent, SetStateAction, useState } from "react";
import Image from "next/image";
import { handleExponentialNotation } from "@/tool";
import ToastPopup from "./toast-popup";

/** 공백 컴포넌트 */
const EmptySpace = () => {
  return <div className="h-6"></div>;
};

type SkillInput = {
  name: string;
  preferred: boolean;
};

type GenerateOperatorResponse = {
  code?: string;
  message?: string;
};

/** 오퍼레이터 데이터 제작 컴포넌트 */
export default function OperatorMaker() {
  // 아이디
  const [id, setId] = useState("0");

  // 이름
  const [name, setName] = useState("");

  // 중국어 이름
  const [chineseName, setChineseName] = useState("");

  // 스킬 이름
  const [skillOneName, setSkillOneName] = useState("");
  const [skillTwoName, setSkillTwoName] = useState("");
  const [skillThreeName, setSkillThreeName] = useState("");

  // 선호 스킬 여부
  const [skillOnePreferred, setSkillOnePreferred] = useState(false);
  const [skillTwoPreferred, setSkillTwoPreferred] = useState(false);
  const [skillThreePreferred, setSkillThreePreferred] = useState(false);

  // 데이터 생성 중 여부
  const [isGenerating, setIsGenerating] = useState(false);

  // 토스트 팝업
  const [toastPopupActive, setToastPopupActive] = useState(false);
  const [toastPopupMessage, setToastPopupMessage] =
    useState("클립보드에 복사되었습니다.");

  /** 토스트 팝업 표시 */
  const showToastPopup = (message: string) => {
    setToastPopupMessage(message);
    setToastPopupActive(false);

    // 같은 메시지를 연속으로 표시할 때도 ToastPopup을 다시 마운트
    window.setTimeout(() => {
      setToastPopupActive(true);
    }, 0);
  };

  /** 숫자로 된 문자열 설정 */
  const handleNumberStringValue = (
    event: FormEvent<HTMLInputElement>,
    setter: (value: SetStateAction<string>) => void,
  ) => {
    let value = event.currentTarget.value;

    // 0으로 시작하고 문자열 길이가 1을 초과한다면 (00, 01 등), 가장 왼쪽의 0을 제거함
    const startsWithZeroPattern = /^0+/;
    if (value.length > 1) {
      value = value.replace(startsWithZeroPattern, "");
    }

    // 문자열의 길이가 0이라면, 0으로 재설정
    if (value.length == 0) {
      value = "0";
    }

    // 그 후, 아이디 문자열을 설정
    setter(value);
  };

  /** 입력된 스킬 정보 생성 */
  const createSkillInputList = (): SkillInput[] => {
    const skillInputList: SkillInput[] = [
      {
        name: skillOneName.trim(),
        preferred: skillOnePreferred,
      },
      {
        name: skillTwoName.trim(),
        preferred: skillTwoPreferred,
      },
      {
        name: skillThreeName.trim(),
        preferred: skillThreePreferred,
      },
    ];

    // 스킬을 건너뛰고 입력한 경우 방지
    const firstEmptySkillIndex = skillInputList.findIndex(
      (skill) => skill.name.length === 0,
    );

    if (
      firstEmptySkillIndex !== -1 &&
      skillInputList
        .slice(firstEmptySkillIndex + 1)
        .some((skill) => skill.name.length > 0)
    ) {
      throw new Error("스킬 이름은 1스킬부터 순서대로 입력해주세요.");
    }

    // 이름이 없는 스킬에서 선호 체크가 된 경우 방지
    const emptyPreferredSkillExists = skillInputList.some(
      (skill) => skill.name.length === 0 && skill.preferred,
    );

    if (emptyPreferredSkillExists) {
      throw new Error("스킬 이름을 입력한 뒤 선호 여부를 선택해주세요.");
    }

    return skillInputList.filter((skill) => skill.name.length > 0);
  };

  /** 오퍼레이터 데이터를 제작하고 클립보드에 복사 */
  const makeOperatorData = async () => {
    if (isGenerating) {
      return;
    }

    try {
      setIsGenerating(true);

      const operatorId = Number(id);
      const koreanName = name.trim();
      const normalizedChineseName = chineseName.trim();

      if (!Number.isInteger(operatorId) || operatorId < 0) {
        throw new Error("올바른 오퍼레이터 아이디를 입력해주세요.");
      }

      if (koreanName.length === 0) {
        throw new Error("오퍼레이터 이름을 입력해주세요.");
      }

      if (normalizedChineseName.length === 0) {
        throw new Error("오퍼레이터 중국어 이름을 입력해주세요.");
      }

      const skills = createSkillInputList();

      const response = await fetch("/api/operator-maker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: operatorId,
          koreanName,
          chineseName: normalizedChineseName,
          skills,
        }),
      });

      const result = (await response.json()) as GenerateOperatorResponse;

      if (!response.ok || !result.code) {
        throw new Error(
          result.message ?? "오퍼레이터 데이터 생성에 실패했습니다.",
        );
      }

      await navigator.clipboard.writeText(result.code);

      showToastPopup("클립보드에 복사되었습니다.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "오퍼레이터 데이터 생성에 실패했습니다.";

      showToastPopup(message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-3 p-4 pb-32">
      <div className="flex flex-row gap-5">
        <p className="pl-1 font-bold text-3xl text-white break-keep">
          오퍼레이터 데이터 제작소
        </p>
        {/* 버튼 */}
        <div className="flex flex-row justify-start items-center gap-2 translate-y-[2px]">
          <button
            type="button"
            className={`group relative w-9 selection:bg-transparent aspect-square disabled:cursor-not-allowed disabled:opacity-50`}
            disabled={isGenerating}
            onClick={makeOperatorData}
          >
            <Image
              className="w-9 rotate-90 transition:[filter_0s] [filter:invert(56%)_sepia(1%)_saturate(0%)_hue-rotate(46deg)_brightness(96%)_contrast(88%)]
                hover:[filter:invert(98%)_sepia(2%)_saturate(548%)_hue-rotate(357deg)_brightness(114%)_contrast(75%)]"
              src="/images/others/import.png"
              alt="make-operator-data"
              fill
              sizes="10vw"
              draggable={false}
            />
            <p
              className="hidden absolute inset-x-auto top-0 left-[50%] z-10 px-3 py-[2px] bg-gray-900 text-gray-200 text-center text-nowrap
                rounded-lg translate-x-[-50%] translate-y-[-120%] group-hover:block"
            >
              데이터 제작
            </p>
            {/* 팝업 */}
            {toastPopupActive && (
              <ToastPopup
                message={toastPopupMessage}
                ms={1500}
                setter={setToastPopupActive}
              />
            )}
          </button>
          <a
            href="https://forms.gle/NoCmMhxvd5feDmCT6"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative w-7 selection:bg-transparent aspect-square`}
          >
            <Image
              className="transition:[filter_0s] [filter:invert(56%)_sepia(1%)_saturate(0%)_hue-rotate(46deg)_brightness(96%)_contrast(88%)]
                hover:[filter:invert(98%)_sepia(2%)_saturate(548%)_hue-rotate(357deg)_brightness(114%)_contrast(75%)]"
              src="/images/others/page-new.png"
              alt="google-forms"
              fill
              sizes="10vw"
              draggable={false}
            />
            <p
              className="hidden absolute inset-x-auto top-0 left-[50%] z-10 px-3 py-[2px] bg-gray-900 text-gray-200 text-center text-nowrap
                rounded-lg translate-x-[-50%] translate-y-[-135%] group-hover:block"
            >
              Google Forms
            </p>
          </a>
        </div>
      </div>

      {/* 아이디 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <a
          href="https://ark-gachaplanner.netlify.app/operators"
          target="_blank"
          rel="noopener noreferrer"
          className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 underline break-keep"
        >
          아이디
        </a>
        <input
          className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
            bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          id="id"
          type="number"
          min={0}
          step={1}
          placeholder={`오퍼레이터 아이디를 입력해주세요.`}
          value={id}
          onInput={(event) => handleNumberStringValue(event, setId)}
          onKeyDown={(event) => handleExponentialNotation(event)}
        ></input>
      </div>

      {/* 이름 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
          이름
        </p>
        <input
          className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
            bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          id="name"
          type="text"
          placeholder={`오퍼레이터 이름을 입력해주세요.`}
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="off"
        ></input>
      </div>

      {/* 중국어 이름 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
          중국어 이름
        </p>
        <input
          className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
            bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          id="chinese-name"
          type="text"
          placeholder={`오퍼레이터 중국어 이름을 입력해주세요.`}
          value={chineseName}
          onChange={(event) => setChineseName(event.target.value)}
          autoComplete="off"
        ></input>
      </div>

      <EmptySpace />

      {/* 1스킬 이름 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
          1스킬 이름
        </p>
        <div className="flex flex-row items-center w-full gap-4">
          <input
            className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
              bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            id="skill-1-name"
            type="text"
            placeholder={`1스킬 이름을 입력해주세요.`}
            value={skillOneName}
            onChange={(event) => setSkillOneName(event.target.value)}
            autoComplete="off"
          ></input>
          <label
            htmlFor="skill-1-preferred"
            className="flex flex-row items-center gap-2 text-gray-200 text-nowrap cursor-pointer select-none"
          >
            <input
              id="skill-1-preferred"
              type="checkbox"
              className="w-4 h-4 cursor-pointer"
              checked={skillOnePreferred}
              onChange={(event) => setSkillOnePreferred(event.target.checked)}
            />
            선호
          </label>
        </div>
      </div>

      {/* 2스킬 이름 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
          2스킬 이름
        </p>
        <div className="flex flex-row items-center w-full gap-4">
          <input
            className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
              bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            id="skill-2-name"
            type="text"
            placeholder={`2스킬 이름을 입력해주세요.`}
            value={skillTwoName}
            onChange={(event) => setSkillTwoName(event.target.value)}
            autoComplete="off"
          ></input>
          <label
            htmlFor="skill-2-preferred"
            className="flex flex-row items-center gap-2 text-gray-200 text-nowrap cursor-pointer select-none"
          >
            <input
              id="skill-2-preferred"
              type="checkbox"
              className="w-4 h-4 cursor-pointer"
              checked={skillTwoPreferred}
              onChange={(event) => setSkillTwoPreferred(event.target.checked)}
            />
            선호
          </label>
        </div>
      </div>

      {/* 3스킬 이름 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
          3스킬 이름
        </p>
        <div className="flex flex-row items-center w-full gap-4">
          <input
            className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
              bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            id="skill-3-name"
            type="text"
            placeholder={`3스킬 이름을 입력해주세요.`}
            value={skillThreeName}
            onChange={(event) => setSkillThreeName(event.target.value)}
            autoComplete="off"
          ></input>
          <label
            htmlFor="skill-3-preferred"
            className="flex flex-row items-center gap-2 text-gray-200 text-nowrap cursor-pointer select-none"
          >
            <input
              id="skill-3-preferred"
              type="checkbox"
              className="w-4 h-4 cursor-pointer"
              checked={skillThreePreferred}
              onChange={(event) => setSkillThreePreferred(event.target.checked)}
            />
            선호
          </label>
        </div>
      </div>
    </div>
  );
}
