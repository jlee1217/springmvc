package com.model.user;

import com.model.BaseModel;

/**
 * ClassName: User 
 * @Description: 用户实体类
 * @author ljy
 * @date 2016年8月24日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
 
public class User extends BaseModel{

    /**
	 * @Fields serialVersionUID : 序列化
	 */
	private static final long serialVersionUID = -3587617496644977762L;

	/**
     * @Fields userName : 用户名
     */
    private String userName;

    /**
     * @Fields password : 用户密码
     */
    private String password;

    /**
     * @Fields nickName : 昵称
     */
    private String nickName;

    /**
     * @Fields address : 地址
     */
    private String address;

    /**
     * @Fields telephone : 联系方式
     */
    private String telephone;

    /**
     * @Fields mobile : 手机号码
     */
    private String mobile;

    /**
     * @Fields email : 邮箱
     */
    private String email;

    /**
     * @Fields roleId : 角色id
     */
    private String roleId;

    /**
     * @Fields status : 状态 0 正常 1停用
     */
    private Integer status;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName == null ? null : nickName.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone == null ? null : telephone.trim();
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : mobile.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId == null ? null : roleId.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

	@Override
	public String toString() {
		return "User [userName=" + userName + ", password=" + password
				+ ", nickName=" + nickName + ", address=" + address
				+ ", telephone=" + telephone + ", mobile=" + mobile + ", email="
				+ email + ", roleId=" + roleId + ", status=" + status
				+ ", getId()=" + getId() + ", getCreateTime()="
				+ getCreateTime() + ", getUpdateTime()=" + getUpdateTime()
				+ ", getDisabled()=" + getDisabled() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}
    
}