import { useState, useCallback, useEffect } from "react";    
import { Stack } from "expo-router";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { applyPersistedRTLAtStartup } from "../lib/hooks/useLanguage";

SplashScreen.preventAutoHideAsync().catch(() => {
  /* no-op if already hidden */
});

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  useEffect(() => {
    applyPersistedRTLAtStartup().finally(() => {
      setIsReady(true);
    });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="live" options={{ presentation: "fullScreenModal" }} />
            <Stack.Screen name="property/[id]" options={{ presentation: "modal" }} />
            <Stack.Screen name="seller/[id]" options={{ presentation: "modal" }} />
            <Stack.Screen name="chat" options={{ presentation: "modal" }} />
            <Stack.Screen name="publish" options={{ presentation: "modal" }} />
            <Stack.Screen name="coming-soon" options={{ presentation: "modal" }} />
            <Stack.Screen name="admin" />
            <Stack.Screen
              name="+not-found"
              options={{ headerShown: true, title: "Not Found" }}
            />
          </Stack>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}