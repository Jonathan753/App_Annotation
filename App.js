import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; //Importação externa necessária

export default function App() {

  const [estado, setarEstado] = useState('leitura');
  const [anotacao, setarAnotacao] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
        setarAnotacao(anotacaoLeitura);
      } catch (error) { }
    })();
  }, [])

  setData = async () => {
    try {
      await AsyncStorage.setItem('anotacao', anotacao);
    } catch (error) { }
    alert('Sua anotação foi salva!');
  }

  function atualizarTexto() {
    setarEstado('leitura');//Fará voltar para primeira tela
    setData(); //Comando para salvar localmente
  }

  if (estado == 'leitura') {//TELA 1
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style='light' />
        <View style={styles.header}><Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>Aplicativo de Anotação</Text></View>
        {
          (anotacao != '') ?//Logica para quando tiver anotação registrada ou não
            <View style={{ padding: 20 }}><Text style={styles.anotacao}>{anotacao}</Text></View>
            :
            <View style={{ padding: 20 }}><Text style={{ opacity: 0.3 }}>Nenhuma anotação encontrada</Text></View>
        }
        {/* Botão mudara o estado, fazendo ir para outra tela */}
        <TouchableOpacity onPress={() => setarEstado('atualizando')} style={styles.btnAnotacao}>
          {
            (anotacao != '') ?//Lógica para estilizar o botão
              <Text style={{ fontSize: 12, color: 'white', textAlign: 'center', marginTop: 16 }}>Editar</Text>
              :
              <Text style={styles.btnAnotacaoText}>+</Text>
          }
        </TouchableOpacity>
      </View>
    );

  } else if (estado == 'atualizando') {//TELA 2
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style='light' />
        <View style={styles.header}><Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>Aplicativo de Anotação</Text></View>
        {/* A função onChangeText é pradonizada */}
        <TextInput autoFocus={true} onChangeText={(text) => setarAnotacao(text)} style={{ padding: 20, height: 300, textAlignVertical: 'top' }} multiline={true} numberOfLines={5} value={anotacao}></TextInput>
        <TouchableOpacity onPress={() => atualizarTexto()} style={styles.btnSalvar}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 10,
    backgroundColor: '#069',
    paddingTop: 40
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
  btnAnotacaoText: {
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
  },
});