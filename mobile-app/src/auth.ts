import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const USER_ID_KEY = 'auth_user_id';

export const setAuth = async (token: string, userId: string): Promise<void> => {
    await AsyncStorage.multiSet([
        [TOKEN_KEY, token],
        [USER_ID_KEY, userId],
    ]);
};

export const getToken = async (): Promise<string | null> => {
    return AsyncStorage.getItem(TOKEN_KEY);
};

export const getUserId = async (): Promise<string | null> => {
    return AsyncStorage.getItem(USER_ID_KEY);
};

export const clearAuth = async (): Promise<void> => {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_ID_KEY]);
};

export const isAuthenticated = async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token !== null;
};
