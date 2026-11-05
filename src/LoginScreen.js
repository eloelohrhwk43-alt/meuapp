import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';

// Importa a função de autenticação tratada para o Firestore
import { autenticarUsuarioFirestore as buscarUsuario } from '../firebaseDb';

export default function LoginScreen({ navigation }) {
  // 1. Estados para capturar os dados digitados
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // 2. Função de Login com consulta ao Firestore
  async function handleLogin() {
    // Validação de campos vazios
    if (email.trim() === '' || senha.trim() === '') {
      Alert.alert('Aviso', 'Por favor, informe o e-mail e a senha.');
      return;
    }

    try {
      // Consulta o Firestore na coleção 'usuarios'
      const usuarioEncontrado = await buscarUsuario(email, senha);

      if (usuarioEncontrado) {
        Alert.alert('Sucesso', `Bem-vindo(a), ${usuarioEncontrado.nome}!`);
        
        // Limpa o formulário e navega para a Home enviando o objeto do usuário (com o id do Firestore)
        setEmail('');
        setSenha('');
        navigation.navigate('Home', { usuario: usuarioEncontrado });
      } else {
        Alert.alert('Erro de Autenticação', 'E-mail ou senha incorretos.');
      }
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert('Erro', 'Ocorreu um erro ao consultar o banco de dados remoto.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Faça o Login</Text>
      <Text style={styles.subtitulo}>Informe suas credenciais para acessar</Text>

      <View style={styles.card}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="exemplo@email.com"
          placeholderTextColor="#94A3B8"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      {/* Botão Principal de Login */}
      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      {/* Botão Secundário para criar conta */}
      <TouchableOpacity 
        style={styles.botaoCriarConta} 
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.textoCriarConta}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    height: 48,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 12,
  },
  botao: {
    height: 48,
    backgroundColor: '#0284C7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoCriarConta: {
    alignItems: 'center',
    padding: 8,
  },
  textoCriarConta: {
    color: '#0284C7',
    fontSize: 14,
    fontWeight: '600',
  },
});