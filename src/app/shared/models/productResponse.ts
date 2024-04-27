import { CategoryResponse } from "./categoryResponse";

export class ProductResponse{
    id = "";
    name = "";
    description = "";
    brandCompany = "";
    brandCountry = "";
    price = 0;
    width = 0;
    height = 0;
    length = 0;
    categories: CategoryResponse[] = [];
    quantity = 0;
}