package com.e_store.service;

import com.github.pagehelper.PageInfo;
import com.e_store.common.ServerResponse;
import com.e_store.pojo.Shipping;

//Shipping Service Interface
public interface IShippingService {

    ServerResponse add(Integer userId, Shipping shipping);
    ServerResponse<String> del(Integer userId,Integer shippingId);
    ServerResponse update(Integer userId, Shipping shipping);
    ServerResponse<Shipping> select(Integer userId, Integer shippingId);
    ServerResponse<PageInfo> list(Integer userId, int pageNum, int pageSize);

}
