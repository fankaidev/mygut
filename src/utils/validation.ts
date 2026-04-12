// Pattern: Chinese characters, English letters, numbers, underscore
const NICKNAME_PATTERN = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;

export function validateNickname(value: string): string | null {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return "昵称不能为空";
  }

  if (trimmed.length > 20) {
    return "昵称长度不能超过20字符";
  }

  if (!NICKNAME_PATTERN.test(trimmed)) {
    return "昵称只能包含中英文、数字、下划线";
  }

  return null;
}
