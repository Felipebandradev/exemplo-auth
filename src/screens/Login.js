import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  Vibration,
  View,
} from "react-native";

// importando os recursos de dutenticação
import { auth } from "../../firebase.config";

// importando a função de login com e-mail e senha
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login = async () => {
    if (!email || !senha) {
      Alert.alert("atenção", "Preencha o email e senha");
      Vibration.vibrate(300);
      // Não esquecer do return para parar a execução
      return;
    }

    try {
      // Utilizamos essa função para verificar e validar o email e a senha que estão no firebase
      await signInWithEmailAndPassword(auth, email, senha);
      // Utilizamos o replace para telas onde não temos volta exemplo telas iniciais
      navigation.replace("AreaLogada");
    } catch (error) {
      console.error(error.code);
      let menssagem;

      switch (error.code) {
        case "auth/invalid-credential":
          menssagem = "Dados Invalidos";
          break;
        case "auth/invalid-email":
          menssagem = "Endereço de email invalido";
          break;

        default:
          menssagem = "Houve um erro, tente novamente mais tarde";
          break;
      }

      Alert.alert("Ops!", menssagem);
    }
  };

  // Atalho: anfn -> cria arrow function sem a constante
  const recuperarSenha = async () => {
    try {
      // Quando clicar no botão irá mandar um email para mudar a senha, essa função precisa do auth e email precisa ser importado
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Recuperar Senha", "Verifique sua sua caixa de e-mails");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput
          onChangeText={(valor) => setEmail(valor)}
          placeholder="E-mail"
          style={estilos.input}
        />
        <TextInput
          onChangeText={(valor) => setSenha(valor)}
          placeholder="Senha"
          style={estilos.input}
          secureTextEntry
        />
        <View style={estilos.botoes}>
          <Button onPress={login} title="Entre" color="green" />
          <Button
            onPress={recuperarSenha}
            title="Recuperar Senha"
            color="gray"
          />
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginBottom: 32,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
  botoes: {
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
