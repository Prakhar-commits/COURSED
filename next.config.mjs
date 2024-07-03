/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com; object-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: ; font-src 'self'; connect-src 'self' https://api.example.com; frame-src 'self' https://accounts.google.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
