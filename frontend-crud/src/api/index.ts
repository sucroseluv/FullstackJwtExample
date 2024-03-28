import axios from 'axios';
import { useUserStore } from 'src/stores/user-store';

const userStore = useUserStore();
const instance = axios.create({ baseURL: process.env.SERVER_URL });

instance.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response.status === 401) {
      console.log('yes 401');
    }

    console.log('statusCode', error);
    console.log(userStore.isLogged);

    return Promise.reject(error);
  }
);

type Result = {
  status: number;
  data?: any;
  error?: string;
};
const handleCall = async (callback: () => any): Promise<Result> => {
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

export async function signIn(email: string, password: string): Promise<Result> {
  return await handleCall(() =>
    instance.post('auth/signin/', { email, password })
  );
}

export async function signUp(email: string, password: string) {
  return await handleCall(() =>
    instance.post('auth/signup/', { email, password })
  );
}
