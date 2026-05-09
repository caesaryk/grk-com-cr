import { useState } from 'react';

interface Property {
  id: string;
  name: string;
  address: string;
  type: 'commercial' | 'vacation_rental';
  bedrooms: number;
  bathrooms: number;
  geofence_radius: number;
  pricing_rate: number;
  active: boolean;
}

export default function PropertiesManagement() {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 'p1',
      name: 'Sea View 101',
      address: '123 Ocean Drive, St. Petersburg, FL',
      type: 'vacation_rental',
      bedrooms: 2,
      bathrooms: 2,
      geofence_radius: 100,
      pricing_rate: 185,
      active: true,
    },
    {
      id: 'p2',
      name: 'Downtown Office Plaza',
      address: '456 Main St, Tampa, FL',
      type: 'commercial',
      bedrooms: 0,
      bathrooms: 4,
      geofence_radius: 150,
      pricing_rate: 320,
      active: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const [formData, setFormData] = useState<Omit<Property, 'id'>>({
    name: '',
    address: '',
    type: 'vacation_rental',
    bedrooms: 1,
    bathrooms: 1,
    geofence_radius: 100,
    pricing_rate: 150,
    active: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProperty) {
      setProperties(properties.map(p => 
        p.id === editingProperty.id ? { ...formData, id: editingProperty.id } : p
      ));
    } else {
      const newProperty: Property = {
        ...formData,
        id: 'p' + Date.now(),
      };
      setProperties([...properties, newProperty]);
    }

    resetForm();
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({ ...property });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this property?')) {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      type: 'vacation_rental',
      bedrooms: 1,
      bathrooms: 1,
      geofence_radius: 100,
      pricing_rate: 150,
      active: true,
    });
    setEditingProperty(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">🏢 Properties</h1>
          <p className="text-gray-400 mt-2">Manage all commercial and vacation rental properties</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-sky-600 hover:bg-sky-700 px-6 py-3 rounded-xl flex items-center gap-2"
        >
          + Add Property
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="glass p-8 rounded-3xl mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-6">
            {editingProperty ? 'Edit Property' : 'Add New Property'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Property Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as 'commercial' | 'vacation_rental' })}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3"
              >
                <option value="vacation_rental">Vacation Rental</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Pricing Rate ($/hr)</label>
              <input
                type="number"
                value={formData.pricing_rate}
                onChange={e => setFormData({ ...formData, pricing_rate: parseInt(e.target.value) })}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3"
                required
              />
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={resetForm} className="flex-1 border border-gray-700 hover:bg-gray-800 py-3 rounded-xl">
                Cancel
              </button>
              <button type="submit" className="flex-1 bg-sky-600 hover:bg-sky-700 py-3 rounded-xl">
                {editingProperty ? 'Update Property' : 'Add Property'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Properties List */}
      <div className="glass rounded-3xl border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700 bg-gray-900/50">
              <th className="text-left p-4">Property</th>
              <th className="text-left p-4">Type</th>
              <th className="text-center p-4">Bed/Bath</th>
              <th className="text-center p-4">Rate</th>
              <th className="text-center p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property.id} className="border-b border-gray-800 hover:bg-gray-900/30">
                <td className="p-4">
                  <div className="font-medium">{property.name}</div>
                  <div className="text-xs text-gray-400">{property.address}</div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${property.type === 'vacation_rental' ? 'bg-purple-900 text-purple-300' : 'bg-blue-900 text-blue-300'}`}>
                    {property.type === 'vacation_rental' ? '🏠 Vacation' : '🏢 Commercial'}
                  </span>
                </td>
                <td className="p-4 text-center text-sm">
                  {property.bedrooms} bed / {property.bathrooms} bath
                </td>
                <td className="p-4 text-center font-mono">${property.pricing_rate}/hr</td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs ${property.active ? 'bg-emerald-900 text-emerald-300' : 'bg-gray-700 text-gray-400'}`}>
                    {property.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(property)} className="text-sky-400 hover:text-sky-300 mr-3">Edit</button>
                  <button onClick={() => handleDelete(property.id)} className="text-red-400 hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
