package com.services.registration.users.service;

import com.services.registration.users.entity.CompanyDto;
import com.services.registration.users.entity.Sys_Accounts;

import java.util.List;

public interface CompanyService {
	// creating new company
	Sys_Accounts companyResister(CompanyDto company);

	public boolean insertOrSaveCompany(Sys_Accounts company);
	// company registration

	List<Sys_Accounts> getAll();

	public Sys_Accounts getById(Long id);

	void delete(long id);

}
