import React from "react";
import { View, Text, useThemeColor } from "./Themed";
import { ViewStyle, StyleProp, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

type CardProps = {
  title: string;
  children?: React.ReactNode;
  href?: string;
  style?: StyleProp<ViewStyle>;
};

const Card = ({ title, children, href, style }: CardProps) => {
  const tint = useThemeColor({}, "tint");

  const cardContent = (
    <View style={[styles.card, { borderLeftColor: tint }, style]}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        <Pressable>{cardContent}</Pressable>
      </Link>
    );
  }

  return cardContent;
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderLeftWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default Card;
