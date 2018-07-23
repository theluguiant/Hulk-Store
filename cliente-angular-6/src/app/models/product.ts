export class Product {
    constructor(
        public name: string,
        public description: string,
        public brand: string,
        public price: number,
        public discount: number,
        public stock: number,
        public category_id: string,
        public size: string,
        public code: string
    ) {}
}