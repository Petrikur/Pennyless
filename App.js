import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";

import Button from "./components/Button";
import tw from "twrnc";

export default function App() {
  const test = (event) => {
    console.log(event)
  };

  return (
    <View className="flex-1 items-center justify-center border-zinc-900">
      <Image source={require("./assets/logo.png")} />
      <View style={tw`flex p-2`}>
        <TextInput
          style={tw`border my-2 p-2 rounded w-60`}
          placeholder="Email"
        />
        <TextInput
          style={tw`border p-2 rounded w-60`}
          placeholder="Password"
          type="password"
          secureTextEntry={true}
        />
      </View>
      <StatusBar />
      <View className="flex-col my-4 space-y-3">
        <Button type="Login"></Button>
      </View>
      <View>
        <Pressable onPress={test} className="my-11">
          <Text className="text-blue-300">Signup</Text>
        </Pressable>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
