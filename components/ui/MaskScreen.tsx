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
  withSequence,
  withSpring,
  WithSpringConfig,
  withTiming,
} from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const FINAL_SCALE = Dimensions.get("screen").width / 10;
const IMAGE_SIZE = 150;

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 100,
};

interface MaskScreenProps {
  children: ReactNode;
  style?: ViewStyle;
}

const getBounce = (
  opened: SharedValue<boolean>,
  defaultValue: number = 1,
  finalValue: number = 1,
  expandValue: number = 0.8,
  suckValue: number = 0.6,
  springConfig: WithSpringConfig = SPRING_CONFIG
) => {
  return useDerivedValue(() => {
    return opened.value
      ? withSequence(
          withTiming(expandValue, { duration: 200 }), // Expand
          withTiming(suckValue, { duration: 150 }), // Suck in
          withSpring(finalValue, springConfig) // Pop out
        )
      : defaultValue;
  });
};

const MaskScreen: React.FC<MaskScreenProps> = ({ children, style }) => {
  const opened = useSharedValue(false);
  const accent = useThemeColor({}, "accent");

  const toogle = () => {
    "worklet";
    opened.value = !opened.value;
  };

  const opacity = useDerivedValue(() => {
    return withDelay(
      opened.value ? 500 : 0,
      withSpring(opened.value ? 0 : 1, SPRING_CONFIG)
    );
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

const MaskElement = ({ opened }: { opened: SharedValue<boolean> }) => {
  const scale = getBounce(opened, 1, FINAL_SCALE, 0.8, 0.5);

  const animatedStyle = useAnimatedStyle(() => {
    return {
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
    width: IMAGE_SIZE,
    aspectRatio: 1,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default MaskScreen;
