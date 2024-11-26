"use client";

import { useEffect, useState } from "react";

interface ModuleTextInputProps {
  itemId: number;
  handleChange: (text: string, itemIndex: number, index: number) => void;
}

/** 모듈 타입 및 이름 등 텍스트를 입력받는 컴포넌트 */
export default function ModuleTextInput({
  itemId,
  handleChange,
}: ModuleTextInputProps) {
  // 모듈 타입 및 이름
  const [moduleType, setModuleType] = useState("");
  const [moduleName, setModuleName] = useState("");

  // 타입 변경 반영
  useEffect(() => {
    if (moduleType) {
      handleChange(moduleType, itemId, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleType, itemId]);

  // 이름 변경 반영
  useEffect(() => {
    if (moduleName) {
      handleChange(moduleName, itemId, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleName, itemId,]);

  return (
    <>
      {/* 타입 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
          {itemId + 1}모듈 타입
        </p>
        <input
          className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
            bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          id={`module-${itemId}-type`}
          type="text"
          placeholder={`모듈 타입을 입력해주세요. (e.g. BOM-X)`}
          value={moduleType}
          onChange={(event) => setModuleType(event.target.value)}
          autoComplete="off"
        ></input>
      </div>
      {/* 이름 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="px-1 w-40 leading-none font-semibold text-xl text-gray-200 break-keep">
          {itemId + 1}모듈 이름
        </p>
        <input
          className="w-full px-4 py-1 rounded-lg resize-none outline-solid outline-1 outline-gray-400
            bg-dark-800 text-gray-200 selection:bg-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          id={`module-${itemId}-name`}
          type="text"
          placeholder={`모듈 이름을 입력해주세요. (e.g. '조상 발사기')`}
          value={moduleName}
          onChange={(event) => setModuleName(event.target.value)}
          autoComplete="off"
        ></input>
      </div>
    </>
  );
}
