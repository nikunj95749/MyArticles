import {callApiGet, callApiPost, callApiDelete} from './baseApi';
import API from '../../constants/baseApi';

export const Article = (data = {}, url) =>
  callApiGet({url: API.GET_ARTICLE + url});
export const getArticleDetail = (data = {}, url) =>
  callApiGet({url: API.ARTICLE + url, data});
