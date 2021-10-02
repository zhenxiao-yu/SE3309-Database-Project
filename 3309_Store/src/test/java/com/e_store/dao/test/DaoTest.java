package com.e_store.dao.test;

import com.e_store.dao.UserMapper;
import com.e_store.pojo.User;
import com.e_store.test.TestBase;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.util.Date;


public class DaoTest extends TestBase {

    @Autowired
    private UserMapper userMapper;

    @Ignore
    @Test
    public void testDao(){
        User a = new User();
        a.setPassword("111");
        a.setUsername("aaaaageely");
        a.setRole(0);
        a.setCreateTime(new Date());
        a.setUpdateTime(new Timestamp(System.currentTimeMillis()));
        System.out.println(userMapper.insert(a));
        System.out.println("aaaaaaaaaaaaaa");
    }


}
