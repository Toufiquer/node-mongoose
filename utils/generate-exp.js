/*
|-----------------------------------------
| setting up GenerateExp for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-----------------------------------------
*/

module.exports.generateIatExp = (
  second = 0,
  minute = 1,
  hour = 0,
  day = 30,
  month = 0
) => {
  // Get current time in seconds
  const currentTime = Math.floor(Date.now() / 1)

  const exp_minute = minute * 60
  const exp_hour = hour * 60 * 60
  const exp_day = day * 24 * 60 * 60
  const exp_month = month * 24 * 60 * 60 * 30

  const expirationSeconds = second + exp_minute + exp_hour + exp_day + exp_month

  const iat = currentTime
  const exp = currentTime + expirationSeconds
  return { iat, exp }
}
