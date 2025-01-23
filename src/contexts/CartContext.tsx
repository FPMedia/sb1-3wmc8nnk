import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Design } from '../types';

export interface CartItem {
  id: string;
  design: Design;
  quantity: number;
  color: string;
  size: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cart_items';

const initialState: CartState = {
  items: []
};

function cartReducer(state: CartState, action: CartAction): CartState {
  console.log('CartReducer - Action:', action.type, action.payload);
  console.log('CartReducer - Previous State:', state);

  let newState: CartState;

  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        item =>
          item.design.id === action.payload.design.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
        newState = { ...state, items: newItems };
      } else {
        newState = { ...state, items: [...state.items, action.payload] };
      }
      break;
    }

    case 'REMOVE_FROM_CART':
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
      break;

    case 'UPDATE_QUANTITY':
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
      break;

    case 'CLEAR_CART':
      newState = { ...state, items: [] };
      break;

    default:
      newState = state;
  }

  console.log('CartReducer - New State:', newState);
  return newState;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  console.log('CartProvider - Initializing');

  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      console.log('CartProvider - Loaded from localStorage:', savedCart);
      
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log('CartProvider - Parsed cart:', parsedCart);
        return { items: parsedCart };
      }
    } catch (error) {
      console.error('CartProvider - Error loading cart:', error);
    }
    
    return initialState;
  });

  useEffect(() => {
    console.log('CartProvider - Saving to localStorage:', state.items);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    console.error('useCart - Context is undefined. Make sure to use CartProvider');
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}