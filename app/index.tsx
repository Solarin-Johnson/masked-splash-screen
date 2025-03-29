import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, Pressable } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import MaskScreen from "@/components/ui/MaskScreen";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";

export default function Index() {
  const opened = useSharedValue(false);
  const text = useThemeColor({}, "text");
  const bg = useThemeColor({}, "background");
  const accent = useThemeColor({}, "accent");
  const { top, bottom } = useSafeAreaInsets();

  useEffect(() => {
    setTimeout(() => {
      opened.value = true;
    }, 500);
  }, []);

  const replay = () => {
    opened.value = false;

    setTimeout(() => {
      opened.value = true;
    }, 1500);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <MaskScreen opened={opened}>
        <ScrollView
          style={[
            styles.scrollView,
            {
              paddingTop: top,
            },
          ]}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: bottom + 120,
            },
          ]}
        >
          {[...Array(18)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.box,
                {
                  backgroundColor: text + "20",
                },
              ]}
            />
          ))}
        </ScrollView>
        <View
          style={[
            styles.buttonCover,
            {
              bottom: bottom + 10,
            },
          ]}
        >
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: accent,
              },
            ]}
            android_ripple={{
              color: "rgba(255, 255, 255, 0.1)",
            }}
            onPress={replay}
          >
            <ThemedText style={{ color: bg }}>Replay</ThemedText>
          </Pressable>
        </View>
      </MaskScreen>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    width: "46%",
    aspectRatio: 4 / 3,
    margin: 5,
    borderRadius: 6,
  },
  buttonCover: {
    borderRadius: 50,
    overflow: "hidden",
    position: "absolute",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
});
