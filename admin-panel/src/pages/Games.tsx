import { useState, useEffect } from 'react';
import { api } from '../api';

interface Game {
    id: string;
    name: string;
    downloadLink: string | null;
    isActive: boolean;
    sortOrder: number;
}

export default function Games() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get<Game[]>('/games/admin')
            .then(res => setGames(res.data))
            .catch(() => setError('Failed to load games'))
            .finally(() => setLoading(false));
    }, []);

    const toggleStatus = async (game: Game) => {
        try {
            await api.put(`/games/admin/${game.id}`, { isActive: !game.isActive });
            setGames(prev => prev.map(g => g.id === game.id ? { ...g, isActive: !g.isActive } : g));
        } catch {
            alert('Failed to update game status');
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Games Management</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium shadow text-sm">
                    + Add New Game
                </button>
            </div>

            {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm">{error}</div>}

            <div className="bg-white rounded shadow text-left overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-400">Loading games...</div>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-4 font-semibold text-gray-600">Game Name</th>
                                <th className="p-4 font-semibold text-gray-600">Download Link</th>
                                <th className="p-4 font-semibold text-gray-600">Status</th>
                                <th className="p-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {games.length === 0 ? (
                                <tr><td colSpan={4} className="p-8 text-center text-gray-400 italic">No games found</td></tr>
                            ) : games.map(game => (
                                <tr key={game.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4 text-gray-800 font-medium">{game.name}</td>
                                    <td className="p-4 text-sm text-blue-500 underline">{game.downloadLink || '—'}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${game.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {game.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-4 flex gap-3">
                                        <button className="text-blue-600 text-sm font-bold hover:underline">Edit</button>
                                        <button
                                            onClick={() => toggleStatus(game)}
                                            className="text-gray-500 text-sm font-bold hover:underline"
                                        >
                                            {game.isActive ? 'Deactivate' : 'Activate'}
                                        </button>
                                        <button className="text-purple-600 text-sm font-bold hover:underline">Credentials</button>
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
