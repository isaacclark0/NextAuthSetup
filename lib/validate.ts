export function login_val(values: any){
    const errors = {}
    if(!values.email){
        errors.email = 'Required'
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'Invalid Email Address'
    }

    if(!values.password){
        errors.password = 'Required'
    }  else if(values.password.includes(' ')){
        errors.password = 'Invalid Password'
    }

    return errors
}

export function register_val(values){
    const errors = {}
    if(!values.username){
        errors.username = 'Required'
    } else if(values.username.includes(' ')){
        errors.username = 'No Spaces in Username'
    }

    if(!values.email){
        errors.email = 'Required'
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'Invalid Email Address'
    }

    if(!values.password){
        errors.password = 'Required'
    } else if(values.password.length < 8){
        errors.password = 'Password must be greater than 8 characters long.'
    } else if(values.password.length > 20){
        errors.password = 'Password must be less than 20 characters long'
    } else if(values.password.includes(' ')){
        errors.password = 'Invalid Password, Contains a Space'
    } else if (!/^(?=.*[a-z]).*$/.test(values.password)) {
        errors.password = "Your password must contain at least one lowercase letter"
    } else if(!/^(?=.*[A-Z]).*$/.test(values.password)){
        errors.password = "Your password must contain at least one uppercase letter"
    }else if (values.password.search(/[0-9]/) < 0) {
        errors.password = "Your password must contain at least one number"
    } else if(!/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/i.test(values.password)){
        errors.password = "Your password must contain at least one special character.(!@#$%^&*)"
    }
    
    if(!values.confirmPassword){
        errors.confirmPassword = 'Required'
    } else if(values.password !== values.confirmPassword){
        errors.confirmPassword = 'Passwords do not match!'
    } else if(values.confirmPassword.includes(' ')){
        errors.confirmPassword = 'Invalid Confirm Password, contains a space.'
    }

    return errors
}