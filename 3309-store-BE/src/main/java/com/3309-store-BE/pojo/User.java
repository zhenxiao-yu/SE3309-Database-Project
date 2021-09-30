package com.3309-store-BE.pojo;

import java.util.Date;

public class User extends UserKey {
    private String selectPriv;

    private String insertPriv;

    private String updatePriv;

    private String deletePriv;

    private String createPriv;

    private String dropPriv;

    private String reloadPriv;

    private String shutdownPriv;

    private String processPriv;

    private String filePriv;

    private String grantPriv;

    private String referencesPriv;

    private String indexPriv;

    private String alterPriv;

    private String showDbPriv;

    private String superPriv;

    private String createTmpTablePriv;

    private String lockTablesPriv;

    private String executePriv;

    private String replSlavePriv;

    private String replClientPriv;

    private String createViewPriv;

    private String showViewPriv;

    private String createRoutinePriv;

    private String alterRoutinePriv;

    private String createUserPriv;

    private String eventPriv;

    private String triggerPriv;

    private String createTablespacePriv;

    private String sslType;

    private Integer maxQuestions;

    private Integer maxUpdates;

    private Integer maxConnections;

    private Integer maxUserConnections;

    private String plugin;

    private String passwordExpired;

    private Date passwordLastChanged;

    private Short passwordLifetime;

    private String accountLocked;

    private String createRolePriv;

    private String dropRolePriv;

    private Short passwordReuseHistory;

    private Short passwordReuseTime;

    private String passwordRequireCurrent;

    public User(String host, String user, String selectPriv, String insertPriv, String updatePriv, String deletePriv, String createPriv, String dropPriv, String reloadPriv, String shutdownPriv, String processPriv, String filePriv, String grantPriv, String referencesPriv, String indexPriv, String alterPriv, String showDbPriv, String superPriv, String createTmpTablePriv, String lockTablesPriv, String executePriv, String replSlavePriv, String replClientPriv, String createViewPriv, String showViewPriv, String createRoutinePriv, String alterRoutinePriv, String createUserPriv, String eventPriv, String triggerPriv, String createTablespacePriv, String sslType, Integer maxQuestions, Integer maxUpdates, Integer maxConnections, Integer maxUserConnections, String plugin, String passwordExpired, Date passwordLastChanged, Short passwordLifetime, String accountLocked, String createRolePriv, String dropRolePriv, Short passwordReuseHistory, Short passwordReuseTime, String passwordRequireCurrent) {
        super(host, user);
        this.selectPriv = selectPriv;
        this.insertPriv = insertPriv;
        this.updatePriv = updatePriv;
        this.deletePriv = deletePriv;
        this.createPriv = createPriv;
        this.dropPriv = dropPriv;
        this.reloadPriv = reloadPriv;
        this.shutdownPriv = shutdownPriv;
        this.processPriv = processPriv;
        this.filePriv = filePriv;
        this.grantPriv = grantPriv;
        this.referencesPriv = referencesPriv;
        this.indexPriv = indexPriv;
        this.alterPriv = alterPriv;
        this.showDbPriv = showDbPriv;
        this.superPriv = superPriv;
        this.createTmpTablePriv = createTmpTablePriv;
        this.lockTablesPriv = lockTablesPriv;
        this.executePriv = executePriv;
        this.replSlavePriv = replSlavePriv;
        this.replClientPriv = replClientPriv;
        this.createViewPriv = createViewPriv;
        this.showViewPriv = showViewPriv;
        this.createRoutinePriv = createRoutinePriv;
        this.alterRoutinePriv = alterRoutinePriv;
        this.createUserPriv = createUserPriv;
        this.eventPriv = eventPriv;
        this.triggerPriv = triggerPriv;
        this.createTablespacePriv = createTablespacePriv;
        this.sslType = sslType;
        this.maxQuestions = maxQuestions;
        this.maxUpdates = maxUpdates;
        this.maxConnections = maxConnections;
        this.maxUserConnections = maxUserConnections;
        this.plugin = plugin;
        this.passwordExpired = passwordExpired;
        this.passwordLastChanged = passwordLastChanged;
        this.passwordLifetime = passwordLifetime;
        this.accountLocked = accountLocked;
        this.createRolePriv = createRolePriv;
        this.dropRolePriv = dropRolePriv;
        this.passwordReuseHistory = passwordReuseHistory;
        this.passwordReuseTime = passwordReuseTime;
        this.passwordRequireCurrent = passwordRequireCurrent;
    }

    public User() {
        super();
    }

    public String getSelectPriv() {
        return selectPriv;
    }

    public void setSelectPriv(String selectPriv) {
        this.selectPriv = selectPriv == null ? null : selectPriv.trim();
    }

    public String getInsertPriv() {
        return insertPriv;
    }

    public void setInsertPriv(String insertPriv) {
        this.insertPriv = insertPriv == null ? null : insertPriv.trim();
    }

    public String getUpdatePriv() {
        return updatePriv;
    }

    public void setUpdatePriv(String updatePriv) {
        this.updatePriv = updatePriv == null ? null : updatePriv.trim();
    }

    public String getDeletePriv() {
        return deletePriv;
    }

    public void setDeletePriv(String deletePriv) {
        this.deletePriv = deletePriv == null ? null : deletePriv.trim();
    }

    public String getCreatePriv() {
        return createPriv;
    }

    public void setCreatePriv(String createPriv) {
        this.createPriv = createPriv == null ? null : createPriv.trim();
    }

    public String getDropPriv() {
        return dropPriv;
    }

    public void setDropPriv(String dropPriv) {
        this.dropPriv = dropPriv == null ? null : dropPriv.trim();
    }

    public String getReloadPriv() {
        return reloadPriv;
    }

    public void setReloadPriv(String reloadPriv) {
        this.reloadPriv = reloadPriv == null ? null : reloadPriv.trim();
    }

    public String getShutdownPriv() {
        return shutdownPriv;
    }

    public void setShutdownPriv(String shutdownPriv) {
        this.shutdownPriv = shutdownPriv == null ? null : shutdownPriv.trim();
    }

    public String getProcessPriv() {
        return processPriv;
    }

    public void setProcessPriv(String processPriv) {
        this.processPriv = processPriv == null ? null : processPriv.trim();
    }

    public String getFilePriv() {
        return filePriv;
    }

    public void setFilePriv(String filePriv) {
        this.filePriv = filePriv == null ? null : filePriv.trim();
    }

    public String getGrantPriv() {
        return grantPriv;
    }

    public void setGrantPriv(String grantPriv) {
        this.grantPriv = grantPriv == null ? null : grantPriv.trim();
    }

    public String getReferencesPriv() {
        return referencesPriv;
    }

    public void setReferencesPriv(String referencesPriv) {
        this.referencesPriv = referencesPriv == null ? null : referencesPriv.trim();
    }

    public String getIndexPriv() {
        return indexPriv;
    }

    public void setIndexPriv(String indexPriv) {
        this.indexPriv = indexPriv == null ? null : indexPriv.trim();
    }

    public String getAlterPriv() {
        return alterPriv;
    }

    public void setAlterPriv(String alterPriv) {
        this.alterPriv = alterPriv == null ? null : alterPriv.trim();
    }

    public String getShowDbPriv() {
        return showDbPriv;
    }

    public void setShowDbPriv(String showDbPriv) {
        this.showDbPriv = showDbPriv == null ? null : showDbPriv.trim();
    }

    public String getSuperPriv() {
        return superPriv;
    }

    public void setSuperPriv(String superPriv) {
        this.superPriv = superPriv == null ? null : superPriv.trim();
    }

    public String getCreateTmpTablePriv() {
        return createTmpTablePriv;
    }

    public void setCreateTmpTablePriv(String createTmpTablePriv) {
        this.createTmpTablePriv = createTmpTablePriv == null ? null : createTmpTablePriv.trim();
    }

    public String getLockTablesPriv() {
        return lockTablesPriv;
    }

    public void setLockTablesPriv(String lockTablesPriv) {
        this.lockTablesPriv = lockTablesPriv == null ? null : lockTablesPriv.trim();
    }

    public String getExecutePriv() {
        return executePriv;
    }

    public void setExecutePriv(String executePriv) {
        this.executePriv = executePriv == null ? null : executePriv.trim();
    }

    public String getReplSlavePriv() {
        return replSlavePriv;
    }

    public void setReplSlavePriv(String replSlavePriv) {
        this.replSlavePriv = replSlavePriv == null ? null : replSlavePriv.trim();
    }

    public String getReplClientPriv() {
        return replClientPriv;
    }

    public void setReplClientPriv(String replClientPriv) {
        this.replClientPriv = replClientPriv == null ? null : replClientPriv.trim();
    }

    public String getCreateViewPriv() {
        return createViewPriv;
    }

    public void setCreateViewPriv(String createViewPriv) {
        this.createViewPriv = createViewPriv == null ? null : createViewPriv.trim();
    }

    public String getShowViewPriv() {
        return showViewPriv;
    }

    public void setShowViewPriv(String showViewPriv) {
        this.showViewPriv = showViewPriv == null ? null : showViewPriv.trim();
    }

    public String getCreateRoutinePriv() {
        return createRoutinePriv;
    }

    public void setCreateRoutinePriv(String createRoutinePriv) {
        this.createRoutinePriv = createRoutinePriv == null ? null : createRoutinePriv.trim();
    }

    public String getAlterRoutinePriv() {
        return alterRoutinePriv;
    }

    public void setAlterRoutinePriv(String alterRoutinePriv) {
        this.alterRoutinePriv = alterRoutinePriv == null ? null : alterRoutinePriv.trim();
    }

    public String getCreateUserPriv() {
        return createUserPriv;
    }

    public void setCreateUserPriv(String createUserPriv) {
        this.createUserPriv = createUserPriv == null ? null : createUserPriv.trim();
    }

    public String getEventPriv() {
        return eventPriv;
    }

    public void setEventPriv(String eventPriv) {
        this.eventPriv = eventPriv == null ? null : eventPriv.trim();
    }

    public String getTriggerPriv() {
        return triggerPriv;
    }

    public void setTriggerPriv(String triggerPriv) {
        this.triggerPriv = triggerPriv == null ? null : triggerPriv.trim();
    }

    public String getCreateTablespacePriv() {
        return createTablespacePriv;
    }

    public void setCreateTablespacePriv(String createTablespacePriv) {
        this.createTablespacePriv = createTablespacePriv == null ? null : createTablespacePriv.trim();
    }

    public String getSslType() {
        return sslType;
    }

    public void setSslType(String sslType) {
        this.sslType = sslType == null ? null : sslType.trim();
    }

    public Integer getMaxQuestions() {
        return maxQuestions;
    }

    public void setMaxQuestions(Integer maxQuestions) {
        this.maxQuestions = maxQuestions;
    }

    public Integer getMaxUpdates() {
        return maxUpdates;
    }

    public void setMaxUpdates(Integer maxUpdates) {
        this.maxUpdates = maxUpdates;
    }

    public Integer getMaxConnections() {
        return maxConnections;
    }

    public void setMaxConnections(Integer maxConnections) {
        this.maxConnections = maxConnections;
    }

    public Integer getMaxUserConnections() {
        return maxUserConnections;
    }

    public void setMaxUserConnections(Integer maxUserConnections) {
        this.maxUserConnections = maxUserConnections;
    }

    public String getPlugin() {
        return plugin;
    }

    public void setPlugin(String plugin) {
        this.plugin = plugin == null ? null : plugin.trim();
    }

    public String getPasswordExpired() {
        return passwordExpired;
    }

    public void setPasswordExpired(String passwordExpired) {
        this.passwordExpired = passwordExpired == null ? null : passwordExpired.trim();
    }

    public Date getPasswordLastChanged() {
        return passwordLastChanged;
    }

    public void setPasswordLastChanged(Date passwordLastChanged) {
        this.passwordLastChanged = passwordLastChanged;
    }

    public Short getPasswordLifetime() {
        return passwordLifetime;
    }

    public void setPasswordLifetime(Short passwordLifetime) {
        this.passwordLifetime = passwordLifetime;
    }

    public String getAccountLocked() {
        return accountLocked;
    }

    public void setAccountLocked(String accountLocked) {
        this.accountLocked = accountLocked == null ? null : accountLocked.trim();
    }

    public String getCreateRolePriv() {
        return createRolePriv;
    }

    public void setCreateRolePriv(String createRolePriv) {
        this.createRolePriv = createRolePriv == null ? null : createRolePriv.trim();
    }

    public String getDropRolePriv() {
        return dropRolePriv;
    }

    public void setDropRolePriv(String dropRolePriv) {
        this.dropRolePriv = dropRolePriv == null ? null : dropRolePriv.trim();
    }

    public Short getPasswordReuseHistory() {
        return passwordReuseHistory;
    }

    public void setPasswordReuseHistory(Short passwordReuseHistory) {
        this.passwordReuseHistory = passwordReuseHistory;
    }

    public Short getPasswordReuseTime() {
        return passwordReuseTime;
    }

    public void setPasswordReuseTime(Short passwordReuseTime) {
        this.passwordReuseTime = passwordReuseTime;
    }

    public String getPasswordRequireCurrent() {
        return passwordRequireCurrent;
    }

    public void setPasswordRequireCurrent(String passwordRequireCurrent) {
        this.passwordRequireCurrent = passwordRequireCurrent == null ? null : passwordRequireCurrent.trim();
    }
}