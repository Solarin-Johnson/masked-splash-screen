import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import MaskedView from "@react-native-masked-view/masked-view";
import MaskScreen from "@/components/ui/MaskScreen";

export default function Index() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <MaskScreen>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.text}>We go again!</ThemedText>
        </ThemedView>
      </MaskScreen>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
