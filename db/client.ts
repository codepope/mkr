

import { DB } from "https://deno.land/x/sqlite/mod.ts";
// config
import { DATABASE, TABLE } from "./config.ts";

const db = new DB(DATABASE+".db");

const run = async () => {
  db.query("DROP TABLE IF EXISTS "+TABLE.USER);
  db.query("CREATE TABLE "+TABLE.USER+" (\
        id INTEGER PRIMARY KEY AUTOINCREMENT, \
        name text NOT NULL, \
        email text NOT NULL, \
        lat real, \
        lon real \
    ); \
  ");
};

run();

export default db;
