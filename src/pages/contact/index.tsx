import * as React from 'react';
import {Text, View} from 'react-native';
import BPage from '@/baseUI/BPage';
import {RefreshControl} from 'react-native';
import {
  Box,
  Heading,
  HStack,
  FlatList,
  Avatar,
  VStack,
  Spacer,
  Button,
  Pressable,
} from 'native-base';
import {useStore} from '@/models';
import {observer} from 'mobx-react-lite';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '@/navigator/MainTab';
import {RootStackParamList} from '@/navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {IContactItem} from '@/services/contact';

type IProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  StackScreenProps<RootStackParamList>
>;

export const ContactScreen = observer(() => {
  const navigation = useNavigation<IProps['navigation']>();
  const back = () => navigation.goBack();
  const store = useStore();

  const fetchList = () => {
    store.contactStore.fetchContacts().then(() => {
      console.log(store.contactStore.list);
    });
  };

  const goChat = (u: IContactItem) =>
    navigation.navigate('Chat', {
      partner_id: `${u.id}`,
      avatar: u.avatar,
      nickname: u.nickname
    });

  React.useEffect(() => {
    fetchList();
  }, []);

  const refreshControl = (
    <RefreshControl
      refreshing={store.contactStore.loading}
      title="加载中"
      onRefresh={fetchList}
    />
  );

  return (
    <BPage onClickBack={back} showNavBar={false} topInsertBgColor="#f5f5f5">
      <Box style={{flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal: 16}}>
        <Heading fontSize="xl" pr="2" pt={4} pb={4}>
          联系人 ({store.contactStore.list.length})
        </Heading>
        <FlatList
          refreshControl={refreshControl}
          refreshing={store.contactStore.loading}
          data={store.contactStore.list}
          renderItem={({item}) => (
            <Box
              borderBottomWidth="1"
              borderColor="muted.100"
              backgroundColor={'#fff'}
              marginBottom={2}
              py="2">
              <Pressable onPress={() => goChat(item)}>
                <HStack
                  space={[2, 2]}
                  style={{paddingHorizontal: 10}}
                  alignItems="center"
                  justifyContent="space-between">
                  <HStack flex={1}>
                    <Avatar size="48px" source={{uri: item.avatar}} />
                    <VStack alignItems={'center'} justifyContent="center">
                      <Text style={{marginLeft: 10, fontSize: 18}}>
                        {item.nickname}
                      </Text>
                    </VStack>
                  </HStack>
                  <Button
                    onPress={() => goChat(item)}
                    colorScheme={'fuchsia'}
                    height={30}
                    variant={'subtle'}
                    size="xs">
                    私信
                  </Button>
                </HStack>
              </Pressable>
            </Box>
          )}
        />
      </Box>
    </BPage>
  );
});
