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
    nickname: "坂田銀河",
    watermark: 0,
  },
  {
    id: "mourikotarou",
    nickname: "毛利浩太郎",
    watermark: 50,
  },
  {
    id: "midorikawaken",
    nickname: "緑川剣",
    watermark: 100,
  },
  {
    id: "nakaharatadaya",
    nickname: "中原忠也",
    watermark: 50,
  },
  {
    id: "nikaidoyamato",
    nickname: "二階堂大和",
    watermark: 50,
  },
  {
    id: "natsumefukutarou",
    nickname: "夏目福太郎",
    watermark: 50,
  },
  {
    id: "matsunokazuma",
    nickname: "松野一馬",
    watermark: 50,
  },
  {
    id: "tobaminami",
    nickname: "鳥羽美波",
    watermark: 50,
  },
  {
    id: "mizunoaoi",
    nickname: "水野碧",
    watermark: 50,
  },
  {
    id: "toudoena",
    nickname: "藤堂恵那",
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

const images = [
  "/Ale.png",
  "/Lager.png",
  "/White Beer.png",
  "/Weizen.png",
  "/Weizenbock.png",
  "/Berliner Weisse.png",
  "/Wit.png",
  "/Pale Ale.png",
  "/Barleywine.png",
  "/India Pale Ale.png",
  "/Red Ale.png",
  "/Brown Ale.png",
  "/Light Ale.png",
  "/Dark Ale.png",
  "/Porter.png",
  "/Stout.png",
  "/Altbier.png",
  "/Pilsner.png",
  "/Helles.png",
  "/Export.png",
  "/Lambic.png",
  "/Red Beer.png",
  "/Rauchbier.png",
  "/Eisbock.png",
  "/Ice Lager.png",
];

const breweries = [
  "奈良蔵ブルワリー",
  "大和ビール工房",
  "橿原酒造",
  "飛鳥西ブルワリー",
  "都工房",
  "若草ビール",
  "猿沢池ブルワリー",
  "8th century",
  "東大寺の森ビール",
  "桜風ブルワリー",
  "泉の里ブルワリー",
  "暦工房",
  "鹿島醸造",
  "夢水ブルワリー",
  "風の町ブルワリー",
  "宝山寺ビール",
  "興福寺醸造所",
  "五條酒造",
  "三春ビール",
];

const locations = [
  "奈良市、伝統的な蔵や歴史地区の近くが考えられます。",
  "大和地方（奈良県全域を指す広義の地域）のどこか、風光明媚な場所にあるクラフトビール工房かもしれません。",
  "飛鳥村西部または飛鳥地域全般。",
  "歴史的に重要な場所である橿原市。",
  "奈良市、旧都の近くが考えられます。",
  "奈良市の若草山の近く。",
  "奈良市の猿沢池のすぐそば。",
  "奈良市、または奈良県内の歴史的に重要な地域。",
  "奈良市の東大寺を取り囲む森の近く。",
  "奈良の桜の名所、おそらく吉野か奈良公園。",
  "奈良県内の純粋な湧き水や水源で知られる村や地域。",
  "奈良県内のどこか、暦や時間計測に歴史的なつながりがある場所かもしれません。",
  "奈良県北東部、京都府や三重県との県境近く、おそらく歴史的な場所や家名を指している可能性があります。",
  "奈良の美しく伝説的な水源がある地域、おそらく山奥にひっそりと佇む場所。",
  "奈良の風がよく通り抜ける、あるいは開放的な風景が広がる町、おそらく西部または南部。",
  "生駒市の宝山寺の近く。",
  "奈良市の興福寺の近く。",
  "奈良県南部の五條市。",
  "奈良の風光明媚な田舎。",
];

const notes = [
  "詩的で季節感のある醸造所で、おそらく繊細な、もしかしたらフルーツ風味の、または花の香りのするビールを生産し、自然の美しさを強く強調しています。",
  "自由と自然さを体現する醸造所で、開放的で束縛されない精神を反映し、軽やかで風通しの良い、または爽やかなビールを生産しているかもしれません。",
  "スピリチュアルで瞑想的な雰囲気を持つ醸造所で、宝山寺の静けさにつながる、ユニークで、もしかしたら職人的なビール体験を提供している可能性があります。",
  "水源の純粋さを誇り、清潔で爽やかな、すっきりとしたビールを生産している醸造所。",
  "夢のような、おそらく革新的な醸造所で、手つかずの自然の水にインスパイアされたユニークな、あるいは実験的なビールで知られています。",
  "東大寺と同様に、精神的または歴史的に重要なつながりを持つ醸造所で、おそらく修道院の伝統を反映した、あるいは敬意を込めて作られたビールを製造しています。",
  "細心の注意を払い、正確な醸造所で、古代の暦作りの技術に敬意を表し、おそらく季節限定のリリースや時間とともに進化するビールに焦点を当てています。",
  "五條の地域社会と歴史に深くつながり、強力な地域性を持ち、おそらく力強く伝統的なビールを生産している醸造所。",
  "爽やかで季節感のある醸造所で、春の新鮮さを思わせる軽くて爽やかなビール、または季節の移り変わりを祝う様々なビールで知られているかもしれません。",
  "長い伝統を持つ伝統的な醸造所で、おそらく家族経営で、一貫した品質と古典的なスタイルで知られています。",
  "奈良がかつて壮麗な都であったことを反映し、洗練された、おそらく上品なビールを生産している、優雅で洗練された醸造所。",
  "象徴的な芝生の山からインスピレーションを得て、新鮮で自然なイメージを持ち、おそらく軽やかで爽やかなビールを生産している醸造所。",
  "魅力的で絵のように美しい醸造所で、リラックスした雰囲気と素晴らしい景色を提供し、観光客や地元の人々に人気の場所となっています。",
  "手作り感があり、職人的で革新性を重視した醸造所。醸造体験を提供している可能性もあります。",
  "奈良の歴史的な本質を体現し、伝統的な醸造方法と地元の食材に焦点を当てた、古典的で由緒ある醸造所。",
  "「酒造」は通常、日本酒の醸造所を意味しますが、ビールの場合、橿原の古代の帝国のつながりを反映し、深い歴史的ルーツを持ち、伝統的または歴史的なビールスタイルに焦点を当てた醸造所を示唆します。",
  "古代飛鳥時代からインスピレーションを得て、歴史的な材料やテーマを用いたユニークなビールを、穏やかな田園風景の中で造っている醸造所。",
  "奈良時代の歴史に深く根ざし、古代の醸造技術や歴史に触発されたレシピを専門とし、時代を超越した感覚を呼び起こす醸造所。",
  "自然の素材と東大寺の静かで精神的な環境とのつながりを重視し、職人的な、あるいは修道院スタイルのビールを生産している醸造所。",
];

export async function main(db: ReturnType<typeof drizzle>) {
  await db.insert(usersTable).values(users).execute();
  await seed(db, schema).refine((f) => ({
    checkinsTable: {
      count: 1000,
      columns: {
        name: f.valuesFromArray({ values: beers }),
        date: f.date({ minDate: "2020-06-01", maxDate: "2020-12-31" }),
        amount: f.int({ minValue: 0 }),
        image: f.valuesFromArray({ values: images }),
        brewery: f.valuesFromArray({ values: breweries }),
        location: f.valuesFromArray({ values: locations }),
        note: f.valuesFromArray({ values: notes }),
        userId: f.valuesFromArray({ values: users.map((u) => u.id) }),
      },
    },
    usersTable: { count: 0.1 },
    jobsTable: {
      count: 10,
      columns: {
        date: f.date(),
        userId: f.valuesFromArray({ values: users.map((u) => u.id) }),
        status: f.valuesFromArray({
          values: ["Printing", "Queued", "Paused"],
        }),
      },
    },
  }));
}
