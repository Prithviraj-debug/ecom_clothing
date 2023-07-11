import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;
    
    const { setCurrentUser } = useContext(UserContext);
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);   
    }
    console.log(formFields)

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            setCurrentUser(user);
            resetFormFields();
            console.log(user)
        } catch (error) {

            if(error.code === 'auth/email-already-in-use') {   
                alert('Email already in use');
                return;
            } else {
                console.log(error);
            }
        }

        resetFormFields();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign Up with you email and password</span>

            <form onSubmit={handleSubmit}>

                <FormInput 
                label= "Display Name"
                type="text" 
                required 
                onChange={handleChange}
                name="displayName" 
                value={displayName} 
                />

                <FormInput 
                label= "Email"
                type="email" 
                required 
                onChange={handleChange}
                name="email" 
                value={email}
                />

                <FormInput 
                label= "Password"
                type="password" 
                required 
                onChange={handleChange}
                name="password" 
                value={password}
                />

                <FormInput 
                label= "Confirm Password"
                type="password" 
                required 
                onChange={handleChange}
                name="confirmPassword" 
                value={confirmPassword}
                />
        
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;