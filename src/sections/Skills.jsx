import { useState, useEffect } from "react";
import { api } from "../api/client";
import { motion } from "framer-motion";

export default function Skills() {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        api.get("/skills").then(setSkills).catch(console.error);
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="skills" className="py-20 bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Skills & <span className="text-blue-500">Technologies</span></h2>
                    <div className="mt-4 w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-xl text-slate-400">My technical toolbox</p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8"
                >
                    {skills.map((skill) => (
                        <motion.div
                            key={skill.id}
                            variants={item}
                            className="bg-slate-800 rounded-xl border border-slate-700 p-6 flex flex-col items-center justify-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group"
                        >
                            <div className="h-16 w-16 mb-4 flex items-center justify-center bg-slate-900 rounded-full p-3 group-hover:bg-blue-600/10 transition-colors">
                                {skill.icon ? (
                                    <img src={skill.icon} alt={skill.name} className="h-full w-full object-contain" />
                                ) : (
                                    <span className="text-2xl font-bold text-blue-500">{skill.name[0]}</span>
                                )}
                            </div>
                            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{skill.name}</h3>
                            <span className="text-xs text-blue-400 mt-2 font-medium bg-slate-900 px-3 py-1 rounded-full border border-slate-700">{skill.level}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
