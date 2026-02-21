import Constants, { ExecutionEnvironment } from 'expo-constants';
import { supabase } from './supabase';

export const authService = {
    async signUp(email: string, password: string, username: string, avatar: string = 'fox') {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                    avatar,
                },
            },
        });
        return { data, error };
    },

    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    },

    async signOut() {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    async getSession() {
        return await supabase.auth.getSession();
    },

    onAuthStateChange(callback: (event: any, session: any) => void) {
        return supabase.auth.onAuthStateChange(callback);
    },

    async signInWithGoogle() {
        try {
            const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

            if (isExpoGo) {
                return { data: null, error: new Error('Google Sign-In is not available in Expo Go. Please use a Development Build for this feature.') };
            }

            const { GoogleSignin } = require('@react-native-google-signin/google-signin');

            // Configure Google Sign-In — MANDATORY for Android
            GoogleSignin.configure({
                webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
                offlineAccess: true,
                forceCodeForRefreshToken: true,
            });

            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            if (userInfo.data?.idToken) {
                const { data, error } = await supabase.auth.signInWithIdToken({
                    provider: 'google',
                    token: userInfo.data.idToken,
                });
                return { data, error };
            } else {
                throw new Error('No ID token present! Please ensure your project is correctly configured in Google Cloud Console.');
            }
        } catch (error: any) {
            console.error('Google Sign-In Error:', error);
            if (error.message?.includes('RNGoogleSignin')) {
                return { data: null, error: new Error('Google Sign-In native module not found. Please use a Development Build or Rebuild the APK.') };
            }
            // Provide more semantic errors for common failures
            if (error.code === 'DEVELOPER_ERROR') {
                return { data: null, error: new Error('Developer Error: This likely means your SHA-1 fingerprint is not registered in Google Cloud Console for this Android package.') };
            }
            return { data: null, error };
        }
    },
};
