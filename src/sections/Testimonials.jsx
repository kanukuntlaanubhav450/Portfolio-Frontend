import { useState, useEffect } from "react";
import { api } from "../api/client";
import { motion } from "framer-motion";
import { Quote, User } from "lucide-react";

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        api.get("/testimonials").then(setTestimonials).catch(console.error);
    }, []);

    return (
        <section id="testimonials" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Client <span className="text-blue-500">Testimonials</span></h2>
                        <div className="mt-4 w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
                        <p className="mt-4 text-xl text-slate-400">What people say about working with me</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.id || index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-800 p-8 rounded-2xl border border-slate-700 relative hover:border-blue-500/30 transition-colors"
                        >
                            <Quote className="absolute top-6 right-6 text-slate-700 opacity-50" size={40} />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-700 border-2 border-slate-600">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                                            <User size={24} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white">{item.name}</h4>
                                    <p className="text-sm text-blue-400">{item.role}</p>
                                </div>
                            </div>

                            <p className="text-slate-300 italic relative z-10 leading-relaxed">"{item.quote}"</p>
                        </motion.div>
                    ))}
                </div>

                {testimonials.length === 0 && (
                    <div className="text-center text-slate-500 py-10">
                        <p>No testimonials yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
