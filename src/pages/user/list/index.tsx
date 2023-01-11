import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProFormText, ProTable } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { addUser, userList } from '@/services/ant-design-pro/api';
import type { RadioChangeEvent } from 'antd';
import { Button, message, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';

const MD5 = require('md5.js');

const UserList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [userType, setUserType] = useState(1);

  // 请求table数据
  const getUserList = async () => {
    try {
      const data = await userList();
      // 请求成功
      if (data && data.code === 0) {
        return {
          // @ts-ignore
          data: data.data.userList,
          success: true,
          // @ts-ignore
          total: data.data.userList.length,
        };
      }
    } catch (err) {
      console.log(err);
    }
    return {};
  };

  const onChange = (e: RadioChangeEvent) => {
    setUserType(e.target.value);
  };

  const columns: ProColumns<API.NetUser>[] = [
    {
      dataIndex: 'id',
      title: '用户id',
    },
    {
      dataIndex: 'name',
      title: '用户名',
    },
    {
      dataIndex: 'mobile',
      title: '手机号',
    },
    {
      dataIndex: 'user_type',
      title: '用户类型',
      render: (_, record) => {
        if (record.user_type === 1) {
          return '普通用户';
        } else if (record.user_type === 2) {
          return '管理用户';
        } else {
          return '无权限';
        }
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Video>
        // @ts-ignore
        columns={columns}
        request={getUserList}
        rowKey="outUserNo"
        actionRef={actionRef}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
      />
      <ModalForm
        title={'新增用户'}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={async (value) => {
          const user = {
            name: value.name,
            mobile: value.mobile,
            user_type: userType,
            password: new MD5().update('123456').digest('hex'),
          };
          //网络请求
          const res = await addUser(user);
          if (res.code === 0) {
            message.success(`添加成功`);
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          } else {
            message.error(`${res.msg}`);
          }
        }}
      >
        <ProFormText
          label={'用户名'}
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          label={'手机号'}
          rules={[
            {
              required: true,
              message: '请输入手机号',
            },
          ]}
          width="md"
          name="mobile"
        />
        <Radio.Group onChange={onChange} value={userType}>
          <Radio value={1}>普通用户</Radio>
          <Radio value={2}>管理用户</Radio>
        </Radio.Group>
        <div>默认密码：123456</div>
      </ModalForm>
    </PageContainer>
  );
};
export default UserList;
