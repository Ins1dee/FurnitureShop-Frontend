export class CreateOrderRequest {
  products: { [key: string]: number };
  customerName: string;
  customerPhone: string;
  paymentAmount: number;
  deliveryAddress?: string;

  constructor(
    products: { [key: string]: number },
    customerName: string,
    customerPhone: string,
    paymentAmount: number,
    deliveryAddress?: string
  ) {
    this.products = products;
    this.customerName = customerName;
    this.customerPhone = customerPhone;
    this.paymentAmount = paymentAmount;
    this.deliveryAddress = deliveryAddress;
  }
}