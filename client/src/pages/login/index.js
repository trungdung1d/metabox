import { Formik, Form } from "formik"
import { Link } from "react-router-dom"
import './style.css'
export default function Login() {
    return (
        <div class="login">
            <div class="login_wrapper">
                <h2>Login</h2>
                <Formik>
                    {(formik) => (
                        <Form>
                            <div class="input-field">
                                <input type="text" required />
                                <label>Enter your email</label>
                            </div>
                            <div class="input-field">
                                <input type="password" required />
                                <label>Enter your password</label>
                            </div>                         
                        </Form>
                    )}
                </Formik>
                <div class="forget">
                    <label for="remember">
                        <input type="checkbox" id="remember" />
                        <p>Remember me</p>
                    </label>
                    <Link to="/forgot" class="forgot_password">Forgot password?</Link>
                </div>
                <button type="submit" class="login_btn">Log In</button>
                <div class="register">
                    <p>Don't have an account? 
                        <button class="register_btn">Register</button>
                    </p>
                </div>
            </div>
        </div>
    )
}