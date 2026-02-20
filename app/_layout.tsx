import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GameProvider } from "@/context/GameContext";
import Colors from "@/constants/colors";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: "fade",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="username" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="matchmaking" options={{ headerShown: false, presentation: "fullScreenModal" }} />
      <Stack.Screen name="duel" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="post-match" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="daily-challenge" options={{ headerShown: false, presentation: "modal" }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }

    // Configure Google Sign-In with safety check for Expo Go
    const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

    if (!isExpoGo) {
      try {
        const { GoogleSignin } = require("@react-native-google-signin/google-signin");
        GoogleSignin.configure({
          webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
          iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
          offlineAccess: true,
        });
      } catch (e) {
        console.warn("Google Sign-In native module failed to load:", e);
      }
    } else {
      console.log("Running in Expo Go: Skipping Google Sign-In initialization.");
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: Colors.background }}>
        <GameProvider>
          <StatusBar style="light" />
          <RootLayoutNav />
        </GameProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
