export interface IMenu {
    id?: number;
    boothName?: string;
    menuName?: string;
    description?: string;
    price?: number;
    tags?: string[];
    category?: string;
    menu_type?: string;
    spicinessLevel?: number;
    imageUrl?: string;
    stock?: number;
    isAvailable?: boolean;
    estimatedMinutes?: number;
    is_favorite?: boolean;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}