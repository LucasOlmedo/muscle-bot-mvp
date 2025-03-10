import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const theme = {
  ...MD3DarkTheme,
  roundness: 2,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#0066ff',
    accent: '#ff0000',
  },
  // Custom spacing and layout configurations
  spacing: {
    card: {
      padding: 16,
      margin: 8,
      gap: 12
    },
    container: {
      padding: 20,
      marginHorizontal: 16,
      marginVertical: 12
    },
    scrollView: {
      contentPadding: 16,
      contentSpacing: 12
    }
  },
  // Component-specific styles
  components: {
    Card: {
      display: 'flex',
      borderRadius: 8,
      elevation: 2,
      marginBottom: 12
    },
    Container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    },
    ScrollView: {
      flexGrow: 1,
      showsVerticalScrollIndicator: false
    }
  }
};


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTintColor: theme.colors.onBackground,
            headerTitleStyle: {
              color: theme.colors.onBackground,
            },
            contentStyle: {
              backgroundColor: theme.colors.background,
            },
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="exercises/[id]"
            options={{
              title: 'Detalhes do Exercício',
              presentation: 'transparentModal',
              animation: 'none',
              headerShown: true,
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="dark" />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
