import BaseType from "./BaseType";

interface RecordType extends BaseType {
  name: string;
  link: string;
  user_id?: string;
};

export default RecordType;
