import React, {useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import BPage from '@/baseUI/BPage';
import {observer} from 'mobx-react-lite';
import {useStore} from '@/models';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IMessage} from '@/services/session';
import {
  Avatar,
  FlatList,
  HStack,
  VStack,
  Text,
  Input,
  Button,
} from 'native-base';
import {IUserInfo} from '@/types/UserInfo';
import {queryProfile} from '@/services/contact';
import dayjs from 'dayjs';

type IProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export const DetailScreen = observer(() => {
  const store = useStore();
  const {socketStore, sessionStore, userStore} = store;
  const navigation = useNavigation();
  const route = useRoute<IProps['route']>();
  const [content, setContent] = useState('');
  const [userList, setUserList] = useState<IUserInfo[]>([]);
  const partner_id = +route.params.partner_id;
  const routeAvatar = route.params.avatar!;
  const routeNickname = route.params.nickname!;
  const partner = (userList || []).find(it => it.id === partner_id);
  const [loading, setLoading] = useState(false);
  const back = () => {
    sessionStore.updateUnReadInfo(partner_id, 0)
    navigation.goBack();
  }

  const list: IMessage[] = JSON.parse(
    JSON.stringify(socketStore.messageMap[partner_id] || []),
  );

  const fetchList = async () => {
    setLoading(true);
    await socketStore.queryHistoryList({
      rid: partner_id,
      seq: list.length ? list[0].time || 0 : 0,
      is_group: false,
    });
    setLoading(false);
  };

  const initData = async () => {
    const res: any = await queryProfile({ list: [partner_id]});
    setUserList(res.data);
    if (!list.length) {
      await fetchList();
    }
  };

  useEffect(() => {
    initData();
  }, [partner_id]);

  const refreshControl = (
    <RefreshControl refreshing={loading} progressViewOffset={0} title="下拉加载" onRefresh={fetchList} />
  );

  const sendHandler = () => {
    const pInfo = (userList || []).find(it => it.id === partner_id);
    socketStore.sendMessage({
      content: content,
      rid: partner_id,
      is_group: false,
      to_nickname: pInfo?.nickname,
      to_avatar: pInfo?.avatar,
    });
  };

  const renderItem = (item: IMessage) => {
    const isMeSend = item.suid === userStore.userInfo?.id;
    const uInfo = isMeSend
      ? userStore.userInfo
      : (userList || []).find(it => it.id === item.suid);

    return (
      <HStack
        flexDirection={isMeSend ? 'row-reverse' : 'row'}
        space={2}
        style={{paddingHorizontal: 12, paddingTop: 10}}>
        <Avatar
          size="46px"
          source={{
            uri: uInfo?.avatar,
          }}
        >
          </Avatar>
        <VStack>
          {isMeSend ? null : (
            <Text style={{fontSize: 10, color: '#4b5563'}}>
              {uInfo?.nickname}
            </Text>
          )}
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: '#15803d',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 4,
              width: 'auto',
              marginTop: isMeSend ? 2 : 0,
            }}>
            <Text style={{color: '#fff', fontSize: 14}}>{item.content}</Text>
          </View>
          <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
            <Text style={{color: '#666', fontSize: 8}}>
              {dayjs(item.create_time).format('h:mm:ss A')}
              {/* {dayjs(item.create_time).format('MM/DD HH:mm:ss')} */}
            </Text>
          </View>
        </VStack>
      </HStack>
    );
  };

  return (
    <BPage
      onClickBack={back}
      title={routeNickname}
      style={{paddingBottom: 30, backgroundColor: '#fff'}}>
      <VStack style={{flex: 1}}>
        <View style={{flex: 1}}>
          <FlatList
            // onScroll={(e) => {
            //   console.log(e)
            // }}
            style={{backgroundColor: '#f1f1f1'}}
            refreshControl={refreshControl}
            // refreshing={socketStore.isLoading}
            data={list}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 12,
            paddingTop: 10,
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#eee',
          }}>
          <View style={{flex: 1, backgroundColor: '#fff', marginRight: 10}}>
            <Input
              borderRadius={2}
              value={content}
              size="sm"
              onChangeText={val => setContent(val)}
              style={{height: 36, borderRadius: 2}}
              variant="filled"
              placeholder="输入"
              borderColor="#fff"
              color={'black'}
            />
          </View>
          <Button
            borderRadius={2}
            bgColor={'primary.900'}
            onPress={sendHandler}
            size="sm"
            paddingY={10}
            style={{borderRadius: 2, padding: 0, height: 36}}>
            发送
          </Button>
        </View>
      </VStack>
    </BPage>
  );
});
