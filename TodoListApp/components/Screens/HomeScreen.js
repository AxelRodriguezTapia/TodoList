import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { db } from '../../utils/firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { collection, query, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'; // Importar funciones de Firestore
import Tarea from '../Tarea'; // Asegúrate de que la ruta sea correcta

const HomeScreen = ({ navigation }) => {
  const [tareas, setTareas] = useState([]);

  // Obtener tareas desde Firestore
  useEffect(() => {
    const q = query(collection(db, 'tareas'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tareasData = [];
      querySnapshot.forEach((documentSnapshot) => {
        tareasData.push({
          ...documentSnapshot.data(),
          id: documentSnapshot.id,
        });
      });
      setTareas(tareasData);
    });

    // Limpiar la suscripción cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  // Guardar nueva tarea en Firestore
  const handleAddTask = async (newTarea) => {
    try {
      await addDoc(collection(db, 'tareas'), newTarea);
      console.log('Tarea agregada a Firestore');
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  };

  // Editar tarea en Firestore
  const handleEditTarea = async (updatedTarea) => {
    try {
      const tareaRef = doc(db, 'tareas', updatedTarea.id);
      await updateDoc(tareaRef, updatedTarea);
      console.log('Tarea actualizada');
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  // Eliminar tarea de Firestore
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
          onPress: async () => {
            try {
              const tareaRef = doc(db, 'tareas', id);
              await deleteDoc(tareaRef);
              console.log('Tarea eliminada de Firestore');
            } catch (error) {
              console.error('Error al eliminar tarea:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Función para ir a la pantalla de edición
  const handleEdit = (id) => {
    const tarea = tareas.find((t) => t.id === id);
    navigation.navigate('NewTarea', {
      tarea,
      onSave: handleEditTarea,
    });
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
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('NewTarea', { onSave: handleAddTask })}
      >
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
