const rawUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1";
// Neutralize any trailing slashes to prevent double-slash URL corruption
const API_BASE_URL = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;

export default API_BASE_URL;
