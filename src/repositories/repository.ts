import connection from "../database/db.js";

export function createUser(username: string) {
  return connection.query(
    `INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, 0, 0, 0)`,
    [username]
  );
}

export function findUser(username: string): Promise<any> {
  return connection.query(`SELECT * FROM fighters WHERE username = $1`, [
    username,
  ]);
}

export function updateUser(username: string, field: string): Promise<any> {
  return connection.query(
    `UPDATE fighters SET ${field} = ${field} + 1 WHERE username = $1`,
    [username]
  );
}

export function getRanking(): Promise<any> {
  return connection.query(
    `SELECT username, wins, losses, draws FROM fighters ORDER BY wins DESC`
  );
}
