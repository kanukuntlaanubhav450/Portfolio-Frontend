import { useState, useEffect } from "react";
import { api } from "../api/client";
import { motion } from "framer-motion";

export default function Experience() {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        api.get("/experience").then(setExperiences).catch(console.error);
    }, []);

    return (
        <section id="experience" className="py-20 bg-slate-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Professional <span className="text-blue-500">Experience</span></h2>
                    <div className="mt-4 w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="relative border-l-4 border-slate-700 ml-3 md:ml-6 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute top-1.5 -left-[10px] md:-left-[14px] w-6 h-6 rounded-full bg-slate-800 border-4 border-blue-500 shadow-lg shadow-blue-500/50"></div>

                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors shadow-sm">
                                <span className="text-sm font-semibold tracking-wide text-blue-400 uppercase">
                                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                                </span>
                                <h3 className="text-xl font-bold text-white mt-1">{exp.position}</h3>
                                <h4 className="text-lg text-slate-400 font-medium mb-4">{exp.company}</h4>
                                <p className="text-slate-300 leading-relaxed whitespace-pre-line font-light">
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
