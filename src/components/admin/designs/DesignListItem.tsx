import React, { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { Design } from '../../../types';
import { supabase } from '../../../lib/supabase';
import { formatCurrency } from '../../../utils/currency';
import toast from 'react-hot-toast';

interface DesignListItemProps {
  design: Design;
}

export function DesignListItem({ design }: DesignListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDesign, setEditedDesign] = useState(design);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('designs')
        .update({
          title: editedDesign.title,
          description: editedDesign.description,
          price: editedDesign.price
        })
        .eq('id', design.id);

      if (error) throw error;
      toast.success('Design updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update design');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this design?')) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('designs')
        .delete()
        .eq('id', design.id);

      if (error) throw error;
      toast.success('Design deleted successfully');
    } catch (error) {
      toast.error('Failed to delete design');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <img
        src={design.image_url}
        alt={design.title}
        className="h-20 w-20 object-cover rounded"
      />
      
      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={editedDesign.title}
              onChange={(e) => setEditedDesign({ ...editedDesign, title: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <textarea
              value={editedDesign.description}
              onChange={(e) => setEditedDesign({ ...editedDesign, description: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              value={editedDesign.price}
              onChange={(e) => setEditedDesign({ ...editedDesign, price: parseFloat(e.target.value) })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
              step="0.01"
            />
          </div>
        ) : (
          <>
            <h3 className="font-medium text-gray-900">{design.title}</h3>
            <p className="text-sm text-gray-500">{design.description}</p>
            <p className="font-medium text-indigo-600">{formatCurrency(design.price)}</p>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={loading}
              className="p-2 text-green-600 hover:text-green-700"
            >
              <Check className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedDesign(design);
              }}
              disabled={loading}
              className="p-2 text-red-600 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="p-2 text-gray-600 hover:text-indigo-600"
            >
              <Pencil className="h-5 w-5" />
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="p-2 text-gray-600 hover:text-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}