// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.DataResult>('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function addVideo(body: API.AddVideo, options?: { [key: string]: any }) {
  return request<API.DataResult>('/default/SALaunchFinalPresentationLambda', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'hPvBKfdjW54d1AJBwPCzh694ICAWolS75fnQDxNc',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/videoList */
export async function videoList(params: {}, options?: { [key: string]: any }) {
  return request<API.DataResult>('/default/SALaunchFinalPresentationLambda', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'hPvBKfdjW54d1AJBwPCzh694ICAWolS75fnQDxNc',
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/videoList */
export async function userList(options?: { [key: string]: any }) {
  return request<API.DataResult>('/api/userList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/videoList */
export async function addUser(body: API.AddUser, options?: { [key: string]: any }) {
  return request<API.DataResult>('/api/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
