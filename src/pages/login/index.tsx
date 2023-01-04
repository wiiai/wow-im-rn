import React, {useState} from 'react';
import {Text, View, TouchableWithoutFeedback, Image} from 'react-native';
import {observer} from 'mobx-react-lite';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/navigator';
import ArrowLeftIcon from '@/assets/img/arrow_left.png';
import {styles} from './style';
import {useStore} from '@/models';
import {Input, Stack, Button, HStack, Pressable} from 'native-base';
import IconFont from '@/assets/iconfont';
import BPage from '@/baseUI/BPage';

const LoginScreen: React.FC = (props: {
  navigation?: StackScreenProps<RootStackParamList>['navigation'];
}) => {
  const { navigation } = props;
  const {userStore} = useStore();
  const [show, setShow] = React.useState(false);

  const [state, _setState] = useState({
    account: '000001',
    password: '666666',
    isLogin: true,
    privacyChecked: true,
  });

  const setState = (state: Record<string, any>) => {
    _setState(prev => ({...prev, ...state }));
  };

  const doLogin = () => {
    userStore
      .login({
        account: state.account,
        password: state.password,
      })
      .then(() => {
        navigation?.goBack();
      });
  };

  const handleSubmit = () => doLogin();
  const {isLogin} = state;

  const smallBtn = {
    fontSize: 12,
    color: '#888',
  };

  const FormBox = (
    <View style={styles.formBox}>
      <Stack space={6}>
        <Input
          variant="rounded"
          value={state.account}
          onChangeText={account => setState({account})}
          style={{height: 36}}
          placeholder="登录账户"
        />
        <Input
          variant="rounded"
          onChangeText={password => setState({password})}
          value={state.password}
          style={{height: 36}}
          placeholder="登录密码"
          type={show ? 'text' : 'password'}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <View style={{marginRight: 10}}>
                <IconFont name={show ? 'icon-eye' : 'icon-no_eye'} />
              </View>
            </Pressable>
          }
        />
      </Stack>

      <View style={{marginTop: 20}}>
        <Button
          onPress={handleSubmit}
          bgColor={'primary.900'}
          isLoading={userStore.loading}>
          {userStore.loading ? 'LOADING' : isLogin ? '立即登录' : '立即注册'}
        </Button>
      </View>

      <View style={styles.bwtWrapper}>
        <View style={styles.tipWrapper}>
          <Text style={{color: '#999'}}>
            {isLogin ? '没有账户？' : '已有账户？'}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              setState({isLogin: !isLogin});
            }}>
            <Text>{isLogin ? '注册' : '登录'}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );

  return (
    <BPage style={styles.container} showNavBar={false}>
      {navigation ? <TouchableWithoutFeedback onPress={() => navigation?.goBack()}>
        <Image
          source={ArrowLeftIcon}
          style={{width: 24, height: 24, marginTop: 20, marginLeft: 20}}
        />
      </TouchableWithoutFeedback> : null }

      <View style={styles.cardBox}>
        <Text style={{fontSize: 24, fontWeight: '700', marginTop: 80}}>
          友友IM
        </Text>
      </View>

      {FormBox}

      <View style={{ paddingHorizontal: 12}}>
        <Text>000001 (密码均为 666666)</Text>
        <Text>000002 (密码均为 666666)</Text>
        <Text>000003 (密码均为 666666)</Text>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: '20%',
          width: '100%',
        }}>
        <HStack justifyContent="center">
          <Text style={smallBtn}>阅读并同意</Text>
          <TouchableWithoutFeedback>
            <Text style={smallBtn}>《用户协议》</Text>
          </TouchableWithoutFeedback>
          <Text style={smallBtn}>和</Text>
          <TouchableWithoutFeedback>
            <Text style={smallBtn}>《隐私政策》</Text>
          </TouchableWithoutFeedback>
        </HStack>
      </View>
    </BPage>
  );
};

export default observer(LoginScreen);
