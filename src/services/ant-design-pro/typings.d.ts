// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    userid?: string;
    mobile?: string;
    userType?: number;
    avatar?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
  };
  type NetUser = {
    id?: number;
    name?: string;
    mobile?: string;
    user_type?: number;
  };

  type LoginParams = {
    mobile?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type AddVideo = {
    title: string;
    thumbnail: string;
    source_url: string;
    s3_url: string;
  };

  type AddUser = {
    name?: string;
    mobile?: string;
    user_type?: number;
    password?: string;
  };

  type Video = {
    title: string;
    thumbnail: string;
    source_url: string;
    like_num: number;
    unlike_num: number;
    hls_state: number;
    upload_time: string;
  };

  type DataResult = {
    code?: number;
    msg?: string;
    data?: object;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
