import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  getArticleDetail,
} from '../../resources/baseServices/article';
import ScreenLoader from '../../components/Loader/ScreenLoader';
import {Header} from '../../components/Header';
import { PostItem } from '../../components/PostItem';

const PostDetailScreen = ({navigation, route}) => {
  const [postDetailData, setPostDetailData] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getPostDetail();
  }, []);

  const getPostDetail = async () => {
    setLoader(true);
    const res = await getArticleDetail({}, `/${route?.params?.postId}`);
    if (res?.data) {
      setPostDetailData(res?.data);
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={'Post Detail'} backIcon={true} />
      {loader && <ScreenLoader />}
      <PostItem post={postDetailData} navigation={navigation} isPostDetail={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  commentView: {
    marginTop: 10,
    backgroundColor: '#000',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    bottom: 0,
    zIndex: 1,
  },
  loginUserName: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
  },
  commentInput: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 50,
    width: '85%',
    borderRadius: 20,
    alignSelf: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: '#c2c2c2',
    color: '#c2c2c2',
  },
  postButton: {
    position: 'absolute',
    right: 35,
  },
  postText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#3677ef',
  },
});

export default PostDetailScreen;
