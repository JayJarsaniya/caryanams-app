export type MatchCondition =
  | {
      [key: string]:
        | string
        | { $regex: string; $options: string }
        | { $in: string[] }
        | { $lt?: string; $lte?: string; $gt?: string; $gte?: string }
        | MatchCondition[]
        | { $or: MatchCondition[] }
        | { $and: MatchCondition[] };
    }
  | {
      $expr: Record<string, unknown>;
    };

export interface LookupStage {
  $match?: MatchCondition | { $and: MatchCondition[] };
  $skip?: number;
  $limit?: number;
}
