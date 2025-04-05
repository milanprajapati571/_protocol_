import React from 'react';
import { useAuthStore } from '../store/useAuthStore'; // Assuming this path is correct
import { Link } from 'react-router-dom';
import { MessageSquare, LogOut } from 'lucide-react'; // Using MessageSquare as a placeholder icon

const Employeeheader = () => {
    const { logout } = useAuthStore();

    return (
        <header
            className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40
            backdrop-blur-lg bg-base-100/80"
        >
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8 flex-grow">
                        <Link to="/employee" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-lg font-bold">Employee Portal</h1>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link to="/employee/feedback" className="btn btn-sm transition-colors">
                                Feedback
                            </Link>
                            <Link to="/employee/peers" className="btn btn-sm transition-colors">
                                Peers
                            </Link>
                        </div>
                    </div>
                    <button className="flex gap-2 items-center btn btn-sm" onClick={logout}>
                        <LogOut className="size-5 cursor-pointer" />
                        <span className="hidden sm:inline cursor-pointer">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Employeeheader;