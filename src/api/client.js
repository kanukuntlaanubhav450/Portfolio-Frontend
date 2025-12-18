const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const api = {
    get: async (endpoint) => {
        try {
            const res = await fetch(`${API_BASE_URL}${endpoint}`);
            if (!res.ok) throw new Error("API Error");
            return res.json();
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            return []; // Return empty array/object on error to prevent crash
        }
    },
    post: async (endpoint, data) => {
        try {
            const res = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("API Error");
            return res.json();
        } catch (error) {
            console.error(`Error posting to ${endpoint}:`, error);
            throw error;
        }
    }
};
