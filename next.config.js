/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['newton-project-resume-backend.s3.amazonaws.com', 'cloudflare-ipfs.com', 'newton-project-resume-backend.s3.ap-south-1.amazonaws.com'],
    },
    reactStrictMode: true,
    experimental: {
        serverComponents: true,
    }
}

module.exports = nextConfig
