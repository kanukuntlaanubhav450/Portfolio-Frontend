import { Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white py-8 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                <p className="flex items-center text-slate-400 text-sm">
                    Built with <Heart size={16} className="text-red-500 mx-1 fill-current animate-pulse" /> using React, Tailwind & Custom CMS
                </p>
                <p className="mt-2 text-slate-600 text-xs text-center">
                    &copy; {new Date().getFullYear()} SANNU. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
