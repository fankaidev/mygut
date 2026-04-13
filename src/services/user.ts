import Taro from "@tarojs/taro";
import { getDatabase, getOpenId } from "../utils/cloud";

const COLLECTION = "user_settings";

interface UserSettings {
  _id: string; // 使用 userId 作为 _id
  nickname?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 将云存储 fileID 转换为临时访问 URL
async function getAvatarUrl(fileID: string): Promise<string> {
  const res = await Taro.cloud.getTempFileURL({ fileList: [fileID] });
  if (res.fileList[0]?.status === 0) {
    return res.fileList[0].tempFileURL;
  }
  return fileID; // 转换失败时返回原值
}

// 获取当前用户设置（不存在则自动创建）
export async function getUserSettings(): Promise<UserSettings> {
  const db = getDatabase();
  const userId = await getOpenId();

  // 先查询是否存在
  const res = await db.collection(COLLECTION).where({ _id: userId }).limit(1).get();

  if (res.data && res.data.length > 0) {
    const settings = res.data[0] as UserSettings;
    // 如果有头像 fileID，转换为临时 URL
    if (settings.avatar && settings.avatar.startsWith("cloud://")) {
      settings.avatar = await getAvatarUrl(settings.avatar);
    }
    return settings;
  }

  // 不存在，创建新记录
  const newSettings: UserSettings = {
    _id: userId,
    createdAt: new Date(),
  };

  await db.collection(COLLECTION).add({
    data: newSettings,
  });

  return newSettings;
}

// 获取默认昵称
export function getDefaultNickname(userId: string): string {
  return `微信用户 ${userId.slice(-4)}`;
}

// 更新用户设置
export async function updateUserSettings(data: {
  nickname?: string;
  avatar?: string;
}): Promise<void> {
  const db = getDatabase();
  const userId = await getOpenId();

  await db
    .collection(COLLECTION)
    .doc(userId)
    .update({
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
}

// 上传头像到云存储，返回 fileID 和临时访问 URL
export async function uploadAvatar(
  tempFilePath: string
): Promise<{ fileID: string; tempURL: string }> {
  const openId = await getOpenId();
  const cloudPath = `${openId}/avatar.jpg`;

  const res = await Taro.cloud.uploadFile({
    cloudPath,
    filePath: tempFilePath,
  });

  const tempURL = await getAvatarUrl(res.fileID);
  return { fileID: res.fileID, tempURL };
}
