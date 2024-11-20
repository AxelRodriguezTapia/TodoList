import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Tarea from '../Tarea'; // Asegúrate de que la ruta sea correcta

const HomeScreen = ({ navigation }) => {

   // Lista de tareas hardcoded
   const [tareas, setTareas] = useState([
    { id: '1', titulo: 'Comprar leche', fecha: '20/11/2024' },
    { id: '2', titulo: 'Estudiar React Native', fecha: '21/11/2024' },
    { id: '3', titulo: 'Comprar leche', fecha: '20/11/2024' },
    { id: '4', titulo: 'Estudiar React Native', fecha: '21/11/2024' },
    { id: '5', titulo: 'Comprar leche', fecha: '20/11/2024' },
    { id: '6', titulo: 'Estudiar React Native', fecha: '21/11/2024' },
    { id: '7', titulo: 'Comprar leche', fecha: '20/11/2024' },
    { id: '8', titulo: 'Estudiar React Native', fecha: '21/11/2024' },
    { id: '9', titulo: 'Comprar leche', fecha: '20/11/2024' },
    { id: '10', titulo: 'Estudiar React Native', fecha: '21/11/2024' },
    { id: '11', titulo: 'Comprar leche', fecha: '20/11/2024' },
    { id: '12', titulo: 'Estudiar React Native', fecha: '21/11/2024' },
    { id: '13', titulo: 'Comprar leche', fecha: '20/11/2024' },
    { id: '14', titulo: 'Estudiar React Native', fecha: '21/11/2024' },
    { id: '15', titulo: 'Comprar leche', fecha: '20/11/2024' },
    { id: '16', titulo: 'Estudiar React Native', fecha: '21/11/2024' },
    { id: '17', titulo: 'Comprar leche', fecha: '20/11/2024' },
    { id: '18', titulo: 'Estudiar React Native', fecha: '21/11/2024' },
    { id: '19', titulo: 'Comprar leche', fecha: '20/11/2024' },
    { id: '20', titulo: 'Estudiar React Native', fecha: '21/11/2024' },
  ]);

  const handleEditTarea = (updatedTarea) => {
    setTareas(
      tareas.map((tarea) => (tarea.id === updatedTarea.id ? updatedTarea : tarea))
    );
  };

  const handleEdit = (id) => {
    const tarea = tareas.find((t) => t.id === id);
    navigation.navigate('NewTarea', {
      tarea,
      onSave: handleEditTarea,
    });
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Eliminar tarea",
      "¿Estás seguro de que quieres eliminar esta tarea?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: () => {
            setTareas(tareas.filter((tarea) => tarea.id !== id));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleAddTask = (newTarea) => {
    // Navegar o realizar alguna acción para agregar una nueva tarea
    setTareas([...tareas, { id: Date.now().toString(), ...newTarea }]);
    // Puedes usar navigation.navigate('NuevaTarea') si tienes configurada la navegación
  };

  return (
    <View style={styles.container}>
      {/* Contenido de la Home Screen */}
      <Text style={styles.title}>Lista de Tareas</Text>
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Tarea
            titulo={item.titulo}
            fecha={item.fecha}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
      {/* Botón flotante */}
      <TouchableOpacity style={styles.floatingButton}  onPress={() => navigation.navigate('NewTarea', { onSave: handleAddTask })}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200ea',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
