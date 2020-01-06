export class Customer {
    CustomerId: number
    CustomerName: string
    Phone: string
    Address: string
    ModifiedDate: string
}

export class Product {
    ProductId: number
    ProductName: string
    Model: string
    Inventory: number
    Warranty: number
    ModifiedDate: Date
}

export class SaleHeader{
    SoId: number
    CustomerId: number
    TotalLine: number   
    ModifiedDate: Date
    CreateBy: string

    SaleDetails?: SaleDetail[]
   
}
export class SaleDetail{
    Id: number;
    SoId: number;
    ProductId: number;
    Quantity: number;
    TotalAmount? :number;
    WarrantyStart: Date
    WarrantyEnd: Date
}
export class SaleProduct
{
    ProductName: string;
    Quantity: number;
}

export class Select2Data{
    id: string;
    text: string
}