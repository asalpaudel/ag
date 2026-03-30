import { useEffect, useState } from 'react';
import { api } from '../api';

interface Stats {
    pendingTopUps: number;
    pendingWithdraws: number;
    activePlayers: number;
}

export default function KpiDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get<Stats>('/orders/admin/stats')
            .then(res => setStats(res.data))
            .catch(() => setStats({ pendingTopUps: 0, pendingWithdraws: 0, activePlayers: 0 }))
            .finally(() => setLoading(false));
    }, []);

    const cards = [
        { label: 'Pending Top-Ups', value: stats?.pendingTopUps, color: 'border-blue-500', textColor: 'text-blue-700' },
        { label: 'Pending Withdraws', value: stats?.pendingWithdraws, color: 'border-green-500', textColor: 'text-green-700' },
        { label: 'Active Players', value: stats?.activePlayers, color: 'border-purple-500', textColor: 'text-purple-700' },
    ];

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">KPI Overview</h2>
            <div className="grid grid-cols-3 gap-6">
                {cards.map(card => (
                    <div key={card.label} className={`bg-white p-6 rounded shadow-md border-t-4 ${card.color}`}>
                        <p className="text-gray-500 text-sm font-bold uppercase">{card.label}</p>
                        <p className={`text-3xl font-black mt-2 ${card.textColor}`}>
                            {loading ? '—' : (card.value ?? 0).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
