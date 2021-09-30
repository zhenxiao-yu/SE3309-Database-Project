package com.3309-store-BE.data-access-object;

import com.3309-store-BE.pojo.User;
import com.3309-store-BE.pojo.UserKey;
import com.3309-store-BE.pojo.UserWithBLOBs;

public interface UserMapper {
    int deleteByPrimaryKey(UserKey key);

    int insert(UserWithBLOBs record);

    int insertSelective(UserWithBLOBs record);

    UserWithBLOBs selectByPrimaryKey(UserKey key);

    int updateByPrimaryKeySelective(UserWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(UserWithBLOBs record);

    int updateByPrimaryKey(User record);
}