package com.services.registration.users.response;

import lombok.Data;

@Data
public class UserItem {
	private Long userId;
	private String firstName;
	private String fullname;
	private String email;

}
