export class DeliveryResponse {
  id: string;
  address: string;
  createdAtUtc: Date;
  arrivesAtUtc: Date;
  delivered: boolean;
  userName?: string | null;

  constructor(id: string, address: string, createdAtUtc: Date, arrivesAtUtc: Date, delivered: boolean, userName?: string | null) {
    this.id = id;
      this.address = address;
      this.createdAtUtc = createdAtUtc;
      this.arrivesAtUtc = arrivesAtUtc;
      this.delivered = delivered;
      this.userName = userName;
  }
}
