import TABLES from "../constants/tables";
import { UserType } from "../types";
import { Model } from "../utilities/model";

class User extends Model implements UserType {
  id!: string;
  name!: string;
  created_at!: string;
  updated_at!: string;

  static get tableName() {
    return TABLES.USER;
  }

  static get relationMappings() {
    const Record = require("./record");
    return {
      records: {
        relation: Model.HasManyRelation,
        modelClass: Record,
        join: {
          from: `${TABLES.USER}.id`,
          to: `${TABLES.RECORD}.user_id`,
        },
      },
    };
  }
}

export default User;
