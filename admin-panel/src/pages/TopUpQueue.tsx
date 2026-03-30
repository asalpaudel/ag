import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { api, SOCKET_URL } from '../api';

interface TopUpOrder {
    id: string;
    orderNumber: string;
    amount: number;
    status: string;
    createdAt: string;
    user: { username: string; fullName: string };
    game: { name: string };
    paymentMethod: { name: string; paymentTag: string | null };
}

const STATUS_OPTIONS = ['Processing', 'Verified', 'Completed', 'Rejected', 'Cancelled'];

export default function TopUpQueue() {
    const [orders, setOrders] = useState<TopUpOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        api.get<TopUpOrder[]>('/orders/admin/topups')
            .then(res => setOrders(res.data))
            .catch(() => console.error('Failed to load top-up orders'))
            .finally(() => setLoading(false));

        const socket = io(SOCKET_URL);

        socket.on('newTopUp', (order: TopUpOrder) => {
            setOrders(prev => [order, ...prev]);
        });

        socket.on('orderStatusUpdated', ({ orderId, status }: { orderId: string; status: string }) => {
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
        });

        return () => { socket.disconnect(); };
    }, []);

    const updateStatus = async (id: string, status: string) => {
        setUpdatingId(id);
        try {
            await api.put(`/orders/topup/admin/${id}/status`, { status });
            setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
        } catch {
            alert('Failed to update status');
        } finally {
            setUpdatingId(null);
        }
    };

    const statusColor: Record<string, string> = {
        Processing: 'bg-yellow-100 text-yellow-800',
        Verified: 'bg-blue-100 text-blue-800',
        Completed: 'bg-green-100 text-green-800',
        Rejected: 'bg-red-100 text-red-800',
        Cancelled: 'bg-gray-100 text-gray-600',
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Live Top-Up Queue</h2>
            <div className="bg-white rounded shadow overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-400">Loading orders...</div>
                ) : orders.length === 0 ? (
                    <p className="p-8 text-gray-500 italic text-center">No pending requests...</p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-4 text-left font-semibold text-gray-600">Order</th>
                                <th className="p-4 text-left font-semibold text-gray-600">Player</th>
                                <th className="p-4 text-left font-semibold text-gray-600">Game</th>
                                <th className="p-4 text-left font-semibold text-gray-600">Method</th>
                                <th className="p-4 text-left font-semibold text-gray-600">Amount</th>
                                <th className="p-4 text-left font-semibold text-gray-600">Status</th>
                                <th className="p-4 text-left font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4">
                                        <p className="font-semibold text-sm">{order.orderNumber}</p>
                                        <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-medium text-sm">{order.user?.fullName}</p>
                                        <p className="text-xs text-gray-400">@{order.user?.username}</p>
                                    </td>
                                    <td className="p-4 text-sm text-gray-700">{order.game?.name}</td>
                                    <td className="p-4 text-sm text-gray-700">
                                        <p>{order.paymentMethod?.name}</p>
                                        <p className="text-xs text-gray-400">{order.paymentMethod?.paymentTag}</p>
                                    </td>
                                    <td className="p-4 font-bold text-gray-800">${order.amount}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${statusColor[order.status] || 'bg-gray-100 text-gray-600'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <select
                                            disabled={updatingId === order.id}
                                            value={order.status}
                                            onChange={e => updateStatus(order.id, e.target.value)}
                                            className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                                        >
                                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
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
