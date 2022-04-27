package com.services.registration.users.response;

import com.services.registration.response.OperationResponse;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class UserResponse extends OperationResponse {
    @ApiModelProperty(required = true, value = "")
    private UserItem item;

}
