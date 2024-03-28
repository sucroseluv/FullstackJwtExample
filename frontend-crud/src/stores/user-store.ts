import { defineStore } from 'pinia';

type UserStore = {
  isLogged: boolean;
  accessToken?: string;
  refreshToken?: string;
};
type UserActions = {
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
};
export const useUserStore = defineStore<'user', UserStore, any, UserActions>(
  'user',
  {
    state: () => ({
      isLogged: false,
    }),
    actions: {
      setTokens(accessToken: string, refreshToken: string): void {
        this.isLogged = true;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
      },
      clearTokens() {
        this.isLogged = false;
        this.accessToken = undefined;
        this.refreshToken = undefined;
      },
    },
  }
);
