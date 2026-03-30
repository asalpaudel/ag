import { useState, useEffect } from 'react';
import { api } from '../api';

interface PaymentMethod {
    id: string;
    name: string;
    paymentTag: string | null;
    isActive: boolean;
    sortOrder: number;
}

export default function Payments() {
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get<PaymentMethod[]>('/payment-methods/admin')
            .then(res => setMethods(res.data))
            .catch(() => setError('Failed to load payment methods'))
            .finally(() => setLoading(false));
    }, []);

    const toggleStatus = async (method: PaymentMethod) => {
        try {
            await api.put(`/payment-methods/admin/${method.id}`, { isActive: !method.isActive });
            setMethods(prev => prev.map(m => m.id === method.id ? { ...m, isActive: !m.isActive } : m));
        } catch {
            alert('Failed to update payment method');
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Payment Methods</h2>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium shadow text-sm">
                    + Add New Method
                </button>
            </div>

            {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm">{error}</div>}

            <div className="bg-white rounded shadow overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-400">Loading payment methods...</div>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="text-left p-4 font-semibold text-gray-600">Method Name</th>
                                <th className="text-left p-4 font-semibold text-gray-600">Receiving Tag</th>
                                <th className="text-left p-4 font-semibold text-gray-600">Status</th>
                                <th className="text-left p-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {methods.length === 0 ? (
                                <tr><td colSpan={4} className="p-8 text-center text-gray-400 italic">No payment methods found</td></tr>
                            ) : methods.map(method => (
                                <tr key={method.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4 text-gray-800 font-medium flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-black text-xs">QR</div>
                                        {method.name}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600 font-mono">{method.paymentTag || '—'}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${method.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {method.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-4 flex gap-3">
                                        <button className="text-blue-600 text-sm font-bold hover:underline">Edit</button>
                                        <button
                                            onClick={() => toggleStatus(method)}
                                            className="text-gray-500 text-sm font-bold hover:underline"
                                        >
                                            {method.isActive ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
