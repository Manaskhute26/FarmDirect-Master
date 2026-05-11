import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit2, Trash2, Save, X } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ price: '', stock: '' });

  useEffect(() => {
    // Simulated API call - Replace with actual axios call
    // axios.get('http://localhost:5000/api/admin/products')
    const fetchProducts = async () => {
      try {
        setTimeout(() => {
          setProducts([
            { id: 1, name: 'Organic Tomatoes', farmer: 'John Doe', category: 'Vegetables', price: 2.5, stock: 150 },
            { id: 2, name: 'Fresh Apples', farmer: 'Jane Smith', category: 'Fruits', price: 3.0, stock: 200 },
            { id: 3, name: 'Basmati Rice', farmer: 'Robert Johnson', category: 'Grains', price: 15.0, stock: 50 },
            { id: 4, name: 'Potatoes', farmer: 'John Doe', category: 'Vegetables', price: 1.2, stock: 500 },
          ]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditFormData({ price: product.price, stock: product.stock });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (id) => {
    // try {
    //   await axios.put(`http://localhost:5000/api/admin/products/${id}`, editFormData);
    // } catch (error) { ... }
    
    setProducts(products.map(p => p.id === id ? { ...p, price: Number(editFormData.price), stock: Number(editFormData.stock) } : p));
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      // try {
      //   await axios.delete(`http://localhost:5000/api/admin/products/${id}`);
      // } catch (error) { ... }
      setProducts(products.filter(p => p.id !== id));
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading marketplace listings...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Live Product Management</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Product Name</th>
                <th className="px-6 py-4 font-semibold">Farmer</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price ($)</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No active listings found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4">{product.farmer}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">{product.category}</span>
                    </td>
                    
                    {/* Inline Editing for Price */}
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <input 
                          type="number" 
                          step="0.01"
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-green-500 focus:border-green-500"
                          value={editFormData.price}
                          onChange={(e) => setEditFormData({...editFormData, price: e.target.value})}
                        />
                      ) : (
                        `$${product.price.toFixed(2)}`
                      )}
                    </td>

                    {/* Inline Editing for Stock */}
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <input 
                          type="number" 
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-green-500 focus:border-green-500"
                          value={editFormData.stock}
                          onChange={(e) => setEditFormData({...editFormData, stock: e.target.value})}
                        />
                      ) : (
                        <span className={product.stock < 20 ? "text-red-600 font-medium" : ""}>
                          {product.stock} {product.stock < 20 && "(Low)"}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      {editingId === product.id ? (
                        <>
                          <button 
                            onClick={() => handleSaveEdit(product.id)}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Save"
                          >
                            <Save size={18} />
                          </button>
                          <button 
                            onClick={handleCancelEdit}
                            className="text-gray-500 hover:text-gray-700 p-1"
                            title="Cancel"
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => handleEditClick(product)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
