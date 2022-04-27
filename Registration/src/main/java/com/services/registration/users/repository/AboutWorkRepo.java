package com.services.registration.users.repository;

import com.services.registration.session.entity.AboutWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AboutWorkRepo  extends JpaRepository<AboutWork,Long>{

	

	

//	Optional<AboutWork> findById(Long id);
	
	

}
