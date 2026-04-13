import { createRecordService } from "./base";
import type { ExamRecord } from "../types";

export const examService = createRecordService<ExamRecord>("exam_records");
