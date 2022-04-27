package com.services.registration.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
public class CustomResponse extends PageResponse {
	@ApiModelProperty(required = true, value = "")
	 private List<? extends Object> items;
	//private List<Object> items;
}
