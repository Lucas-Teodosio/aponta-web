export interface LoginDto { email: string; password: string; }
export interface SignupDto { name: string; email: string; password: string; role?: 'DEV' | 'COMPANY'; }
export interface TokenPair { accessToken: string; refreshToken: string; }
