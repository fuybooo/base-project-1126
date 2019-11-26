/* 环境变量 */
const NODE_ENV = {
  production: 'production',
  development: 'development',
}

export function isDev(): boolean {
  return process.env.NODE_ENV === NODE_ENV.development
}

export function isProd(): boolean {
  return process.env.NODE_ENV === NODE_ENV.production
}
