import { Button, StyleSheet, Text, View } from "react-native";

// importação dos recursos de importação

import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";

export default function AreaLogada({ navigation }) {
  /*   Para ver os dados/Objetos recuperados que vem no auth
  console.log(auth.currentUser); */

  /*  recuperando e-mail para uso  */
  const { email } = auth.currentUser;
  console.log(email);

  // Função logout para sair da conta
  const logout = async () => {
    try {
      /* Utilizamos a função signOut para remover os dados do auth 
      no momento e enviamos para a tela inicial */
      await signOut(auth);
      navigation.replace("Inicial");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.topo}>
        <Text style={estilos.bemVindo}>Bem-vindo(a)</Text>
        <Text>Seu E-mail de cadastro é: </Text>
        <Text style={{ fontWeight: "bold" }}>{email} </Text>
        <Button onPress={logout} title="Logout" color="#D35400" />
      </View>
      <View style={estilos.geral}>
        <Text>Você está na área logada.</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF3CF",
    padding: 16,
  },
  topo: {
    marginVertical: 32,
  },
  bemVindo: {
    fontSize: 24,
    marginVertical: 16,
  },
});
