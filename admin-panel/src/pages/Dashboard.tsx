import { useNavigate, Outlet, Link } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-900 text-white flex flex-col shadow-xl">
                <div className="p-6 text-2xl font-bold tracking-wider border-b border-blue-800">
                    ADMIN
                </div>
                <nav className="flex-1 p-4 flex flex-col gap-2">
                    <Link to="/" className="px-4 py-2 hover:bg-blue-800 rounded transition font-medium">KPI Overview</Link>
                    <Link to="/topups" className="px-4 py-2 hover:bg-blue-800 rounded transition font-medium text-yellow-300">Top-Up Queue</Link>
                    <Link to="/withdraws" className="px-4 py-2 hover:bg-blue-800 rounded transition font-medium text-green-300">Withdraw Queue</Link>
                    <Link to="/games" className="px-4 py-2 hover:bg-blue-800 rounded transition font-medium">Games</Link>
                    <Link to="/payments" className="px-4 py-2 hover:bg-blue-800 rounded transition font-medium">Payments</Link>
                </nav>
                <div className="p-4 border-t border-blue-800">
                    <button onClick={logout} className="w-full bg-red-500 hover:bg-red-400 py-2 rounded text-sm font-bold transition shadow">Logout</button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow relative z-10 px-8 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-700">Command Center</h2>
                    <div className="text-sm text-gray-500">Live Server Connection Active</div>
                </header>
                <main className="flex-1 overflow-y-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
