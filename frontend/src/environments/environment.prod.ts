export const environment = {
  production: true,
  BOOKING_HOST:  (window as any)['env']['BOOKING_HOST'] || 'localhost',
  BOOKING_PORT:  (window as any)['env']['BOOKING_PORT'] || 3050,
  BACKEND_HOST:  (window as any)['env']['BACKEND_HOST'] || 'localhost',
  BACKEND_PORT:  (window as any)['env']['BACKEND_PORT'] || 3000
};
