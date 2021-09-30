package com.3309-store-BE.data-access-object;

import com.3309-store-BE.pojo.Category;

public interface CategoryMapper {
    int insert(Category record);

    int insertSelective(Category record);
}