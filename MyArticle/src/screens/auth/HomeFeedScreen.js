import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {PostItem} from '../../components/PostItem';
import {useDispatch, useSelector} from 'react-redux';
import {Article} from '../../resources/baseServices/article';
import {getArticle, getArticleTotal} from '../../store/article';
import ScreenLoader from '../../components/Loader/ScreenLoader';
import {Header} from '../../components/Header';
import {BLACK, DARK_GRAY_66} from '../../styles';

const HomeFeedScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const articleData = useSelector(state => state.article.article_data ?? '');
  const totalArticle = useSelector(state => state.article.article_total ?? '');

  useEffect(() => {
    getArticleData();
  }, []);

  const getArticleData = async () => {
    setLoader(true);
    const res = await Article({}, `&_page=${pageCount}`);
    if (res?.data && res?.data?.length > 0) {
      const paginationData = {
        page: pageCount,
        totalData: 100,
      };
      dispatch(getArticle(res?.data));
      dispatch(getArticleTotal(paginationData));
      setLoader(false);
    }
  };

  const loadMorePosts = async () => {
    if (totalArticle?.totalData > articleData?.length) {
      setIsLoading(true);
      const res = await Article({}, `&_page=${pageCount + 1}`);
      if (res?.data) {
        setPageCount(pageCount + 1);
        dispatch(getArticle([...articleData, ...res?.data]));
      }
      setIsLoading(false);
      return;
    } else {
      setIsLoading(false);
      return;
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const res = await Article({}, `&_page=1`);
    if (res?.data && res?.data?.length > 0) {
      const paginationData = {
        page: pageCount,
        totalData: 100,
      };
      dispatch(getArticle(res?.data));
      dispatch(getArticleTotal(paginationData));
      setRefreshing(false);
    }
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator />;
  };

  const handleEndReached = () => {
    if (!isLoading) {
      loadMorePosts();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader && <ScreenLoader />}
      <Header navigation={navigation} title={'Home'} backIcon={false} />
      <FlatList
        data={articleData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <PostItem post={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => item + index}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={DARK_GRAY_66}
            tintColor={DARK_GRAY_66}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
});

export default HomeFeedScreen;
