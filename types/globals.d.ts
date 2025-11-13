export { }

declare global {
  interface CustomJwtSessionClaims {
    azp: string;
    exp: number;
    firstName: string;
    fva: number[];
    iat: number;
    iss: string;
    jti: string;
    nbf: number;
    o: {
      id: string;
      rol: string;
      slg: string;
    };
    orgLogo: string;
    orgName: string;
    sid: string;
    sts: string;
    sub: string;
    v: number;
    publicMetadata?: {
      role?: string;
    };
  }
}
