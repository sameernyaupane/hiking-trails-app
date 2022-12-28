import AboutScreen from "../screens/AboutScreen";
import HomeStack from "./HomeStack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from '@react-navigation/native';

const RootDrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  return (
    <NavigationContainer>
      <RootDrawerNavigator.Navigator initialRouteName="HomeDrawer" options={{headerShown: false}}>
        <RootDrawerNavigator.Screen name="Hiking Trails" component={HomeStack} options={{headerShown: false}}  />
        <RootDrawerNavigator.Screen name="About" component={AboutScreen} options={{headerShown: false}} />
      </RootDrawerNavigator.Navigator>
    </NavigationContainer>
  );
}

export default Drawer