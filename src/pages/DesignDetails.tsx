import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useDesign } from '../hooks/useDesign';
import { formatCurrency } from '../utils/currency';
import { TShirtColor, TShirtSize } from '../types';
import { useCart } from '../contexts/CartContext';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { Loader } from '../components/ui/Loader';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const COLORS: { value: TShirtColor; label: string; class: string }[] = [
  { value: 'white', label: 'White', class: 'bg-white' },
  { value: 'black', label: 'Black', class: 'bg-black' },
  { value: 'navy', label: 'Navy', class: 'bg-blue-900' },
  { value: 'red', label: 'Red', class: 'bg-red-600' },
  { value: 'green', label: 'Green', class: 'bg-green-600' },
];

const SIZES: TShirtSize[] = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

export function DesignDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { design, loading, error } = useDesign(id!);
  const { dispatch } = useCart();
  const [color, setColor] = useState<TShirtColor>('white');
  const [size, setSize] = useState<TShirtSize>('M');
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return <Loader className="h-96" />;
  }

  if (error || !design) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">
          {error?.message || 'Design not found'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Back to Designs
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: uuidv4(),
        design,
        quantity,
        color,
        size,
      },
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="w-full md:w-1/2">
          <div className="aspect-square relative">
            <img
              src={design.image_url}
              alt={design.title}
              className="absolute inset-0 w-full h-full object-cover"
              width={512}
              height={512}
            />
          </div>
        </div>

        <div className="p-4 sm:p-6 md:w-1/2 space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{design.title}</h1>
            <p className="mt-2 text-xl font-semibold text-indigo-600">
              {formatCurrency(design.price)}
            </p>
          </div>

          <p className="text-gray-600">{design.description}</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    className={`
                      w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all
                      ${c.class}
                      ${color === c.value ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}
                    `}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`
                      px-3 py-1 sm:px-4 sm:py-2 text-sm font-medium rounded-md border
                      ${size === s
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
                min={1}
                max={10}
              />
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}