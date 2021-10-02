package com.e_store.dao.test;

import com.e_store.dao.CategoryMapper;
import com.e_store.pojo.Category;
import com.e_store.service.impl.CategoryServiceImpl;
import com.e_store.test.TestBase;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class CategoryDaoTest extends TestBase {


    @Autowired
    private CategoryMapper categoryMapper;
    @Autowired
    private CategoryServiceImpl iCategoryService;

    @Ignore
    @Test
    public void getCategoryChild(){
        Category d  = categoryMapper.selectByPrimaryKey(1);
        System.out.println(d);
        Category d4  = categoryMapper.selectByPrimaryKey(4);
        System.out.println(d4);
    }
    @Test
    public void testChildService(){
        iCategoryService.selectCategoryAndChildrenById(2);
    }

}
