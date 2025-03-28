import { Text, type TextProps, StyleSheet, useColorScheme } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useScaleFont } from "@/hooks/useFontScale";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  invert?: boolean;
  light?: boolean;
  type?: "default" | "title" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  invert,
  light,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = light
    ? "#fff"
    : useThemeColor(
        { light: lightColor, dark: darkColor },
        invert ? "background" : "text"
      );
  const scale = useScaleFont();
  const isLight = useColorScheme() === "light";

  return (
    <Text
      style={[
        { color },
        type === "default"
          ? [styles.default(isLight), { fontSize: scale(20) }]
          : undefined,
        type === "title" ? styles.title() : undefined,
        type === "subtitle"
          ? [styles.subtitle(isLight), { fontSize: scale(14.5) }]
          : undefined,
        type === "link" ? styles.link() : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = {
  default: (light: boolean) => ({
    fontFamily: light ? "GeistSemiBold" : "GeistMedium",
    fontSize: 20,
    lineHeight: 24,
  }),
  title: () => ({
    fontFamily: "GeistSemiBold",
    fontSize: 32,
    lineHeight: 32,
  }),
  subtitle: (light: boolean) => ({
    fontFamily: light ? "GeistMedium" : "GeistRegular",
    fontSize: 14.5,
    lineHeight: 24,
  }),
  link: () => ({
    fontFamily: "GeistRegular",
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  }),
};
