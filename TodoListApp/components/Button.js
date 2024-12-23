import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Button({ label, theme, onPress}) {
  if (theme === "primary") {
    return (
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}>
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={onPress}
        >
          <MaterialCommunityIcons
            name="tortoise"
            size={24}
            color="#1ecc09"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  if (theme === "secondary") {
    return (
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#002eff", borderRadius: 18 }]}>
  <Pressable style={[styles.button, { backgroundColor: "#fff" }]} onPress={onPress}>
    <MaterialCommunityIcons
      name="turtle"
      size={50}
      color="#1ecc09"
      style={styles.buttonIcon}
    />
    <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
  </Pressable>
</View>
    );
  }
  return (
    <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
  );
}


const styles = StyleSheet.create({
    buttonContainer: {
      width: 320,
      height: 68,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
    },
    button: {
      backgroundColor: "#fff", // Fondo blanco
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    },
    button: {
      borderRadius: 10,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    buttonIcon: {
      paddingRight: 8,
    },
    buttonLabel: {
      color: '#fff',
      fontSize: 16,
    },
  });