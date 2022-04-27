package com.services.registration.users.service;

import com.services.registration.exceptions.InvalidUserDataException;
import com.services.registration.exceptions.ResourceNotFoundException;
import com.services.registration.session.entity.AboutWork;
import com.services.registration.users.entity.*;
import com.services.registration.users.repository.RoleRepo;
import com.services.registration.users.repository.UserRepo;
import com.services.registration.utils.Constant;
import com.services.registration.utils.UserConstant;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
public class UserServiceImpl implements UserDetailsService, UserService { // UserDetailsService,

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    @Autowired
    private JavaMailSender javaMailSender;

//    @Autowired
//    private MailSender mailsender;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // User user = userRepo.findByUsername(username);
        User user = userRepo.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid Email or password.");
        }
        CustomUserDetails customUserDetails = new CustomUserDetails(user);
        // System.out.println("USER SERVICE IMPL --> customUserDetails: " +
        // customUserDetails);
        // Optional<User> user2 =
        // userRepo.findByUsernameAndPassword(customUserDetails.getUsername(),
        // customUserDetails.getPassword());
        // System.out.println("USER SERVICE IMPL --> user2: " + user2);

//		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
//				getAuthority(user));
        return customUserDetails;

    }

//	private Set<SimpleGrantedAuthority> getAuthority(User user) {
//		Set<SimpleGrantedAuthority> authorities = new HashSet<>();
//		user.getRoles().forEach(role -> {
//			authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
//		});
//		return authorities;
//	}

    public List<User> getAll() {
        List<User> list = new ArrayList<>();
        userRepo.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public void delete(long id) {
        userRepo.deleteById(id);
    }

    @Override
    public User getByUserName(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public User getByEmail(String email) {
        User user = userRepo.findByEmail(email);
        log.info("getByEmail() : {}", user);
        return userRepo.findByEmail(email);
    }

    @Override
    public User getById(Long id) {
        return userRepo.findById(id).get();
    }

    @Override
    public User updateByEmail(String email, UserProfileDTO userProfile) {
        User old_user = userRepo.findByEmail(email);
        if (old_user == null) {
            throw new ResourceNotFoundException("User not found :: " + email);
        }
        old_user.setFullName(userProfile.getFullName());
        // old_user.setPhotos(userRequest.getPhotos());
        old_user.setDepartment(userProfile.getDepartment());
        old_user.setAbout(userProfile.getAbout());
        // old_user.setSys_account(userProfile.getSys_account()); // account update
        final User updated_user = userRepo.save(old_user);
        return updated_user;
    }

    // ######### ADMIN USER REGISTRATION ###### get 3 roles
    @Override
    public User userResister(User user, Long id) {
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setFirstName(user.getFirstName());
        newUser.setPhone(user.getPhone());
        newUser.setLastName(user.getLastName());
//		newUser.setUserId(id);

//		newUser.setPancard(user.getPancard());

        Sys_Accounts sys = new Sys_Accounts();
        sys.setId(id);
        newUser.setSys_account(sys);

        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));

        newUser.setEnabled(true); // is enabled true...
        newUser.setMenu_group_id(1); // menu group
        Set<Role> roles = new HashSet<Role>();
        Role admin_role = roleRepo.findByName("ADMIN");
        Role user_role = roleRepo.findByName("USER");
        Role billing_role = roleRepo.findByName("BILLING");
        roles.add(admin_role);
        roles.add(user_role);
        roles.add(billing_role);

        newUser.setRoles(roles);

//		Long id1=user.getUserId();
        return userRepo.save(newUser);
    }

    // ---- USER ADDED BY ADMIN -----
    public User createUserByAdmin(User user) {
        User admin = this.getLoggedInUser();

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setEnabled(true); // is enabled true...
        newUser.setStatus(UserConstant.STATUS_INVITED);
        newUser.setDepartment(user.getDepartment());
        newUser.setMenu_group_id(2); // NEED MODIFICATION
//		// --- default role ----
        Role user_role = roleRepo.findByName(UserConstant.ROLE_USER);
        try {
            // ---- role by admin
            Set<Role> admin_selected_role = new HashSet<Role>();
            admin_selected_role.add(user_role);
            Set<Role> role_name = user.getRoles();
            if (role_name != null) {
                for (Role role : role_name) {
                    Role getRole = roleRepo.findByName(role.getName());
                    if (getRole != null) {
                        admin_selected_role.add(getRole);
                    }
                }
            }
            newUser.setRoles(admin_selected_role);
        } catch (Exception e) {
            e.printStackTrace();
            log.info("add role exception handled..");
        }

        // ######## --- NEED MOD ---- ##########
//		Sys_Accounts company = admin.getCompany();
//		Long accountId = admin.getCompany().getId(); // GET MOD
//		newUser.setAccountId(accountId);
//		newUser.setCompany(company);
        Sys_Accounts company = admin.getSys_account();
        newUser.setSys_account(company);
        newUser.setCreatedBy(admin.getUserId());

        return userRepo.save(newUser);
    }

    // GET USER LIST BY COMPANY
//	@Override
//	public List<User> getUsersByAccountId(Long id) {
//		return userRepo.findByAccountId(id);
//	}

    // update user by admin (GET SET ROLE REMOVED)
    @Override
    public User updateById(Long id, User userRequest) {
        User admin = this.getLoggedInUser();
        User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found :: " + id));

        log.debug("user update request: {} ", userRequest);
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setFullName(userRequest.getFullName());
        user.setPassword(userRequest.getPassword());
        user.setMenu_group_id(userRequest.getMenu_group_id());
        user.setDepartment(userRequest.getDepartment());
        user.setAbout(userRequest.getAbout());
        user.setPhotos(userRequest.getPhotos());
        // user.setRoles(userRequest.getRoles());
        user.setUpdatedBy(admin.getUserId());
        final User updated_user = userRepo.save(user);
        log.debug("updated user: {} ", updated_user);
        return updated_user;
    }

    // DELETE user by admin
    @Override
    public boolean deleteById(Long id) {
        if (!userRepo.existsById(id)) {
            throw new ResourceNotFoundException("User not exist");
        }
        User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found :: " + id));
        userRepo.delete(user);
        return true;
    }

    @Override
    public boolean changePassword(String oldPassword, String newPassword) {
        User user = this.getLoggedInUser();
        boolean isMathced = bcryptEncoder.matches(oldPassword, user.getPassword());
        System.out.println("Password matched? " + isMathced);
        if (isMathced) {
            user.setPassword(bcryptEncoder.encode(newPassword));
            userRepo.save(user);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public User getByUserNameAndPassword(String username, String password) {
        log.info("getByUserNameAndPassword {} | {}", username, password);
        String encryptedPassword = bcryptEncoder.encode(password);
        log.info("encryptedPassword = {}", encryptedPassword);

//		User user1 = userRepo.findByUsernameAndPassword(username, password).orElse(null);
//		log.info("user1 with raw password= {}", user1);
        User user2 = userRepo.findByUsernameAndPassword(username, encryptedPassword).orElse(null);
        log.info("user2 with encrypted password= {}", user2);
        return user2;
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    // ### UTIL ###
    @Override
    public String getLoggedInUserEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            return "nosession";
        }
        //System.out.println("getLoggedInUserEmail() : " + auth.getName());
        return auth.getName();
    }

    @Override
    public Long getLoggedInUserId() {
        String loggedInUserEmail = this.getLoggedInUserEmail();
        User user = userRepo.findByEmail(loggedInUserEmail);
        Long id = user.getUserId();
        return id;
    }

    @Override
    public Long getLoggedInUserAccountId() {
        String loggedInUserEmail = this.getLoggedInUserEmail();
        User user = userRepo.findByEmail(loggedInUserEmail);
        Long accountId = user.getSys_account().getId();
        return accountId;
    }

    @Override
    public User getLoggedInUser() {
        String loggedInUserName = this.getLoggedInUserEmail();
        // User user = userRepo.findByUsername(loggedInUserName);
        User user = userRepo.findByEmail(loggedInUserName);
        // log.info("getLoggedInUser() : {} ", user);
        return user;
    }

    @Override
    public User getUserInfoByUserId(Long userId) {
        User user = this.userRepo.findById(userId).orElse(null);
        // log.info("getUserInfoByUserId() : {} ", user);
        return user;
    }

    @Override
    public boolean insertOrSaveUser(User user) {
        this.userRepo.save(user);
        return true;
    }

    public boolean addNewUser(User user) {
        User newUser = this.getUserInfoByUserId(user.getUserId());
        if (newUser != null) {
            // This means the username is not found therfore its is returning a default
            // value of "new"
            return this.insertOrSaveUser(user);
        } else {
            return false;
        }
    }

    // check if the username has not been registered
//  public void checkIfUsernameNotUsed(String username) {
//      User userByUsername = userRepo.findByEmail(username)
//          if (userByUsername != null) {
//              String msg = String.format("The username %s it's already in use from another user with ID = %s",
//                      userByUsername.getUsername(), userByUsername.getId());
//              log.error(msg);
//          throw new InvalidUserDataException(msg);
//      }
//  }
//
    // check if the email has not been registered
    public void checkIfEmailNotUsed(String email) {
        User userByEmail = userRepo.findByEmail(email);
        if (userByEmail != null) {
            String msg = String.format("The email %s it's already in use from another user with ID = %s",
                    userByEmail.getEmail(), userByEmail.getUserId());
            log.error(msg);
            throw new InvalidUserDataException(
                    String.format("This email %s it's already in use.", userByEmail.getEmail()));
        }
    }


    public void sendEmail(String email, Long id, Long checkNo) {
        String from = "buteganesh21@gmail.com";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(email);
        message.setSubject("please verify email");
        message.setText("http://localhost:4200/#/about-work/" + id + "/" + checkNo);
        javaMailSender.send(message);

    }

    @Override
    public User adddata(AboutWork about) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public User updateById(Long id, @Valid AboutWork aboutWork) {
        User oldUser = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(Constant.NOT_FOUND_EXCEPTION + " :" + id));
        oldUser.setPancard(aboutWork.getPancard());
        oldUser.setPhone(aboutWork.getMobile());
        oldUser.setFullName(aboutWork.getName());
        oldUser.setFirstName(aboutWork.getName().split(" ")[0]);
        oldUser.setLastName(aboutWork.getName().split(" ")[aboutWork.getName().split(" ").length-1]);
        oldUser.setPassword(bcryptEncoder.encode(aboutWork.getPassword()));

        final User updatedUser = userRepo.save(oldUser);
        return updatedUser;
    }

    @Override
    public User updateById2(Long id, @Valid AboutWork aboutWork) {
        User oldUser = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(Constant.NOT_FOUND_EXCEPTION + " :" + id));
        oldUser.setPancard(aboutWork.getPancard());

        final User updatedUser = userRepo.save(oldUser);
        return updatedUser;
    }


    @Override
    public User updateByIdWorkingId(Long id, @Valid AboutWork aboutWork) {


        User oldUser = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(Constant.NOT_FOUND_EXCEPTION + " :" + id));


        oldUser.setWorking(aboutWork.getWorking());


        final User updatedUser = userRepo.save(oldUser);
        return updatedUser;
    }


    @Override
    public User updateByMangingWork(Long id, @Valid AboutWork aboutWork) {


        User oldUser = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(Constant.NOT_FOUND_EXCEPTION + " :" + id));

        oldUser.setManaging_work(aboutWork.getManaging_work());


        final User updatedUser = userRepo.save(oldUser);
        return updatedUser;
    }


    @Override
    public User userResister(UserDto user) {
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setEnabled(true); // is enabled true...
        newUser.setMenu_group_id(1); // menu group
        Set<Role> roles = new HashSet<Role>();
        Role admin_role = roleRepo.findByName("ADMIN");
        Role user_role = roleRepo.findByName("USER");
        Role billing_role = roleRepo.findByName("BILLING");
        roles.add(admin_role);
        roles.add(user_role);
        roles.add(billing_role);
        newUser.setRoles(roles);
        return userRepo.save(newUser);
    }

    @Override
    public User userResisteremail(User user) {
        // TODO Auto-generated method stub
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setSys_account(user.getSys_account());
        newUser.setChecknumber(user.getChecknumber());
//		newUser.setUserId(user.getUserId());

//		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));

        newUser.setPassword(bcryptEncoder.encode("gdgsg"));
        return userRepo.save(newUser);


    }

    @Override
    public void sendEmail2(String email1, Long userId, Long checknumber) {
        // TODO Auto-generated method stu

        String from = "demo3@gmail.com";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(email1);
        message.setSubject("please verify email");


        message.setText("http://localhost:4200/#/about-work/" + userId + "/" + checknumber);


        javaMailSender.send(message);
    }

    @Override
    public void sendEmail3(String email2, Long userId, Long checknumber) {
        // TODO Auto-generated method stub

        String from = "demo3@gmail.com";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(email2);
        message.setSubject("please verify email");


        message.setText("http://localhost:4200/#/about-work/" + userId + "/" + checknumber);


        javaMailSender.send(message);

    }

    @Override
    public void sendEmail4(String email3, Long userId, Long checknumber) {
        // TODO Auto-generated method stub

        String from = "demo3@gmail.com";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(email3);
        message.setSubject("please verify email");


        message.setText("http://localhost:4200/#/about-work/" + userId + "/" + checknumber);


        javaMailSender.send(message);
    }

    @Override
    public void sendEmail5(String email4, Long userId, Long checknumber) {
        // TODO Auto-generated method stub

        String from = "demo3@gmail.com";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(email4);
        message.setSubject("please verify email");


        message.setText("http://localhost:4200/#/about-work/" + userId + "/" + checknumber);


        javaMailSender.send(message);

    }

//	@Override
//	public boolean exitbychecknumber(Long userId, Long checknumber) {
//		// TODO Auto-generated method stub
//		
//		User user=userRepo.exitbychecknumber(userId, checknumber);
//		
//		if(user==null){
//			return false;
//		}
//		return true;
//		
//	}

    @Override
    public User exitbychecknumber(Long userId, Long checknumber) {
        // TODO Auto-generated method stub

        User user = userRepo.exitbychecknumber(userId, checknumber);

        return user;

    }

    @Override
    public User save(User user) {
        User u = userRepo.save(user);
        return u;
    }
    public void processOAuthPostLogin(String username, String name) {
        User existUser = userRepo.getUserByUsername(username);
         
        if (existUser == null) {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setFullName(name);
            
            newUser.setProvider(Provider.GOOGLE);
            newUser.setEnabled(true);          
            newUser.setEmail(username);
            userRepo.save(newUser);        
        }
         
    }

}

