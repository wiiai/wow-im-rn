import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import WebView from 'react-native-webview';
import BPage from '@/baseUI/BPage';
import {RootStackParamList} from '@/navigator';
import { useNavigation, useRoute } from '@react-navigation/native';

type IProps = NativeStackScreenProps<RootStackParamList, 'H5'>;

const H5Screen: React.FC = () => {
  const navigation = useNavigation<IProps['navigation']>();
  const route = useRoute<IProps['route']>();
  const back = () => navigation.goBack();

  return (
    <BPage onClickBack={back} title="">
      <WebView
        style={{flex: 1}}
        source={{uri: route.params.url || 'https://www.baidu.com/'}}
      />
    </BPage>
  );
};

export default H5Screen;
