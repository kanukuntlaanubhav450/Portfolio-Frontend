import { useState, useEffect } from "react";
import { api } from "../api/client";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-scroll";
import { pdf } from "@react-pdf/renderer";
import { ResumePDF } from "../components/ResumePDF";
import { saveAs } from "file-saver";

export default function Hero() {
    const [data, setData] = useState(null);
    const [generatingResume, setGeneratingResume] = useState(false);

    useEffect(() => {
        api.get("/about").then(setData).catch(console.error);
    }, []);

    const handleDownloadResume = async (e) => {
        e.preventDefault();
        setGeneratingResume(true);
        try {
            // Fetch all data needed for resume
            const [experience, skills, projects] = await Promise.all([
                api.get("/experience").catch(() => []),
                api.get("/skills").catch(() => []),
                api.get("/projects").catch(() => [])
            ]);

            const doc = <ResumePDF about={data} experience={experience} skills={skills} projects={projects} />;
            const asPdf = pdf(doc); // Create PDF instance
            const blob = await asPdf.toBlob(); // Generate blob
            saveAs(blob, `${data.name.replace(/\s+/g, '_')}_Resume.pdf`);
        } catch (error) {
            console.error("Failed to generate resume:", error);
            alert("Failed to generate resume. Please try again.");
        } finally {
            setGeneratingResume(false);
        }
    };

    if (!data) return (
        <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 pt-16">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center gap-12 relative z-10">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 text-center md:text-left"
                >
                    <div className="inline-block py-2 px-4 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-sm font-semibold tracking-wide mb-6">
                        Available for Hire
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                        Hi, I'm <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{data.name}</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-400 mb-6 font-mono">
                        {data.title}
                    </h2>
                    <p className="text-lg text-slate-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        {data.bio}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link to="projects" smooth={true} offset={-70} className="cursor-pointer group relative inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg overflow-hidden transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30">
                            <span className="relative z-10 flex items-center">View Work <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" /></span>
                        </Link>
                        <button
                            onClick={handleDownloadResume}
                            disabled={generatingResume}
                            className="inline-flex items-center justify-center px-8 py-3 border border-slate-700 text-slate-300 font-medium rounded-lg bg-transparent hover:bg-slate-800 hover:text-white transition-all"
                        >
                            {generatingResume ? "Generating..." : "Download Resume"} <Download className="ml-2" size={20} />
                        </button>
                    </div>
                </motion.div>

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1 relative flex justify-center"
                >
                    <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                        <div className="absolute inset-2 bg-slate-900 rounded-full z-10"></div>
                        <div className="relative z-20 w-full h-full rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl">
                            {data.image ? (
                                <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600">No Image</div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
