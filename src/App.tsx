import * as React from 'react';
import {rootStore, StoreContext} from './models';
import Navigator from './navigator';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {loadLocalUInfo} from './utils/auth';
import {View, Text} from 'react-native';
import Login from './pages/login';
import {observer} from 'mobx-react-lite';

const Main = observer(() => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    onBeforeBootstrap().then(() => {
      setIsLoaded(true);
    });
  }, [rootStore.userStore.isLogin]);

  // 在应用主框架启动要干的事情
  const onBeforeBootstrap = async () => {
    // 离线存储数据加载到内存中
    const uInfo = await loadLocalUInfo();

    // 检查登录态
    await rootStore.userStore.checkLogin();

    // store 初始化
    if (uInfo) {
      rootStore.userStore.initData({ userInfo: uInfo })
    }

    // 如果是登录状态, 创建 socket 连接
    if (rootStore.userStore.isLogin) {
      rootStore.socketStore.initSocket();
      await rootStore.sessionStore.fetchList();
    } else {
      rootStore.socketStore.doDisConnect();
    }
  };

  if (!isLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>加载中...</Text>
      </View>
    );
  }

  // 未登录渲染登录页面
  if (!rootStore.userStore.isLogin) {
    return <Login />;
  }

  return <Navigator />;
});

export default function App() {
  const theme = extendTheme({
    colors: {
      primary: {
        900: '#1c1917',
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <StoreContext.Provider value={rootStore}>
        <Main />
      </StoreContext.Provider>
    </NativeBaseProvider>
  );
}
