const env = import.meta.env.VITE_ENV;
const viteUrl = import.meta.env.VITE_URL || "";

const imageUrlPrefix = env === "dev" ? `${viteUrl}/public` : "public";

export const getImageUrl = (path) => {};