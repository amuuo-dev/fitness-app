import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import Colors from "../constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

DarkTheme.colors.primary = Colors.dark.tint;
DefaultTheme.colors.primary = Colors.light.tint;

const RootLayout = () => {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen
              name="workout/current"
              options={{ title: "Workout" }}
            />
            <Stack.Screen name="workout/[id]" options={{ title: "Workout" }} />
          </Stack>
        </SafeAreaView>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
