package com.services.registration.config;

import com.services.registration.logging.NoLogging;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    /*
     * This is invoked when user tries to access a secured REST resource without supplying any credentials
     * We should just send a 401 Unauthorized response because there is no 'login page' to redirect to
     * Here you can place any message you want
     * */
    @NoLogging
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
    }
}