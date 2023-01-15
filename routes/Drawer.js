import AboutScreen from "../screens/AboutScreen";
import HomeStack from "./HomeStack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from '@react-navigation/native';
import GroupsScreen from "../screens/GroupsScreen";
import BudgetCalculation from "../screens/BudgetCalculation";
import Recommendation from "../screens/Recommendation";

const RootDrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  return (
    <NavigationContainer>
      <RootDrawerNavigator.Navigator initialRouteName="HomeDrawer" options={{headerShown: false}}>
        <RootDrawerNavigator.Screen name="Hiking Trails" component={HomeStack} options={{headerShown: true}}  />
        <RootDrawerNavigator.Screen name="Groups" component={GroupsScreen} options={{headerShown: true}} />
        <RootDrawerNavigator.Screen name="Budget Calculation" component={BudgetCalculation} options={{headerShown: true}} />
        <RootDrawerNavigator.Screen name="Recommendation" component={Recommendation} options={{headerShown: true}} />
        <RootDrawerNavigator.Screen name="About" component={AboutScreen} options={{headerShown: true}} />
      </RootDrawerNavigator.Navigator>
    </NavigationContainer>
  );
}

export default Drawer