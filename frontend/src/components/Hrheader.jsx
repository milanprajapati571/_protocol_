import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowLeft } from 'lucide-react'; // Using ArrowLeft for "Back to Atom HR"

const Hrheader = () => {
    // Assuming you have a way to get the Atom HR URL
    const atomHrUrl = 'https://atomhr.com'; // Replace with the actual Atom HR URL

    return (
        <header
            className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40
            backdrop-blur-lg bg-base-100/80"
        >
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8 flex-grow">
                        <Link to="/hrpage" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-lg font-bold">HR Portal</h1>
                        </Link>
                        <Link to="/hr/feedback" className="btn btn-sm transition-colors">
                            Feedback
                        </Link>
                    </div>
                    <a href={atomHrUrl} className="flex gap-2 items-center btn btn-sm" target="_blank" rel="noopener noreferrer">
                        <ArrowLeft className="size-5 cursor-pointer" />
                        <span className="hidden sm:inline cursor-pointer">Back to Atom HR</span>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Hrheader