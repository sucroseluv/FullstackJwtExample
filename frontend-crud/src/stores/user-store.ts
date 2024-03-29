import { defineStore } from 'pinia';
import { UserInfoOptional, Tokens } from '../types/User';

type UserStore = {
  isLogged: boolean;
  userInfo?: UserInfoOptional;
} & Partial<Tokens>;
type UserActions = {
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  setUserInfo: (userInfo: UserInfoOptional) => void;
};
export const useUserStore = defineStore<'user', UserStore, any, UserActions>(
  'user',
  {
    state: () => ({
      isLogged: !(
        !localStorage.refreshToken || localStorage.refreshToken === 'undefined'
      ),
      accessToken: localStorage.accessToken,
      refreshToken: localStorage.refreshToken,
      userInfo: {
        name: '',
        phone: '',
        address: '',
        info: '',
      },
    }),
    actions: {
      setTokens(accessToken, refreshToken): void {
        this.isLogged = true;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        localStorage.accessToken = accessToken;
        localStorage.refreshToken = refreshToken;
      },
      clearTokens() {
        this.isLogged = false;
        this.accessToken = undefined;
        this.refreshToken = undefined;
        this.userInfo = {
          name: '',
          phone: '',
          address: '',
          info: '',
        };
        localStorage.accessToken = undefined;
        localStorage.refreshToken = undefined;
      },
      setUserInfo(userInfo) {
        Object.entries(userInfo).forEach(([key, value]) => {
          this.userInfo[key] = value;
        });
      },
    },
  }
);
