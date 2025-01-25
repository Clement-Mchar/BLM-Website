import ky from 'ky';

export const api = ky.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
          if (token) {
            request.headers.set('X-XSRF-TOKEN', decodeURIComponent(token));
          } else {
            console.warn('CSRF token manquant dans les cookies.');
          }
        },
      ],
    },
  });