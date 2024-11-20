import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CustomCheckBox = ({ isChecked, onChange }) => (
  <TouchableOpacity
    style={[styles.checkbox, isChecked && styles.checked]}
    onPress={onChange}
  >
    {isChecked && <View style={styles.innerCheckbox} />}
  </TouchableOpacity>
);

const NewTareaScreen = ({ navigation, route }) => {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [tieneFechaLimite, setTieneFechaLimite] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    if (route.params?.tarea) {
      const { titulo, fecha } = route.params.tarea;
      setTitulo(titulo);
      setFecha(fecha || '');
      setTieneFechaLimite(!!fecha);
    }
  }, [route.params]);

  const handleSave = () => {
    if (!titulo) {
      alert('Por favor, completa el título de la tarea.');
      return;
    }

    const tarea = {
      id: route.params?.tarea?.id || Date.now().toString(),
      titulo,
      fecha: tieneFechaLimite ? fecha : null,
    };

    if (route.params?.onSave) {
      route.params.onSave(tarea);
    }

    navigation.goBack();
  };

  const handleConfirmDate = (date) => {
    setFecha(date.toLocaleDateString());
    setDatePickerVisibility(false);
  };

  const handleCancelDate = () => {
    setDatePickerVisibility(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe el título de la tarea"
        value={titulo}
        onChangeText={setTitulo}
      />

      <View style={styles.checkboxContainer}>
        <CustomCheckBox
          isChecked={tieneFechaLimite}
          onChange={() => setTieneFechaLimite(!tieneFechaLimite)}
        />
        <Text style={styles.checkboxLabel}>¿Tiene fecha límite?</Text>
      </View>

      {tieneFechaLimite && (
        <>
          <Text style={styles.label}>Fecha límite:</Text>
          <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
            <Text style={styles.input}>{fecha || 'Selecciona la fecha'}</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Tarea</Text>
      </TouchableOpacity>

      {/* Modal de selección de fecha */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={handleCancelDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#6200ea',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#6200ea',
  },
  innerCheckbox: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewTareaScreen;
