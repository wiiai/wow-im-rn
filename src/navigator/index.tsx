import React from 'react';
import {observer} from 'mobx-react-lite';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';

import {DetailScreen} from '@/pages/detail';
import MainTabScreen, {MainTabParamList} from './MainTab';
import H5Screen from '@/pages/h5';
import LoginScreen from '@/pages/login';
import { SessionScreen } from '@/pages/session';

export type RootStackParamList = {
  MainTab: NavigatorScreenParams<MainTabParamList>;
  Chat: {
    partner_id: string;
    avatar?: string;
    nickname?: string;
  };
  Session: undefined;
  H5: {
    url: string;
    title?: string;
  };
  Login: undefined;
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const RootStack = createStackNavigator<RootStackParamList>();

function RootStackScreen() {
  const hideHeaderOptions = {
    title: '',
    headerBackTitle: '',
    headerShown: false,
  };

  return (
    <RootStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <RootStack.Group>
        <RootStack.Screen
          name="MainTab"
          options={{headerShown: false}}
          component={MainTabScreen}
        />
        <RootStack.Screen
          name="Chat"
          options={hideHeaderOptions}
          component={DetailScreen}
        />
        <RootStack.Screen
          name="Session"
          options={hideHeaderOptions}
          component={SessionScreen}
        />
        <RootStack.Screen
          name="H5"
          options={hideHeaderOptions}
          component={H5Screen}
        />
      </RootStack.Group>
      <RootStack.Group screenOptions={{presentation: 'modal'}}>
        <RootStack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

function Navigator() {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
}

export default observer(Navigator);
