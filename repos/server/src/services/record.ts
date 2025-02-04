import { RecordType } from "../types";
import Record from "../models/record";

const createRecord = async (payload: RecordType) => {
  return Record.query().insertAndFetch(payload);
};

const fetchRecords = async (id: string) => {
  
};

export {
  createRecord,
  fetchRecords,
};
