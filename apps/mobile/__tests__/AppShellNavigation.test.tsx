import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import App from "../App";

vi.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

describe("App shell navigation", () => {
  it("renders tabs and allows switching", async () => {
    const { getByText, findByText } = render(<App />);

    expect(getByText("Ana Sayfa")).toBeTruthy();
    expect(getByText("Keşfet")).toBeTruthy();
    expect(getByText("Kütüphane")).toBeTruthy();
    expect(getByText("Gelişim")).toBeTruthy();
    expect(getByText("Profil")).toBeTruthy();

    fireEvent.press(getByText("Keşfet"));
    expect(await findByText("Yeni içerikleri keşfet")).toBeTruthy();

    fireEvent.press(getByText("Kütüphane"));
    expect(await findByText("Kaydedilen içerikler")).toBeTruthy();

    fireEvent.press(getByText("Gelişim"));
    expect(await findByText("İlerlemeni takip et")).toBeTruthy();

    fireEvent.press(getByText("Profil"));
    expect(await findByText("Hesabını yönet")).toBeTruthy();
  });
});
