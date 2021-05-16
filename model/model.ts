import db from "../db/client.ts";

import User from "../interfaces/User.ts";

import { TABLE } from "../db/config.ts";

export default {
  doesUserExistByID: async ({ id }: User) => {
    const [result] = await db.query(
      `SELECT COUNT(*) count FROM ${TABLE.USER} WHERE id = ? LIMIT 1`,
      [id],
    );
    return result.length > 0;
  },
  getUserByID: async ({ id }: User) => {
    const [result] = await db.query(
      `SELECT * FROM ${TABLE.USER} WHERE id = ?`,
      [id],
    );
    return result;
  },
  addUser: async ({ name, email, lat, lon }: User) => {
    return db.query(
      `INSERT INTO ${TABLE.USER} (name, email,lat,lon) values (?,?,?,?)`,
      [
        name,
        email,
        lat,
        lon,
      ],
    );
  },
  deleteUser: async ({ id }: User) => {
    const [result] = await db.query(
      `DELETE FROM ${TABLE.USER} WHERE id = ?`,
      [id],
    );
    // return count of rows updated
    return db.changes;
  }
};
