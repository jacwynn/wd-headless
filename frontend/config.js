let wpUrl = 'https://wordpress-dot-jacwynn-site-263723.appspot.com/wp-json/';

// If we're running on Docker, use the WordPress container hostname instead of localhost.
if (process.env.HOME === '/home/node') {
  wpUrl = 'http://wp-headless:8080/wp-json';
}

// if (process.env.NODE_ENV === 'production') {
//   wpUrl = process.env.NODE_ENV === 'production' ? 'https://wordpress-dot-myproject.appspot.com' : 'http://localhost:8080';
// }

const Config = {
  apiUrl: wpUrl,
  AUTH_TOKEN: 'auth-token',
  USERNAME: 'username',
};

export default Config;
