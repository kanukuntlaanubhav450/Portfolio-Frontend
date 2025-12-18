import { useState, useEffect } from "react";
import { api } from "../api/client";
import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get("/projects").then(setProjects).catch(console.error);
    }, []);

    return (
        <section id="projects" className="py-20 bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Featured <span className="text-blue-500">Projects</span></h2>
                        <div className="mt-4 w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
                        <p className="mt-4 text-xl text-slate-400">Explore some of my recent work</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col"
                        >
                            <div className="h-56 overflow-hidden bg-slate-700 relative">
                                {project.image ? (
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                                        <Code size={40} opacity={0.5} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium">
                                            Visit Site <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                <p className="text-slate-400 mb-4 line-clamp-3 text-sm leading-relaxed flex-1">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-700/50">
                                    {project.tags && project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-medium bg-slate-900 text-blue-300 px-3 py-1 rounded-full border border-slate-700">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
