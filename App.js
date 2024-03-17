import { useCallback, useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import CheckBox from "react-native-check-box";
import Slider from "@react-native-community/slider";
import * as Clipboard from "expo-clipboard";
export default function App() {
  const [password, setPassword] = useState(null);
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const copyClipBoard = async () => {
    await Clipboard.setStringAsync(password);
    console.log(await Clipboard.getStringAsync());
  };
  const passwordGeneraTor = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789";
    }
    if (character) {
      str += "!@#$%^&*()?";
    }
    let pass = "";
    for (let i = 1; i <= length; i++) {
      const random = Math.random();
      const randomNumberInRange = Math.floor(random * str.length);
      pass += str.charAt(randomNumberInRange);
    }
    setPassword(pass);
  }, [length, number, character]);
  useEffect(() => {
    passwordGeneraTor();
  }, [length, number, character]);
  return (
    <ImageBackground
      style={{ height: "100%", width: "100%" }}
      source={require("./assets/img.jpg")}
    >
      <View style={styles.container}>
        <View style={styles.wrap}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 22,
              marginTop: 10,
              flex: 0.15,
            }}
          >
            PassWord Generator
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              readOnly={true}
              placeholder="Password"
              value={password}
              style={styles.pass}
            ></TextInput>
            <TouchableOpacity style={styles.btn} onPress={copyClipBoard}>
              <Text>Copy</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 15,
            }}
          >
            <CheckBox
              isChecked={number}
              onClick={() => setNumber((prev) => !prev)}
              leftText="Number"
              style={styles.box}
            ></CheckBox>
            <CheckBox
              isChecked={character}
              onClick={() => setCharacter((prev) => !prev)}
              leftText="Character"
              style={styles.box}
            ></CheckBox>
          </View>
          <Slider
            style={{
              width: 200,
              height: 40,
              backgroundColor: "red",
              marginTop: 20,
              marginLeft: 50,
              marginRight: 50,
            }}
            value={length}
            minimumValue={5}
            maximumValue={30}
            onValueChange={(value) => setLength(value)}
          ></Slider>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrap: {
    borderWidth: 2,
    borderColor: "black",
    color: "white",
    backgroundColor: "black",
    width: "80%",
    height: "60%",
    borderRadius: 40,
    justifyContent: "space-around",
  },
  pass: {
    borderWidth: 2,
    width: "80%",
    borderRadius: 40,
    padding: 10,
    borderColor: "white",
    backgroundColor: "white",
    color: "black",
  },
  btn: {
    backgroundColor: "blue",
    borderWidth: 2,
    borderColor: "blue",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
    marginTop: 4,
  },
  box: {
    backgroundColor: "white",
    width: 100,
  },
  button: {
    backgroundColor: "red",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
