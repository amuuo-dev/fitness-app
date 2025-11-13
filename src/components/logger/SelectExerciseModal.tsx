import { View, TextInput, Text } from "../general/Themed";
import Card from "../general/Card";
import exercises from "../../data/exercises";
import { useState } from "react";
import CustomButton from "../general/CustomButton";
import { FlatList, Modal, Pressable, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const SelectExerciseModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <CustomButton
        title="Select Exercise"
        onPress={() => setIsOpen(true)}
        style={{ marginBottom: 15 }}
      />
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.overlay}>
          <Card title="Select exercise" style={styles.modalContent}>
            <AntDesign
              name="close"
              onPress={() => setIsOpen(false)}
              size={20}
              color="gray"
              style={styles.closeButton}
            />
            <TextInput
              placeholder="Search"
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />

            <FlatList
              data={filtered}
              contentContainerStyle={{ gap: 20 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    console.log("select", item.name);
                    setIsOpen(false);
                  }}
                  style={{ gap: 3 }}
                >
                  <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                  <Text style={{ color: "gray" }}>{item.muscle}</Text>
                </Pressable>
              )}
            />
          </Card>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: "90%",
    height: "80%",
  },
  closeButton: {
    position: "absolute",
    right: 14,
    top: 14,
  },

  input: {
    padding: 10,
    marginVertical: 10,
  },
});

export default SelectExerciseModal;
