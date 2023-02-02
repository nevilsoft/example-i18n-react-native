import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from 'react-native';
import { I18n } from "i18n-js"
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const i18n = new I18n()
const en = {
  hello: "Hello"
}

const th = {
  hello: "สวัสดี"
}

const HomeScreen = ({ navigation }) => {
  let [locale, setLocale] = useState("th");

  i18n.fallbacks = true;
  i18n.translations = { en, th };
  i18n.locale = locale
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
    const firstload = async () => {
      try {
        const savednickname = await AsyncStorage.getItem("lang");
        setLocale(savednickname);
      } catch (err) {
        console.log(err);
      }
    };
    firstload();
      return () => {
        isActive = false;
      };
    }, [locale])
  )

  return (
    <View>
      <Text>{i18n.t("hello")}Home Screen</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate("About")}
      />
    </View>
  );
}

const AboutScreen = ({ navigation }) => {
  let [locale, setLocale] = useState("th");

  i18n.fallbacks = true;
  i18n.translations = { en, th };
  i18n.locale = locale

  useEffect(() => {
    const firstLoad = async () => {
      try {
        const savedNickname = await AsyncStorage.getItem("lang");
        console.log(savedNickname)
        setLocale(savedNickname);
      } catch (err) {
        console.log(err);
      }
    };
    firstLoad();
  }, []);

  const chagnLanguage = async (lang) => {
    await AsyncStorage.setItem("lang", lang)
    setLocale(lang)
  }

  return (
    <View>
      <Text>{i18n.t("hello")}</Text>
      <Button title={locale != "en" ? "switch to en" : "th"} onPress={async () => chagnLanguage(locale == "th" ? "en" : "th")} />
      <Button
        title="Go to About"
        onPress={() => navigation.navigate("Home")}
      />
    </View >
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
