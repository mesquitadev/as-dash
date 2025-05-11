import { createReactOidc } from 'oidc-spa/react';
import { z } from 'zod';
export const { OidcProvider, useOidc, getOidc, withLoginEnforced } = createReactOidc(async () => ({
  issuerUri: 'https://auth.ludolabs.rocks/realms/sunset-tecnologia',
  clientId: 'ClubSunset',
  /**
   * Vite:  `homeUrl: import.meta.env.BASE_URL`
   * CRA:   `homeUrl: process.env.PUBLIC_URL`
   * Other: `homeUrl: "/"` (Usually, can be something like "/dashboard")
   */
  homeUrl: '/inicio',
  scopes: ['openid', 'profile', 'email', 'roles'],
  extraQueryParams: () => ({
    ui_locales: 'pt-BR', // Keycloak login/register page language
    //audience: "https://my-app.my-company.com/api"
  }),
  decodedIdTokenSchema: z.object({
    email: z.string(),
    name: z.string(),
    preferred_username: z.string(),
    roles: z.array(z.string()).optional(),
    groups: z.array(z.string()).optional(),
    empresas: z.array(z.string()).optional(),
  }),
}));
