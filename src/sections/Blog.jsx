import { useState, useEffect } from "react";
import { api } from "../api/client";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        api.get("/blogs").then(setBlogs).catch(console.error);
    }, []);

    return (
        <section id="blogs" className="py-20 bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Latest <span className="text-blue-500">Articles</span></h2>
                        <div className="mt-4 w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
                        <p className="mt-4 text-xl text-slate-400">Thoughts, tutorials, and insights</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col"
                        >
                            <div className="h-48 overflow-hidden bg-slate-700 relative">
                                <img
                                    src={blog.image || "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800"}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                                        {blog.category || "Tech"}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>{new Date(blog.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User size={14} />
                                        <span>{blog.author || "Admin"}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{blog.title}</h3>
                                <p className="text-slate-400 mb-4 line-clamp-3 text-sm leading-relaxed flex-1">{blog.summary || blog.content?.substring(0, 100) + "..."}</p>

                                <a href="#" className="flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors mt-auto group/link">
                                    Read More <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {blogs.length === 0 && (
                    <div className="text-center text-slate-500 py-10">
                        <p>No blog posts found yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
