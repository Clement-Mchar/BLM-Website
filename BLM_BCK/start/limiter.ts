/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import limiter from '@adonisjs/limiter/services/main'

export const throttle = limiter.define('global', (ctx) => {
  return limiter
          .allowRequests(10)
          .every('1 minute')
          .usingKey(`ip_${ctx.request.ip()}`)
          .limitExceeded((error) => {
            error
              .setStatus(400)
              .setMessage('Cannot process request. Try again later')
          })
})