const onLine = process.env.REACT_APP_BASE || process.env.REACT_APP_API_URL;

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
  async rewrites() {
    return [
      /* Image */
      {
        source: "/api/upload",
        destination: `${onLine}/upload`,
      },
      {
        source: "/api/destroy",
        destination: `${onLine}/destroy`,
      },
      {
        source: "/api/register",
        destination: `${onLine}/register`,
      },
      {
        source: "/api/refresh_token",
        destination: `${onLine}/refresh_token`,
      },
      {
        source: "/api/login",
        destination: `${onLine}/login`,
      },
      {
        source: "/api/logout",
        destination: `${onLine}/logout`,
      },
      {
        source: "/api/role",
        destination: `${onLine}/role`,
      },
      {
        source: "/api/newPassword",
        destination: `${onLine}/newPassword`,
      },
      {
        source: "/api/info",
        destination: `${onLine}/info`,
      },
      /* Admin */
      {
        source: "/api/registerNewUser",
        destination: `${onLine}/registerNewUser`,
      },
      {
        source: "/api/getAllUser",
        destination: `${onLine}/getAllUser`,
      },
      {
        source: "/api/deleteUserAccount/:id",
        destination: `${onLine}/deleteUserAccount/:id`,
      },
      {
        source: "/api/updateAccount/:id",
        destination: `${onLine}/updateAccount/:id`,
      },
    ];
  },
};
