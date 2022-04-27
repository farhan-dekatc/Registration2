package com.services.registration.users.service;

import com.services.registration.session.entity.AboutWork;
import com.services.registration.users.entity.User;
import com.services.registration.users.entity.UserDto;
import com.services.registration.users.entity.UserProfileDTO;

import javax.validation.Valid;
import java.util.List;

public interface UserService {
	public boolean insertOrSaveUser(User user);

	// company registration
	List<User> getAll();

	void delete(long id);

	// Optional<User> getByUserNameAndPassword(String username, String password);
	User getByUserNameAndPassword(String username, String password);

	User getByUserName(String username);

	User getByEmail(String email);

	User getById(Long id);

	boolean existsByEmail(String email);

	// update by username
	User updateByEmail(String email, UserProfileDTO userProfile);

	// get logged in user details
	String getLoggedInUserEmail();

	Long getLoggedInUserId();
	
	Long getLoggedInUserAccountId();

	User getLoggedInUser();

	User getUserInfoByUserId(Long userId);

	// creating new user (sign up user as ADMIN)
	User userResister(UserDto user);

	// --- USERS ADDED BY ADMIN ---
	User createUserByAdmin(User user);
//	List<User> getUsersByAccountId(Long id);
	//List<User> getUsersByCompanyId(Long id); // need mod
	public User updateById(Long id, User UserRequest);
	boolean deleteById(Long id);
	
	boolean changePassword(String oldPassword, String newPassword);
	
	public void sendEmail(String email,Long id,Long checkNo);

	public User adddata(AboutWork about);

	public User updateById(Long id, @Valid AboutWork aboutWork);
	public User updateById2(Long id, @Valid AboutWork aboutWork);

	public User userResister(User user, Long id);

	
	User updateByIdWorkingId(Long id, @Valid AboutWork aboutWork);

	User updateByMangingWork(Long id, @Valid AboutWork aboutWork);

	public User userResisteremail(User user);

	public void sendEmail2(String email1, Long userId, Long checknumber);
	
	public void sendEmail3(String email2, Long userId, Long checknumber);
    
	public void sendEmail4(String email3, Long userId, Long checknumber);
	
	public void sendEmail5(String email4, Long userId, Long checknumber);
	
	//public boolean exitbychecknumber(Long userId, Long checknumber);
	public User exitbychecknumber(Long userId, Long checknumber);

	public User save(User user);
	
	

//	public List<AboutWork> save(List<User> about);

	

}