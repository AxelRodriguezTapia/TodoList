import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomCheckBox = ({ isChecked, onChange }) => {
  return (
    <TouchableOpacity
      style={[styles.checkbox, isChecked && styles.checked]}
      onPress={onChange}
    >
      {isChecked && <View style={styles.innerCheckbox} />}
    </TouchableOpacity>
  );
};

const Tarea = ({ titulo, fecha, onEdit, onDelete, isChecked, onToggleMarcado }) => {
  return (
    <View style={styles.container}>
      {/* Aquí pasamos el estado isChecked y la función onToggleMarcado */}
      <CustomCheckBox isChecked={isChecked} onChange={onToggleMarcado} />

      <View style={styles.textContainer}>
        <Text style={[styles.title, isChecked && styles.completedTitle]}>{titulo}</Text>
        <Text style={styles.date}>{fecha}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#6200ea',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#6200ea',
  },
  innerCheckbox: {
    width: 0,
    height: 0,
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#4caf50',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default Tarea;
