import { RecordType } from "../types";
import Record from "../models/record";

const createRecord = (payload: RecordType) => {
  return Record.query().insertAndFetch(payload);
};

const fetchRecords = (id: string) => {
  return Record.query().select()
    .where("user_id", id)
    .orderBy("created_at", "DESC");
};

export {
  createRecord,
  fetchRecords,
};
