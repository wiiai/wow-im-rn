import React, {useEffect, useState} from 'react';
import {Text, TextStyle, ViewStyle} from 'react-native';
import BPage from '@/baseUI/BPage';
import {RefreshControl} from 'react-native';
import {
  Box,
  Heading,
  HStack,
  FlatList,
  Avatar,
  VStack,
  Pressable,
  View,
  Button,
} from 'native-base';
import {observer} from 'mobx-react-lite';
import dayjs from 'dayjs';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '@/navigator/MainTab';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useStore} from '@/models';
import {RootStackParamList} from '@/navigator';
import {ISessionItem} from '@/services/session';

type INavigateProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  StackScreenProps<RootStackParamList>
>;

export const SessionScreen = observer(() => {
  const navigation = useNavigation<INavigateProps['navigation']>();
  const store = useStore();
  const {sessionStore} = store;

  const fetchList = async () => {
    await sessionStore.fetchList();
  };

  useEffect(() => {
    fetchList();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [navigation]);

  const refreshControl = (
    <RefreshControl
      refreshing={sessionStore.loading}
      title="加载中"
      onRefresh={fetchList}
    />
  );

  const goChat = (u: ISessionItem) =>
    navigation.navigate('Chat', {
      partner_id: `${u.partner_id}`,
      avatar: u.avatar,
      nickname: u.nickname,
    });

  const renderBadge = (item: ISessionItem) => {
    const textStl: TextStyle = {
      color: '#fff',
      fontSize: 10,
    };
    const viewStl: ViewStyle = {
      position: 'absolute',
      right: -8,
      top: -8,
      minWidth: 10,
      backgroundColor: 'red',
      paddingVertical: 2,
      paddingHorizontal: 4,
      borderRadius: 8,
    };
    return (
      <Box style={{position: 'relative'}}>
        <Avatar size="48px" source={{uri: item.avatar}} borderRadius={4} />
        {sessionStore.unReadInfo[item.partner_id] ? (
          <View style={viewStl}>
            <Text style={textStl}>
              {item.unread}
            </Text>
          </View>
        ) : null}
      </Box>
    );
  };

  return (
    <BPage showNavBar={false} topInsertBgColor="#fff">
      <Box style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 16}}>
        <Heading fontSize="xl" pr="2" pt={4} pb={4}>
          会话 ({sessionStore.list.length})
        </Heading>

        <FlatList
          refreshControl={refreshControl}
          refreshing={sessionStore.loading}
          data={sessionStore.sessions}
          renderItem={({item}) => (
            <Pressable onPress={() => goChat(item)}>
              <Box borderColor="muted.100" backgroundColor={'#fff'} py="2">
                <HStack
                  space={[2, 2]}
                  style={{paddingHorizontal: 10}}
                  justifyContent="space-between">
                  <HStack flex={1}>
                    {renderBadge(item)}
                    <VStack justifyContent="center">
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 14,
                          fontWeight: '500',
                        }}>
                        {item.nickname}
                      </Text>
                      <Text
                        style={{
                          marginLeft: 10,
                          marginTop: 4,
                          fontSize: 14,
                          color: '#4b5563',
                        }}>
                        {item.last_message.content}
                      </Text>
                    </VStack>
                  </HStack>
                  <Text style={{marginTop: 4, fontSize: 12, color: '#1f2937'}}>
                    {dayjs(item.last_message.create_time).format('h:mm:ss A')}
                  </Text>
                </HStack>
              </Box>
            </Pressable>
          )}
        />
      </Box>
    </BPage>
  );
});
