package com.e_store.service;

import org.springframework.web.multipart.MultipartFile;

//File Upload Service Interface
public interface IFileService {

    String upload(MultipartFile file, String path);
}
