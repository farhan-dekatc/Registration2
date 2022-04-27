package com.services.registration.users.entity;

import lombok.Data;

@Data
public class PasswordResetRequest {
	private String oldPassword;
	private String newPassword;
}
