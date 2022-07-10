import { DayOffs } from "../components/dayOffs/dayOffs.component";
import { Code } from "../components/codes/codes.component";

export interface BaseData {
  systemName: string | null,
  name: string | null,
  description: string | null,
  executionPriority: string | null,
  sourceDataBase: string | null,
  sourceSchema: string | null,
  sourceTable: string | null,
  dayOffs: DayOffs[],
  codes: Code[],
}
