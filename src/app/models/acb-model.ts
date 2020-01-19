export class Customer {
    CustomerId: number
    CustomerName: string
    Phone: string
    Address: string
}

export class Product {
    ProductId: number
    ProductName: string
    OrderPrice: number
    SalePrice: number
    Model: string
    Inventory: number
    Warranty: number
}

export class SaleHeader{
    SoId: number
    CustomerId: number
    SubTotal: number;
    Tax: number;
    Discount: number;
    TotalLine: number 
    CreateBy: string
    SaleDetails?: SaleDetail[]
   
}
export class SaleDetail{
    Id: number;
    SoId: number;
    ProductId: number;
    Quantity: number;
    Price: number;
    TotalAmount? :number;
    WarrantyStart: Date
    WarrantyEnd: Date
}
export class SaleProduct
{
    ProductId: number;
    ProductName: string;
    Quantity: number;
    Price: number;
    TotalAmount: number;
}

export class Select2Data{
    id: number;
    text: string
}