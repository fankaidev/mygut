import { getDatabase, getOpenId } from "../utils/cloud";
import type { StoolRecord } from "../types";

const COLLECTION = "stool_records";

export async function addStoolRecord(
  data: Omit<StoolRecord, "_id" | "userId" | "createdAt">,
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

export async function getRecentStoolRecords(limit: number = 20): Promise<StoolRecord[]> {
  const db = getDatabase();
  const userId = await getOpenId();

  const res = await db
    .collection(COLLECTION)
    .where({ userId })
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return res.data as StoolRecord[];
}

export async function deleteStoolRecord(id: string): Promise<void> {
  const db = getDatabase();

  await db.collection(COLLECTION).doc(id).remove();
}

// 获取指定日期的排便记录
export async function getStoolRecordsByDate(date: string): Promise<StoolRecord[]> {
  const db = getDatabase();
  const userId = await getOpenId();

  const res = await db.collection(COLLECTION).where({ userId, date }).orderBy("time", "asc").get();

  return res.data as StoolRecord[];
}
