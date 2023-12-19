/**
 * Dependencies
 * We must include all third-party libraries that we use in the project
 * and are needed for this feature
 */

/**
 * Sub-dependencies
 * We must include all libraries developed within the project
 * and are needed for this feature
 */

export interface Spread {
  id: string;
  market_id: string;
  max_bid: [string, string];
  min_ask: [string, string];
  spread: number;
}
