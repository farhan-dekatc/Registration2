package com.services.registration.session.entity;

import lombok.Data;

@Data
public class SessionItem {
	private String token;
	private Long userId;
	private String fullname;
	private String username;
	private String email;
	private String firstName;
	//private List<String> roles;
	private String roles;
}
