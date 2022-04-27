package com.services.registration.config;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.services.registration.logging.NoLogging;
import com.services.registration.users.service.CustomOAuth2User;
import com.services.registration.users.service.CustomOAuth2UserService;
import com.services.registration.users.service.UserServiceImpl;

/*
 * @EnableGlobalMethodSecurity annotation is what enables the @PreAuthorize annotation.
 * */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
//    @Autowired 
//    private Environment env;
    private final UserDetailsService userDetailsService;

    private final JwtAuthenticationEntryPoint unauthorizedHandler;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private CustomOAuth2UserService oauthUserService;
    private UserServiceImpl userService;
    public SecurityConfig(UserDetailsService userDetailsService, JwtAuthenticationEntryPoint unauthorizedHandler, BCryptPasswordEncoder bCryptPasswordEncoder,
    		CustomOAuth2UserService oauthUserService,
    		UserServiceImpl userService) {
        this.userDetailsService = userDetailsService;
        this.unauthorizedHandler = unauthorizedHandler;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.oauthUserService=oauthUserService;
        this.userService=userService;
    }


    /////

    public void configure12(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
    }


//	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//	        auth.authenticationProvider(userAuthenticationProvider);
//	    }
////	 
//	 
//	 
//	    protected void configure(HttpSecurity http) throws Exception {
//	        http
//	            .cors() // <-- This let it use "corsConfigurationSource" bean.
//	                .and()
//	            .authorizeRequests()
//	                .anyRequest().authenticated()
//	                .and()
//	            
//	    }

    @Bean
    protected CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));

        // NOTE: setAllowCredentials(true) is important,
        // otherwise, the value of the 'Access-Control-Allow-Origin' header in the response
        // must not be the wildcard '*' when the request's credentials mode is 'include'.
        configuration.setAllowCredentials(true);

        // NOTE: setAllowedHeaders is important!
        // Without it, OPTIONS preflight request will fail with 403 Invalid CORS request
        configuration.setAllowedHeaders(Arrays.asList(
                "Authorization",
                "Accept",
                "Cache-Control",
                "Content-Type",
                "Origin",
                "ajax", // <-- This is needed for jQuery's ajax request.
                "x-csrf-token",
                "x-requested-with"
        ));

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    protected void configure123(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/resources/**").permitAll()
              //  .antMatchers("/api/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .and()
                .httpBasic()
                .and()
                .cors();
    }

    //////


    @NoLogging
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @NoLogging
    @Autowired
    public void globalUserDetails(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @NoLogging
    @Bean
    public JwtAuthenticationFilter authenticationTokenFilterBean() throws Exception {
        return new JwtAuthenticationFilter();
    }

    @NoLogging
    @Override
    public void configure(WebSecurity web) throws Exception {
        // Filters will not get executed for the resources
        web.ignoring().antMatchers("/", "/resources/**", "/static/**", "/public/**", "/webui/**", "/h2-console/**",
                "/configuration/**", "/swagger-ui/**", "/swagger-resources/**", "/webjars/**", "/api-docs",
                "/api-docs/**", "/v2/api-docs/**", "/*.html", "/**/*.html", "/**/*.css", "/**/*.js", "/**/*.png",
                "/**/*.jpg", "/**/*.gif", "/**/*.svg", "/**/*.ico", "/**/*.ttf", "/**/*.woff", "/**/*.otf");
    }

    // If Security is not working check application.properties if it is set to
    // ignore
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		http.exceptionHandling().and().anonymous().and()
//				// Disable Cross site references
//				.csrf().disable()
//				// Add CORS Filter
//				.addFilterBefore(new CorsFilter(), ChannelProcessingFilter.class)
//				// Custom Token based authentication based on the header previously given to the
//				// client
//				.addFilterBefore(new VerifyTokenFilter(tokenUtil), UsernamePasswordAuthenticationFilter.class)
//				// custom JSON based authentication by POST of
//				// {"username":"<name>","password":"<password>"} which sets the token header
//				// upon authentication
//				.addFilterBefore(new GenerateTokenForUserFilter("/session", authenticationManager(), tokenUtil),
//						UsernamePasswordAuthenticationFilter.class)
//				.authorizeRequests()
//				//.antMatchers("/api/instructors/**").hasRole("ADMIN")
//				//.antMatchers("/api/customers/**").hasRole(role)
//				.anyRequest().authenticated();
//	}

    @NoLogging
    @Override
    protected void configure(HttpSecurity http) throws Exception {


//        http.csrf().disable().antMatcher("/**").authorizeRequests()
//                .antMatchers("/", "/index.html").authenticated()
//                .anyRequest().authenticated()
//                .and()
//                .oauth2Login().permitAll()
//                .and().
//                logout().logoutSuccessUrl("/");
//
//        http.authorizeRequests()
//                .anyRequest().authenticated()
//                .and()
//                .oauth2Login();

//        http.csrf().disable()
//                .addFilterBefore(new CorsFilter(), ChannelProcessingFilter.class)
//                .authorizeRequests()
//                .antMatchers("/token/**").permitAll()
//                .antMatchers("/welcome").permitAll()
//                .antMatchers("/auth/google/**").authenticated()
//                .anyRequest().authenticated()
//                .and().oauth2Login()
//                .and().exceptionHandling()
////                .authenticationEntryPoint(unauthorizedHandler)
//                .and().sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//        ;
//        http.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);

//
        http.csrf().disable()
                // Add CORS Filter //http.cors().and().csrf().disable().
                .addFilterBefore(new CorsFilter(), ChannelProcessingFilter.class).authorizeRequests()
                .antMatchers("/token/**").permitAll()
                .antMatchers("/api/**").permitAll()
                .antMatchers("/oauth/**").permitAll()
                .anyRequest().authenticated().and().exceptionHandling()
                .authenticationEntryPoint(unauthorizedHandler).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .oauth2Login()
                    .loginPage("/login")
                    .userInfoEndpoint()
                        .userService(oauthUserService)
        .and()
        .successHandler(new AuthenticationSuccessHandler() {
     
            @Override
            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                    Authentication authentication) throws IOException, ServletException {
     
                CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();
                String name = oauthUser.getAttribute("name");
                userService.processOAuthPostLogin(oauthUser.getEmail(),name);
     
                response.sendRedirect("http://localhost:4200/#/google1");
            }
        });
        http.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
    }

    /*
     * http.csrf().disable().exceptionHandling().authenticationEntryPoint(
     * unauthorizedHandler).and()
     * .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).
     * and().authorizeRequests() .antMatchers("/token/**",
     * "/signup").permitAll().antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
     * .anyRequest().authenticated();
     *
     * http.addFilterBefore(authenticationTokenFilterBean(),
     * UsernamePasswordAuthenticationFilter.class);
     */

    /*
     * If You want to store encoded password in your databases and authenticate user
     * based on encoded password then uncomment the below method and provde an
     * encoder
     */

//	@Bean
//	public CommonsMultipartResolver getCommonsMultipartResolver() {
//		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
//		multipartResolver.setMaxUploadSize(104857600); // 20MB(20971520 Byte) // 100 mb(104,857,600 Byte)
//		multipartResolver.setMaxInMemorySize(1048576); // 1MB
//		return multipartResolver;
//	}


//    @Bean
//    public DataSource dataSource() {
//        final DriverManagerDataSource dataSource = new DriverManagerDataSource();
//        dataSource.setDriverClassName(env.getProperty("driverClassName"));
//        dataSource.setUrl(env.getProperty("url"));
//        dataSource.setUsername(env.getProperty("user"));
//        dataSource.setPassword(env.getProperty("password"));
//        return (DataSource) dataSource;
//    }

}