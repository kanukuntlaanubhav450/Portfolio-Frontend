import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", to: "about" },
        { name: "Skills", to: "skills" },
        { name: "Projects", to: "projects" },
        { name: "Experience", to: "experience" },
        // { name: "Blog", to: "blog" },
        { name: "Contact", to: "contact" },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 py-4 shadow-2xl" : "bg-transparent py-6"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="hero" smooth={true} duration={500} className="text-2xl font-bold cursor-pointer font-mono tracking-tighter group">
                        <span className="text-white group-hover:text-blue-400 transition-colors">PORT</span>
                        <span className="text-blue-500">FOLIO</span>
                        <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">.</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                className="relative text-slate-300 hover:text-white cursor-pointer font-medium transition-colors text-sm uppercase tracking-wide group"
                                offset={-70}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Social Icons (Desktop) */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="#" className="text-slate-400 hover:text-white transition-colors transform hover:scale-110"><Github size={20} /></a>
                        <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors transform hover:scale-110"><Linkedin size={20} /></a>
                        <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors transform hover:scale-110"><Twitter size={20} /></a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none hover:text-blue-400 transition-colors">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    smooth={true}
                                    duration={500}
                                    className="block px-3 py-3 text-lg font-medium text-slate-300 hover:text-white hover:bg-slate-800 w-full text-center rounded-lg cursor-pointer"
                                    onClick={() => setIsOpen(false)}
                                    offset={-70}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
