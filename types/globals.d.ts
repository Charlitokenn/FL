export {}

declare global {
  interface CustomJwtSessionClaims {
    o: {
      id: string;
      per: string;
      rol: string;
      slg: string;
    };
    sub: string;
    sts: string;
    publicMetadata?: {
      role?: string;
    };
  }
}
