import { count, desc, eq, sql } from "drizzle-orm";
import {
  type BetterSQLite3Database,
  drizzle,
} from "drizzle-orm/better-sqlite3";
import * as schema from "@repo/models";
import { checkinsTable, jobsTable, usersTable } from "@repo/models";
import { err, ResultAsync, okAsync } from "neverthrow";

function isPresent(
  db: BetterSQLite3Database<typeof schema>,
  table: typeof usersTable | typeof jobsTable
): <T extends number | string>(id: T) => ResultAsync<boolean, Error> {
  return <T extends number | string>(id: T): ResultAsync<boolean, Error> => {
    return ResultAsync.fromPromise(
      db.select().from(table).where(eq(table.id, id)).limit(1),
      (error) => error as Error // Promiseがrejectされた場合にErrorオブジェクトに変換
    ).andThen((result) => {
      // レコードが見つかればtrue、見つからなければfalse
      return okAsync(!!result);
    });
  };
}

function getCheckinList(
  db: BetterSQLite3Database<typeof schema>,
  userId: string,
  { limit = 30, offset = 30 }: { limit: number; offset: number }
) {
  return db
    .select({
      name: checkinsTable.name,
      date: checkinsTable.date,
      amount: checkinsTable.amount,
    })
    .from(checkinsTable)
    .where(eq(checkinsTable.userId, userId))
    .orderBy(desc(checkinsTable.date))
    .limit(limit)
    .offset(offset);
}

export function getUserInfo(
  db: BetterSQLite3Database<typeof schema>,
  userId: string
) {
  return db.query.usersTable.findFirst({
    where: eq(checkinsTable.id, userId),
    columns: {
      nickname: true,
    },
  });
}

export async function setUserInfo(
  db: BetterSQLite3Database<typeof schema>,
  userId: string,
  { nickname }: { nickname: string }
) {
  await db
    .update(usersTable)
    .set({ nickname })
    .where(eq(usersTable.id, userId));
  return { nickname };
}

export async function requestPrint(
  db: BetterSQLite3Database<typeof schema>,
  userId: string
) {
  // user id check
  const isUserPresent = isPresent(db, usersTable);
  const result = await isUserPresent(userId);
  if (result.isErr()) return err("no user found");

  return await db
    .insert(jobsTable)
    .values({ userId, date: sql`CURRENT_TIMESTAMP` });
}

function getJobCatalog(db: BetterSQLite3Database<typeof schema>) {
  return db
    .select({ nickname: usersTable.nickname, date: jobsTable.date })
    .from(jobsTable)
    .leftJoin(usersTable, eq(usersTable.id, jobsTable.userId));
}

async function getJobById(
  db: BetterSQLite3Database<typeof schema>,
  jobId: number
) {
  // job id check
  const isJobPresent = isPresent(db, jobsTable);
  const result = await isJobPresent(jobId);
  if (result.isErr()) return err("no job found");

  const { date, userId } = (await db.query.jobsTable.findFirst({
    // 上いらなかったのでは？ <-それな
    where: eq(jobsTable.id, jobId),
  })) as { date: string; userId: string };

  // check済みのためキャスト
  const { watermark } = (await db.query.usersTable.findFirst({
    where: eq(usersTable.id, userId),
  })) as { watermark: number };

  // 全てのデータとwatermarkの差だけ印刷する
  const rows = await db
    .select({ checkinsCount: count() })
    .from(checkinsTable)
    .where(eq(checkinsTable.userId, userId));

  const checkinsCount = rows[0].checkinsCount;

  const checkins = await db.query.checkinsTable.findMany({
    where: eq(checkinsTable.userId, userId),
    orderBy: desc(checkinsTable.date),
    limit: checkinsCount - watermark,
  });

  return {
    date,
    checkins,
    watermark,
  };
}

async function print(db: BetterSQLite3Database<typeof schema>, jobId: number) {
  // job id check
  const isJobPresent = isPresent(db, jobsTable);
  const result = await isJobPresent(jobId);
  if (result.isErr()) return err("no job found");

  const { userId } = (await db.query.jobsTable.findFirst({
    where: eq(jobsTable.id, jobId),
  })) as { date: string; userId: string };

  // 全てのデータとwatermarkの差だけ印刷する
  const rows = await db
    .select({ checkinsCount: count() })
    .from(checkinsTable)
    .where(eq(checkinsTable.userId, userId));

  const checkinsCount = rows[0].checkinsCount;

  // プリンター側で印刷したらたたかれる想定
  // 印刷していないのにたたかれてはいけない
  await db.delete(jobsTable).where(eq(jobsTable.id, jobId));
  await db
    .update(usersTable)
    .set({ watermark: checkinsCount })
    .where(eq(usersTable.id, userId));
}

export function usecases(client) {
  const db = drizzle({ client, schema });

  return {
    getCheckinList: (
      userId: string,
      options: { limit: number; offset: number }
    ) => getCheckinList(db, userId, options),
    getUserInfo: (userId: string) => getUserInfo(db, userId),
    setUserInfo: (userId: string, info: { nickname: string }) =>
      setUserInfo(db, userId, info),
    requestPrint: (userId: string) => requestPrint(db, userId),
    getJobCatalog: (id: string) => getJobCatalog(db),
    getJobById: (jobId: number) => getJobById(db, jobId),
    print: (jobId) => print(db, jobId),
  };
}
