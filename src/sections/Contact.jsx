import { useState } from "react";
import { api } from "../api/client";
import { Send, CheckCircle } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            await api.post("/contact", formData);
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="py-20 bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Get In <span className="text-blue-500">Touch</span></h2>
                    <div className="mt-4 w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-xl text-slate-400">Have a project in mind or want to say hi?</p>
                </div>

                <div className="max-w-xl mx-auto bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
                    {status === "success" ? (
                        <div className="text-center py-12">
                            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                            <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                            <p className="text-slate-400 mt-2">Thanks for reaching out. I'll get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="mt-1 block w-full rounded-lg border-slate-600 bg-slate-900 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 placeholder-slate-500 transition-colors"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="mt-1 block w-full rounded-lg border-slate-600 bg-slate-900 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 placeholder-slate-500 transition-colors"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                    className="mt-1 block w-full rounded-lg border-slate-600 bg-slate-900 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 placeholder-slate-500 transition-colors"
                                    placeholder="Your message..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:scale-[1.02]"
                            >
                                {status === "submitting" ? "Sending..." : <><Send size={18} className="mr-2" /> Send Message</>}
                            </button>
                            {status === "error" && <p className="text-red-500 text-center mt-2">Something went wrong. Please try again.</p>}
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
