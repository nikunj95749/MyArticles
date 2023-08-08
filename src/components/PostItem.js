import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { DARK_GRAY_90, LIGHT_GRAY_115 } from '../styles';

export const PostItem = ({post, navigation, isPostDetail = false}) => {
  return (
    <View key={post?.id} style={styles.postView}>
      <TouchableOpacity
        disabled={isPostDetail}
        onPress={() => navigation.navigate('PostDetail', {postId: post?.id})}
        style={{paddingLeft: 4}}>
        <Text style={styles.postTitle}>{post?.title}</Text>
        <Text style={styles.postDescription}>{post?.body}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postView: {
    marginTop: 10,
    padding: 10,
    backgroundColor: DARK_GRAY_90,
    borderRadius: 15,
  },
  postTitle: {
    marginTop: 15,
    fontWeight: '600',
    fontSize: 14,
    color: LIGHT_GRAY_115,
  },
  postDescription: {
    marginTop: 10,
    fontWeight: '400',
    fontSize: 14,
    color: LIGHT_GRAY_115,
  },
});
