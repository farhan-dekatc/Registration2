package com.services.registration.users.service;

import com.services.registration.session.entity.AboutWork;
import com.services.registration.users.entity.Email;

public interface AboutWorkService {
    public AboutWork adddata(AboutWork data);

    public AboutWork updateById(Long id, AboutWork about);

    public AboutWork updateById2(Long id, AboutWork about);

    public AboutWork updateById3(Long id, AboutWork about);

    public AboutWork adddata(Email email);

//	public AboutWork adddata(Email email);

//	public AboutWork adddata(Email email);

//	public AboutWork updateById(Long id, @Valid AboutWork aboutWork);

//	User adddata(User data);

}
