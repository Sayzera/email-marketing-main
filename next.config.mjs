
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ucarecdn.com'
            },
            {
                protocol: 'https',
                hostname: 'wordpress-1290109-4680406.cloudwaysapps.com'
            }
        ]
    }
};

export default nextConfig;
