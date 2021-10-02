package com.e_store.service.test;

import com.github.pagehelper.PageInfo;
import com.google.common.collect.Lists;
import com.e_store.common.ServerResponse;
import com.e_store.service.IProductService;
import com.e_store.test.TestBase;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


public class ProductServiceTest extends TestBase {

    @Autowired
    private IProductService iProductService;

    @Test
    public void testIProductService(){
        ServerResponse<PageInfo> result =  iProductService.getProductByKeywordCategory("iphone",2,1,5,"price_desc");
        System.out.println(result);
    }

    public static void main(String[] args) {
        List<String> images = Lists.newArrayList();
        images.add("e_store/aa.jpg");
        images.add("e_store/bb.jpg");
        images.add("e_store/cc.jpg");
        images.add("e_store/dd.jpg");
        images.add("e_store/ee.jpg");
//        ["e_store/aa.jpg","e_store/bb.jpg","e_store/cc.jpg","e_store/dd.jpg","e_store/ee.jpg"]
    }
}
