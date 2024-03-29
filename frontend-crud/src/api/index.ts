import axios from 'axios';
import { useUserStore } from 'src/stores/user-store';
import { UserInfo, Tokens, UserInfoOptional } from '../types/User';

const BASE_URL = process.env.SERVER_URL;
const userStore = useUserStore();
const instance = axios.create({ baseURL: BASE_URL, maxRedirects: Infinity });

instance.interceptors.request.use((config) => {
  if (!config.headers.Authorization && userStore.isLogged) {
    config.headers.Authorization = 'Bearer ' + userStore.accessToken;
  }
  return config;
});

instance.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response.status === 401 && userStore.isLogged) {
      return new Promise(async (resolve, reject) => {
        const { data, error: errorRefresh } = await refreshTokens().then();
        if (errorRefresh) {
          userStore.clearTokens();
          return reject(error);
        }
        if (data) {
          userStore.setTokens(data.accessToken, data.refreshToken);
          const request = error.config;
          request.headers = {
            ...request.headers,
            Authorization: 'Bearer ' + data.accessToken,
          };
          return resolve(axios(request));
        }
      });
    } else {
      return Promise.reject(error);
    }
  }
);

type Result<T> = {
  status: number;
  data?: T;
  error?: string;
};
const handleCall = async (callback: () => any): Promise<Result<any>> => {
  try {
    const { status, data } = await callback();
    return { status, data };
  } catch (e: any) {
    let error = e.response.data.message ?? e.message;
    if (Array.isArray(error)) {
      error = error.join('; ');
    }
    return {
      status: e.response.status,
      error,
    };
  }
};

export async function signIn(
  email: string,
  password: string
): Promise<Result<Tokens>> {
  return await handleCall(() =>
    instance.post('auth/signin/', { email, password })
  );
}

export async function signUp(
  email: string,
  password: string
): Promise<Result<Tokens>> {
  return await handleCall(() =>
    instance.post('auth/signup/', { email, password })
  );
}

export async function refreshTokens(): Promise<Result<Tokens>> {
  return await handleCall(() =>
    axios.get(BASE_URL + 'auth/refresh/', {
      headers: { Authorization: 'Bearer ' + userStore.refreshToken },
    })
  );
}

export async function getUserInfo(): Promise<
  Result<UserInfo & UserInfoOptional>
> {
  return await handleCall(() => instance.get('users/me/'));
}

export async function updateUserInfo(
  userInfo: UserInfoOptional
): Promise<Result<UserInfo & UserInfoOptional>> {
  return await handleCall(() => instance.patch('users/me/', userInfo));
}

export async function deleteAccount(): Promise<Result<'success'>> {
  return await handleCall(() => instance.delete('users/me/'));
}
