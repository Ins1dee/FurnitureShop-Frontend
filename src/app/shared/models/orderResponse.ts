export class OrderDetailResponse {
  constructor(
      public ProductName: string,
      public Quantity: number,
      public Price: number
  ) {}
}

export class IncomeResponse {
  constructor(
      public IncomeType: string,
      public Amount: number
  ) {}
}

export class OrderResponse {
  constructor(
      public id: string,
      public SellerName: string,
      public CustomerName: string,
      public CustomerPhone: string,
      public TotalAmount: number,
      public PaymentStatus: string,
      public CreatedAtUtc: Date,
  ) {}
}
