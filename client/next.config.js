const onLine = 'http://localhost:5000/api' || 'https://backantononio.herokuapp.com'

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
        source: '/api/info',
        destination: `${onLine}/info`
      }
    ];
  },
};
