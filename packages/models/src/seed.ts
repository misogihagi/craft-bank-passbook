import type { drizzle } from "drizzle-orm/better-sqlite3";
import { seed } from "drizzle-seed";
import { checkinsTable, usersTable, jobsTable } from "./schema";

const schema = {
  checkinsTable,
  usersTable,
  jobsTable,
};

// https://animeanime.jp/article/2021/08/24/63402.html

const users = [
  {
    id: "sakataginga",
    displayName: "坂田銀河",
    watermark: 0,
  },
  {
    id: "mourikotarou",
    displayName: "毛利浩太郎",
    watermark: 50,
  },
  {
    id: "midorikawaken",
    displayName: "緑川剣",
    watermark: 100,
  },
  {
    id: "nakaharatadaya",
    displayName: "中原忠也",
    watermark: 50,
  },
  {
    id: "nikaidoyamato",
    displayName: "二階堂大和",
    watermark: 50,
  },
  {
    id: "natsumefukutarou",
    displayName: "夏目福太郎",
    watermark: 50,
  },
  {
    id: "matsunokazuma",
    displayName: "松野一馬",
    watermark: 50,
  },
  {
    id: "tobaminami",
    displayName: "鳥羽美波",
    watermark: 50,
  },
  {
    id: "mizunoaoi",
    displayName: "水野碧",
    watermark: 50,
  },
  {
    id: "toudoena",
    displayName: "藤堂恵那",
    watermark: 50,
  },
];

const beers = [
  "エール",
  "ラガー",
  "白ビール",
  "ヴァイツェン",
  "ヴァイツェンボック",
  "ベルリーナー・ヴァイセ",
  "ヴィット",
  "ペール・エール",
  "バーレーワイン",
  "インディア・ペールエール",
  "レッド・エール",
  "ブラウン・エール",
  "ライトエール",
  "ダークエール",
  "ポーター",
  "スタウト",
  "アルトビール",
  "ピルスナー",
  "ヘレス",
  "エクスポート",
  "ランビック",
  "レッドビール",
  "ラオホビア",
  "アイスボック",
  "アイスラガー",
];

export async function main(db: ReturnType<typeof drizzle>) {
  await db.insert(usersTable).values(users).execute();
  await seed(db, schema).refine((f) => ({
    checkinsTable: {
      count: 1000,
      columns: {
        nickname: f.valuesFromArray({ values: beers }),
        date: f.date(),
        userId: f.valuesFromArray({ values: users.map((u) => u.id) }),
      },
    },
    usersTable: { count: 0.1 },
    jobsTable: {
      count: 1,
      columns: {
        date: f.date(),
        userId: f.valuesFromArray({ values: users.map((u) => u.id) }),
      },
    },
  }));
}
