export class StatisticResponse {
  month: number;
  totalAmountPerMonth: number;

  constructor(month: number, totalAmountPerMonth: number) {
      this.month = month;
      this.totalAmountPerMonth = totalAmountPerMonth;
  }
}