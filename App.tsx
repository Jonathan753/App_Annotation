import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

export default function App() {

  const [estado, setarEstado] = useState('leitura');
  const [anotacao, setarAnotacao] = useState('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');

  if (estado == 'leitura') {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}><Text style={{ textAlign: 'center', color: "white",fontSize:18 }}>Aplicativo Anotação</Text></View>
        <StatusBar style='light' />
        <View style={{ padding: 20 }}><Text style={styles.anotacao}>{anotacao}</Text></View>
        <TouchableOpacity onPress={() => setarEstado('atualizando')} style={styles.btnAnotacao}><Text style={styles.btnAnotacaoTexto}>+</Text></TouchableOpacity>
      </View>
    );
  } else if (estado == 'atualizando') {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style='light' />
        <View style={styles.header}><Text style={{ textAlign: 'center', color: "white", fontSize:18}}>Aplicativo Anotação</Text></View>

      <TextInput onChangeText={(text)=>setarAnotacao(text)} style={{padding:20, height:300, textAlignVertical:'top'}} multiline={true} numberOfLines={3} value={anotacao}></TextInput>

        <TouchableOpacity onPress={() => setarEstado('leitura')} style={styles.btnSalvar}><Text style={{ textAlign: 'center', color: 'white' }}>Salvar</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#069'
  },

  anotacao: {
    fontSize: 13
  },

  btnAnotacao: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    backgroundColor: '#069',
    borderRadius: 25
  },

  btnAnotacaoTexto: {
    color: 'white',
    position: 'relative',
    textAlign: 'center',
    top: 3,
    fontSize: 30
  },

  btnSalvar: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#069',
  }
});
