import { View, Text, Image } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import { useState, useCallback } from "react";
import { getUserSettings, getDefaultNickname } from "../../services/user";
import ProfilePopup from "../../components/ProfilePopup";
import "./index.css";

export default function Settings() {
  const [userSettings, setUserSettings] = useState<{
    _id: string;
    nickname?: string;
    avatar?: string;
  } | null>(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const loadUserSettings = useCallback(async () => {
    try {
      const settings = await getUserSettings();
      setUserSettings(settings);
    } catch (error) {
      console.error("加载用户设置失败:", error);
    }
  }, []);

  useDidShow(() => {
    loadUserSettings();
  });

  const handleProfileClick = () => {
    setShowProfilePopup(true);
  };

  const handleProfileClose = () => {
    setShowProfilePopup(false);
  };

  const handleProfileSave = (data: { nickname: string; avatar?: string }) => {
    setUserSettings((prev) => (prev ? { ...prev, ...data } : prev));
    setShowProfilePopup(false);
  };

  const displayNickname =
    userSettings?.nickname ||
    (userSettings?._id ? getDefaultNickname(userSettings._id) : "加载中...");

  return (
    <View className="settings-page">
      <View className="profile-section" onClick={handleProfileClick}>
        <View className="profile-avatar">
          {userSettings?.avatar ? (
            <Image className="avatar-img" src={userSettings.avatar} mode="aspectFill" />
          ) : (
            <View className="avatar-default" />
          )}
        </View>
        <View className="profile-info">
          <Text className="profile-nickname">{displayNickname}</Text>
          <Text className="profile-hint">点击编辑个人资料</Text>
        </View>
        <Text className="profile-arrow">›</Text>
      </View>

      <ProfilePopup
        visible={showProfilePopup}
        nickname={displayNickname}
        avatar={userSettings?.avatar}
        onClose={handleProfileClose}
        onSave={handleProfileSave}
      />
    </View>
  );
}
