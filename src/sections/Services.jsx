import { useState, useEffect } from "react";
import { api } from "../api/client";
import { motion } from "framer-motion";
import { Code, Server, Database, Smartphone, Globe, Layout } from "lucide-react";

export default function Services() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        api.get("/services").then(setServices).catch(console.error);
    }, []);

    // Helper to allow generic icons if image fails or isn't provided (fallback logic)
    // For now we trust the icon URL from backend, or show default.

    return (
        <section id="services" className="py-20 bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">My <span className="text-blue-500">Services</span></h2>
                        <div className="mt-4 w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
                        <p className="mt-4 text-xl text-slate-400">What I can do for you</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group"
                        >
                            <div className="w-14 h-14 bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {service.icon ? (
                                    <img src={service.icon} alt={service.title} className="w-8 h-8 object-contain" />
                                ) : (
                                    <Code className="text-blue-400" size={32} />
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{service.description}</p>
                        </motion.div>
                    ))}
                </div>

                {services.length === 0 && (
                    <div className="text-center text-slate-500 py-10">
                        <p>No services found yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
