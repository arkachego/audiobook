import TABLES from "../constants/tables";
import { RecordType } from "../types";
import { Model } from "../utilities/model";

class Record extends Model implements RecordType {
  id!: string;
  name!: string;
  link!: string;
  created_at!: string;
  updated_at!: string;
  user_id!: string;

  static get tableName() {
    return TABLES.RECORD;
  }

  static get relationMappings() {
    const User = require("./user");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${TABLES.RECORD}.user_id`,
          to: `${TABLES.USER}.id`,
        },
      },
    };
  }
}

export default Record;
