import React, { ReactNode, useEffect } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Dimensions,
  Pressable,
} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface MaskScreenProps {
  children: ReactNode;
  style?: ViewStyle;
}

const MaskScreen: React.FC<MaskScreenProps> = ({ children, style }) => {
  const opened = useSharedValue(false);
  const accent = useThemeColor({}, "accent");

  const toogle = () => {
    "worklet";
    opened.value = !opened.value;
  };

  const opacity = useDerivedValue(() => {
    return withDelay(100, withSpring(opened.value ? 0 : 1, SPRING_CONFIG));
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Pressable onPress={toogle} style={[styles.container, style]}>
      <MaskedView
        style={styles.maskedView}
        maskElement={<MaskElement opened={opened} />}
      >
        <>
          {children}
          <Animated.View
            style={[{ backgroundColor: accent }, styles.overlay, animatedStyle]}
          />
        </>
      </MaskedView>
    </Pressable>
  );
};

const FINAL_SCALE = 30;
const INITIAL_SCALE = 1;

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 90,
};

const MaskElement = ({ opened }: { opened: SharedValue<boolean> }) => {
  const scale = useDerivedValue(() => {
    return opened.value ? FINAL_SCALE : INITIAL_SCALE;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: 200,
      height: 200,
      transform: [{ scale: withSpring(scale.value, SPRING_CONFIG) }],
    };
  });

  return (
    <View style={styles.maskWrapper}>
      <AnimatedImage
        style={[styles.mask, animatedStyle]}
        source={require("../../assets/images/adaptive-icon.png")}
        contentFit="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maskedView: {
    flex: 1,
    height: "100%",
  },
  maskWrapper: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  mask: {
    width: 200,
    height: 200,
    // borderRadius: 100,
    // backgroundColor: "#000000",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default MaskScreen;
