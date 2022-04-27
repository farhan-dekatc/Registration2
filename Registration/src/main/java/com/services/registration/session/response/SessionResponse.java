package com.services.registration.session.response;

import com.services.registration.response.OperationResponse;
import com.services.registration.session.entity.SessionItem;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class SessionResponse extends OperationResponse {
    @ApiModelProperty(required = true, value = "")
    private SessionItem item;
}
