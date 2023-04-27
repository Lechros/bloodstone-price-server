export type LoaMarketResponse = {
  Name: string;
  TradeRemainCount: number | null;
  BundleCount: number;
  Stats: {
    Date: string;
    AvgPrice: number;
    TradeCount: number;
  }[];
  ToolTip: string;
}[];

export type LoaAuctionResponse = {
  PageNo: number;
  PageSize: number;
  TotalCount: number;
  Items: {
    Name: string;
    Grade: string;
    Tier: number;
    Level: null;
    Icon: string;
    GradeQuality: null;
    AuctionInfo: {
      StartPrice: number;
      BuyPrice: number;
      BidPrice: number;
      EndDate: string;
      BidCount: number;
      BidStartPrice: number;
      IsCompetitive: boolean;
      TradeAllowCount: number;
    };
    Options: {
      Type: string;
      OptionName: string;
      OptionNameTripod: string;
      Value: number;
      IsPenalty: boolean;
      ClassName: string;
    }[];
  }[];
};
