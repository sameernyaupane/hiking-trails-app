import HomeStack from "./HomeStack"
import AboutScreen from "../screens/AboutScreen";
import EditProfile from "../screens/EditProfile";
import {AuthContext} from '../context/AuthContext'
import GroupsScreen from "../screens/GroupsScreen";
import Recommendation from "../screens/Recommendation";
import React, {useState, useContext, useEffect} from "react"
import BudgetCalculation from "../screens/BudgetCalculation";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer"

const RootDrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  const [isLoading, userInfo, splashLoading] = useContext(AuthContext)

  return (
    <NavigationContainer>
      <RootDrawerNavigator.Navigator initialRouteName="HomeDrawer" options={{headerShown: false}}>
        <RootDrawerNavigator.Screen name="Hiking Trails" component={HomeStack} options={{headerShown: userInfo.token ? true : false}}  />
        <RootDrawerNavigator.Screen name="Groups" component={GroupsScreen} options={{headerShown: true}} />
        <RootDrawerNavigator.Screen name="Budget Calculation" component={BudgetCalculation} options={{headerShown: true}} />
        <RootDrawerNavigator.Screen name="Profile" component={EditProfile} options={{headerShown: true}} />
        <RootDrawerNavigator.Screen name="Recommendation" component={Recommendation} options={{headerShown: true}} />
        <RootDrawerNavigator.Screen name="About" component={AboutScreen} options={{headerShown: true}} />
      </RootDrawerNavigator.Navigator>
    </NavigationContainer>
  );
}

export default Drawer