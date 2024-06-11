export type ResponseParams = {
    title?: string,
    sortBy: string
}

export type Product = {
    id: number,
    title: string,
    imageUrl: string,
    price: number,
    favoriteID?: number | null,
    isFavorite?: boolean,
    isAdded?: boolean,
}

export type Favorite = {
    id: number,
    productID: number,
    product: Product
}