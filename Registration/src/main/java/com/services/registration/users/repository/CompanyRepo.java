package com.services.registration.users.repository;

import com.services.registration.users.entity.Sys_Accounts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepo extends JpaRepository<Sys_Accounts, Long> {
	Sys_Accounts findByCompanyName(String company_name);

}
