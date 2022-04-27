package com.services.registration.session.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Accounts")
public class AboutWork {
	

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id ;
	private String name;
	
	private String password;
	private String mobile;
	private String email;
	private String companyname;
	private String pancard;
	private String working;
	private String managing_work;

}
