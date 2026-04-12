import { describe, it, expect } from "vitest";
import { validateNickname, validateFood, validateSymptom, validateMedication } from "./validation";

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

describe("validateFood", () => {
  it("returns null for valid food name", () => {
    expect(validateFood("红烧肉")).toBeNull();
    expect(validateFood("Pasta")).toBeNull();
    expect(validateFood("牛奶(低脂)")).toBeNull();
    expect(validateFood("全麦面包-无糖")).toBeNull();
  });

  it("returns error for empty food name", () => {
    expect(validateFood("")).toBe("食物名称不能为空");
    expect(validateFood("   ")).toBe("食物名称不能为空");
  });

  it("returns error for food name exceeding 30 characters", () => {
    expect(validateFood("a".repeat(31))).toBe("食物名称不能超过30字符");
  });

  it("returns error for invalid characters", () => {
    expect(validateFood("食物@名")).toBe("食物名称包含无效字符");
    expect(validateFood("food#1")).toBe("食物名称包含无效字符");
  });
});

describe("validateSymptom", () => {
  it("returns null for valid symptom name", () => {
    expect(validateSymptom("腹痛")).toBeNull();
    expect(validateSymptom("headache")).toBeNull();
    expect(validateSymptom("胃胀气")).toBeNull();
  });

  it("returns error for empty symptom name", () => {
    expect(validateSymptom("")).toBe("症状名称不能为空");
    expect(validateSymptom("   ")).toBe("症状名称不能为空");
  });

  it("returns error for symptom name exceeding 20 characters", () => {
    expect(validateSymptom("a".repeat(21))).toBe("症状名称不能超过20字符");
  });

  it("returns error for invalid characters", () => {
    expect(validateSymptom("症状123")).toBe("症状名称只能包含中英文");
    expect(validateSymptom("pain@stomach")).toBe("症状名称只能包含中英文");
  });
});

describe("validateMedication", () => {
  it("returns null for valid medication name", () => {
    expect(validateMedication("布洛芬")).toBeNull();
    expect(validateMedication("Ibuprofen")).toBeNull();
    expect(validateMedication("维生素B12")).toBeNull();
    expect(validateMedication("阿莫西林(500mg)")).toBeNull();
  });

  it("returns error for empty medication name", () => {
    expect(validateMedication("")).toBe("药物名称不能为空");
    expect(validateMedication("   ")).toBe("药物名称不能为空");
  });

  it("returns error for medication name exceeding 50 characters", () => {
    expect(validateMedication("a".repeat(51))).toBe("药物名称不能超过50字符");
  });

  it("returns error for invalid characters", () => {
    expect(validateMedication("药物@名")).toBe("药物名称包含无效字符");
    expect(validateMedication("med#1")).toBe("药物名称包含无效字符");
  });
});
