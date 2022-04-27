package com.services.registration.fnd.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Error implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String message;

    private String title;

    public String getMessage ()
    {
        return message;
    }

    public void setMessage (String message)
    {
        this.message = message;
    }

    public String getTitle ()
    {
        return title;
    }

    public void setTitle (String title)
    {
        this.title = title;
    }

    @Override
    public String toString()
    {
        return "ClassPojo [message = "+message+", title = "+title+"]";
    }
}