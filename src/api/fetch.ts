import { auctionUrl, marketUrl, rewardMarketCodes } from "./data";
import { LoaAuctionResponse, LoaMarketResponse } from "./types";

const auctionOptions = JSON.stringify({
  Sort: "BUY_PRICE",
  CategoryCode: 210000,
  ItemName: "5레벨 멸화의 보석",
  PageNo: 1,
  SortCondition: "ASC",
});

export async function getPrice(apiKey: string) {
  const result = {
    "2레벨 보석": 0,
    "위대한 명예의 돌파석": 0,
    "경이로운 명예의 돌파석": 0,
    "찬란한 명예의 돌파석": 0,
    "태양의 은총": 0,
    "태양의 축복": 0,
    "태양의 가호": 0,
  };

  const promises = [];
  for (const [name, code] of Object.entries(rewardMarketCodes)) {
    promises.push(
      fetch(marketUrl + code, {
        headers: {
          authorization: apiKey,
          "content-type": "application/json",
        },
      })
        .then((data) => data.json<LoaMarketResponse>())
        .then((json) => {
          const sum = json[0].Stats.reduce(
            (sum, stat) => sum + stat.AvgPrice,
            0
          );
          const avg = sum / json[0].Stats.length;
          result[name as keyof typeof rewardMarketCodes] = avg;
        })
        .catch((e) => {
          console.log(e);
        })
    );
  }

  promises.push(
    fetch(auctionUrl, {
      method: "POST",
      headers: {
        authorization: apiKey,
        "content-type": "application/json",
      },
      body: auctionOptions,
    })
      .then((data) => data.json<LoaAuctionResponse>())
      .then((json) => {
        const sum = json.Items.reduce(
          (sum, item) => sum + item.AuctionInfo.BuyPrice,
          0
        );
        const avg = sum / json.PageSize / 3 / 3 / 3;
        result["2레벨 보석"] = avg;
      })
  );

  await Promise.all(promises);

  for (const [name, value] of Object.entries(result)) {
    result[name as keyof typeof result] = Math.round(value * 10) / 10;
  }

  return result;
}
