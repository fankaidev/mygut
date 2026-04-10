import { getDatabase, getOpenId } from "../utils/cloud";
import type { HealthRecord } from "../types";

const COLLECTION = "health_records";

// 添加身体状态记录
export async function addHealthRecord(
  data: Omit<HealthRecord, "_id" | "userId" | "createdAt">,
): Promise<string> {
  const db = getDatabase();
  const userId = await getOpenId();

  const res = await db.collection(COLLECTION).add({
    data: {
      ...data,
      userId,
      createdAt: new Date(),
    },
  });

  return res._id as string;
}

// 获取某天的身体状态记录
export async function getHealthRecordsByDate(date: string): Promise<HealthRecord[]> {
  const db = getDatabase();
  const userId = await getOpenId();

  const res = await db
    .collection(COLLECTION)
    .where({
      userId,
      date,
    })
    .orderBy("createdAt", "desc")
    .get();

  return res.data as HealthRecord[];
}

// 获取最近的身体状态记录
export async function getRecentHealthRecords(limit: number = 20): Promise<HealthRecord[]> {
  const db = getDatabase();
  const userId = await getOpenId();

  const res = await db
    .collection(COLLECTION)
    .where({ userId })
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return res.data as HealthRecord[];
}

// 更新身体状态记录
export async function updateHealthRecord(
  id: string,
  data: Partial<Omit<HealthRecord, "_id" | "userId" | "createdAt">>,
): Promise<void> {
  const db = getDatabase();

  await db.collection(COLLECTION).doc(id).update({
    data,
  });
}

// 删除身体状态记录
export async function deleteHealthRecord(id: string): Promise<void> {
  const db = getDatabase();

  await db.collection(COLLECTION).doc(id).remove();
}

// 获取单条记录
export async function getHealthRecord(id: string): Promise<HealthRecord | null> {
  const db = getDatabase();

  const res = await db.collection(COLLECTION).doc(id).get();

  return (res.data as HealthRecord) || null;
}
