import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  Vibration,
  View,
} from "react-native";

import { auth } from "../../firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

  const cadastrar = async () => {
    if (!email || !senha || !nome) {
      Alert.alert("Atenção", "Preencha email ou senha ou nome!");
      Vibration.vibrate(300);
      return;
    }

    try {
      /* Para cadastrar o usuário na nossa Api do firebase  */
      const contaUsuario = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

      // console.log(contaUsuario.user);

      if (contaUsuario.user) {
        await updateProfile(auth.currentUser, { displayName: nome });
        console.log(contaUsuario.user.displayName);
      }

      Alert.alert("Cadastro", "Cadastro Feito com sucesso!!😁", [
        {
          text: "Ficar aqui mesmo!",
          style: "cancel",
          onPress: () => {
            return;
          },
        },
        {
          text: "Ir para a area logada",
          style: "default",
          onPress: () => navigation.replace("AreaLogada"),
        },
      ]);
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

        case "auth/email-already-in-use":
          menssagem = "Email já cadastrado";
          break;

        case "auth/weak-password":
          menssagem = "Senha fraca (mínimo de 6 characteres)! ";
          break;

        default:
          menssagem = "Houve um erro, tente novamente mais tarde";
          break;
      }

      Alert.alert("Ops!", menssagem);
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput
          onChangeText={(valor) => setNome(valor)}
          placeholder="Nome"
          style={estilos.input}
          keyboardType="default"
        />
        <TextInput
          onChangeText={(valor) => setEmail(valor)}
          placeholder="E-mail"
          style={estilos.input}
          keyboardType="email-address"
        />
        <TextInput
          onChangeText={(valor) => setSenha(valor)}
          placeholder="Senha"
          style={estilos.input}
          secureTextEntry
        />
        <View style={estilos.botoes}>
          <Button onPress={cadastrar} title="Cadastre-se" color="blue" />
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginVertical: 16,
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
