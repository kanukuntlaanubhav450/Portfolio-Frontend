import { useState, useEffect } from "react";
import { api } from "../api/client";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Github, Linkedin, Twitter } from "lucide-react";

export default function About() {
    const [data, setData] = useState(null);

    useEffect(() => {
        api.get("/about").then(setData).catch(console.error);
    }, []);

    if (!data) return null;

    return (
        <section id="about" className="py-20 bg-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">About <span className="text-blue-500">Me</span></h2>
                    <div className="mt-4 w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-12 items-center">
                    {/* Contact Info Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/3"
                    >
                        <div className="bg-slate-900/50 p-8 rounded-2xl shadow-lg border border-slate-700 backdrop-blur-sm">
                            <h3 className="text-xl font-bold mb-6 text-white">Contact Details</h3>
                            <div className="space-y-4">
                                {data.location && (
                                    <div className="flex items-start group">
                                        <div className="p-2 bg-slate-800 rounded-lg mr-3 group-hover:bg-blue-600/20 transition-colors">
                                            <MapPin className="text-blue-500 group-hover:text-blue-400" size={20} />
                                        </div>
                                        <span className="text-slate-300 mt-1">{data.location}</span>
                                    </div>
                                )}
                                {data.email && (
                                    <div className="flex items-start group">
                                        <div className="p-2 bg-slate-800 rounded-lg mr-3 group-hover:bg-blue-600/20 transition-colors">
                                            <Mail className="text-blue-500 group-hover:text-blue-400" size={20} />
                                        </div>
                                        <a href={`mailto:${data.email}`} className="text-slate-300 hover:text-blue-400 mt-1 transition-colors">{data.email}</a>
                                    </div>
                                )}
                                {data.phone && (
                                    <div className="flex items-start group">
                                        <div className="p-2 bg-slate-800 rounded-lg mr-3 group-hover:bg-blue-600/20 transition-colors">
                                            <Phone className="text-blue-500 group-hover:text-blue-400" size={20} />
                                        </div>
                                        <span className="text-slate-300 mt-1">{data.phone}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-700">
                                <h4 className="font-semibold mb-4 text-slate-400">Social Profiles</h4>
                                <div className="flex gap-4">
                                    {data.github && <a href={data.github} target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all hover:-translate-y-1"><Github size={20} /></a>}
                                    {data.linkedin && <a href={data.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-blue-600 transition-all hover:-translate-y-1"><Linkedin size={20} /></a>}
                                    {data.twitter && <a href={data.twitter} target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-sky-500 transition-all hover:-translate-y-1"><Twitter size={20} /></a>}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Who am I?</h3>
                        <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-line font-light">
                            {data.bio}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
