package com.3309-store-BE.pojo;

public class UserKey {
    private String host;

    private String user;

    public UserKey(String host, String user) {
        this.host = host;
        this.user = user;
    }

    public UserKey() {
        super();
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host == null ? null : host.trim();
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user == null ? null : user.trim();
    }
}