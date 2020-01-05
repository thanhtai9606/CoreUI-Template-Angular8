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

export class Sale{
    SoId: number
    CustomerId: number
    ProductId: number
    WarrantyStart: Date
    WarrantyEnd: Date
    Quantity: number
    ModifiedDate: Date
    CreateBy: string

    Products?: Product[]
   
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