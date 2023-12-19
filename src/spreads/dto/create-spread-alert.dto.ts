export class CreateSpreadAlertDto {
  id: string;
  market_id: string;
  max_bid: [string, string];
  min_ask: [string, string];
  spread: number;
}
