const onLine = process.env.REACT_APP_BASE || process.env.REACT_APP_API_URL

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: '/api/register',
        destination: `${onLine}/register`
      },{
        source: '/api/refresh_token',
        destination: `${onLine}/refresh_token`
      },{
        source: '/api/login',
        destination: `${onLine}/login`
      },{
        source: '/api/logout',
        destination: `${onLine}/logout`
      },{
        source: '/api/role',
        destination: `${onLine}/role`
      },{
        source: '/api/newPassword',
        destination: `${onLine}/newPassword`
      },{
        source: '/api/info',
        destination: `${onLine}/info`
      }
    ];
  },
};
