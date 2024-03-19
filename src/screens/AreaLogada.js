import { Button, StyleSheet, Text, View } from "react-native";

// importação dos recursos de importação

import { auth } from "../../firebase.config";

export default function AreaLogada() {
  /*  
  Para ver os dados/Objetos que vem no auth
  console.log(auth.currentUser); */

  const { email } = auth.currentUser;
  console.log(email);

  return (
    <View style={estilos.container}>
      <View style={estilos.topo}>
        <Text style={estilos.bemVindo}>Bem-vindo(a)</Text>
        <Text>Seu E-mail de cadastro é: </Text>
        <Text style={{ fontWeight: "bold" }}>{email} </Text>
        <Button title="Logout" color="#D35400" />
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
