import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss"

import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [ formFields, setFormFields ] = useState(defaultFormFields)

    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Wrong password')
                    break;
                case 'auth/user-not-found':
                    alert('User not found')
                    break;
                default:
                    console.log(error)
                    break;
            }
        }
    }

    const signInWithGoole = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account</h2>
            <span>Sign in with you email and password</span>

            <form onSubmit={handleSubmit}>

                <FormInput 
                label= "Email"
                onChange={handleChange}
                type="email" 
                required 
                name="email" 
                />

                <FormInput 
                label= "Password"
                onChange={handleChange}
                type="password" 
                required 
                name="password" 
                />

                <div className="buttons-container">
                <Button 
                type="submit">Sign In</Button>

                <Button type='button' onClick={signInWithGoole}
            buttonType='google'>
                Sign in with Google Popup
            </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;