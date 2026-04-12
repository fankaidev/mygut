import { describe, it, expect } from "vitest";
import { validateNickname } from "./validation";

describe("validateNickname", () => {
  it("returns null for valid nickname", () => {
    expect(validateNickname("用户123")).toBeNull();
    expect(validateNickname("test_user")).toBeNull();
    expect(validateNickname("张三")).toBeNull();
  });

  it("returns error for empty nickname", () => {
    expect(validateNickname("")).toBe("昵称不能为空");
    expect(validateNickname("   ")).toBe("昵称不能为空");
  });

  it("returns error for nickname exceeding 20 characters", () => {
    expect(validateNickname("a".repeat(21))).toBe("昵称长度不能超过20字符");
  });

  it("returns error for invalid characters", () => {
    expect(validateNickname("user@name")).toBe("昵称只能包含中英文、数字、下划线");
    expect(validateNickname("user name")).toBe("昵称只能包含中英文、数字、下划线");
    expect(validateNickname("用户😀")).toBe("昵称只能包含中英文、数字、下划线");
  });
});
