import { CategoryResponse } from "../models/categoryResponse";

export class ProductRequest {
    name = "";
    description = "";
    brandCompany = "";
    brandCountry = "";
    price = 0;
    width = 0;
    height = 0;
    length = 0;
    categories: CategoryResponse[] = [];
  }