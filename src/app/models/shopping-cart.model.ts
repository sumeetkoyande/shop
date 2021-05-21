import { ShoppingCartItem } from './shopping-cart-item.model';
export interface ShoppingCart{
    items: ShoppingCartItem[];
    createdAt: number;
}

