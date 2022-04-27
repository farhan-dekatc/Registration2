package com.services.registration.users.repository;

import com.services.registration.users.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
	User findByUsername(String username);

	User findByEmail(String email);

	Optional<User> findByUsernameAndPassword(String username, String password);
	// @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM User p WHERE p.email = :email")

	Boolean existsByEmail(String email);

	// need modification
	@Query(value = "SELECT * FROM user WHERE ACCOUNT_ID =:accId AND STATUS =:status", nativeQuery = true)
	List<User> findByAccountIdAndStatus(@Param("accId") Long id, @Param("status") String status, Pageable pageable);
	
	@Query(value = "delete from user_roles where users_id= :user_id", nativeQuery = true)
    void deleteRelation(@Param("user_id") Long user_id);

	
	@Query(value = "SELECT * FROM user WHERE user_id =:user_id AND checknumber =:checknumber", nativeQuery = true)
	User exitbychecknumber(@Param("user_id") Long user_id,@Param("checknumber") Long checknumber);
	 @Query("SELECT u FROM User u WHERE u.username = :username")
	 public User getUserByUsername(@Param("username") String username);
	// List<User> findByAccountIdAndStatus(Long id, String status);
	
//	@Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM User c WHERE c.name = :name")
//	Boolean existsByName(@Param("name") String name);
	
//	 User  findById(int acc_id);
	
//	public List<User> findAll();

}
