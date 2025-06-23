import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PlayScreen() {
  return (
    <View style={styles.container}>
      <Text>Play Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
