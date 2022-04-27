package com.services.registration.fnd.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class ErrorPojo implements Serializable {

	private static final long serialVersionUID = 1L;

	private Error error;
	
	public ErrorPojo() {
		
	}
	
	public ErrorPojo(Error error) {
		this.error = error;
	}

    public Error getError ()
    {
        return error;
    }

    public void setError (Error error)
    {
        this.error = error;
    }

    @Override
    public String toString()
    {
        return "ClassPojo [error = "+error+"]";
    }
}
		
