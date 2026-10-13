// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore, Provider } from "jotai";
import DepotPage from "@/app/depot/page";
import { userDepotAtom, userDepotInitializedAtom } from "@/store/depot";
import { createStorageData } from "@/tool/persisted-depot";
import { LMD } from "@/data/material";

afterEach(() => { cleanup(); localStorage.clear(); });
const setup = () => {
  const store = createStore();
  const user = userEvent.setup();
  render(<Provider store={store}><DepotPage /></Provider>);
  return { store, user };
};

describe("/depot 화면", () => {
  it("JSON 가져오기에서 입력한 수량을 창고 화면과 상태에 반영한다", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    const { store, user } = setup();
    await user.click(screen.getByRole("button", { name: /JSON 가져오기/ }));
    const input = await screen.findByRole("textbox");
    fireEvent.change(input, { target: { value: JSON.stringify({ [LMD.id]: 12345 }) } });
    await user.click(screen.getByRole("button", { name: "데이터 가져오기" }));
    expect(await screen.findByDisplayValue("12345")).toBeInTheDocument();
    expect(createStorageData(store.get(userDepotAtom)).items[LMD.id]).toBe(12345);
    expect(store.get(userDepotInitializedAtom)).toBe(true);
  });

  it("직접 입력으로 수량을 수정하고 초기화하면 빈 창고로 돌아간다", async () => {
    const { store, user } = setup();
    await user.click(screen.getByRole("button", { name: /직접 입력하기/ }));
    await screen.findAllByRole("spinbutton");
    const input = screen.getByRole("spinbutton", { name: "용문폐 보유량" });
    fireEvent.input(input, { target: { value: "25000" } });
    expect(createStorageData(store.get(userDepotAtom)).items[LMD.id]).toBe(25000);
    localStorage.setItem("userDepot", "saved");
    await user.click(screen.getByRole("button", { name: "창고 데이터 초기화" }));
    expect(await screen.findByRole("button", { name: /직접 입력하기/ })).toBeInTheDocument();
    expect(createStorageData(store.get(userDepotAtom)).items).toEqual({});
    expect(store.get(userDepotInitializedAtom)).toBe(false);
    expect(localStorage.getItem("userDepot")).toBeNull();
  });

  it("잘못된 JSON은 기존 창고 수량과 입력 화면을 보존한다", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    const { store, user } = setup();
    const before = createStorageData(store.get(userDepotAtom));
    await user.click(screen.getByRole("button", { name: /JSON 가져오기/ }));
    fireEvent.change(await screen.findByRole("textbox"), { target: { value: "{broken" } });
    await user.click(screen.getByRole("button", { name: "데이터 가져오기" }));
    await waitFor(() => expect(screen.getByRole("textbox")).toBeInTheDocument());
    expect(createStorageData(store.get(userDepotAtom))).toEqual(before);
    expect(store.get(userDepotInitializedAtom)).toBe(false);
  });
});
