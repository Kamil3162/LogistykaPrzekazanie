import {IconRegister, LoginBox, LoginContainer, LoginImage, LoginRight, RegisterHref, TitleLogin} from './LoginElements'
import LoginForm from "../../LoginForm/LoginForm";
const LoginPage = () => {
    return (
        <>
            <LoginBox>
                <LoginContainer>
                    <LoginImage />
                    <LoginRight>
                        <TitleLogin>Login</TitleLogin>
                        <LoginForm />
                        <RegisterHref to='/register'>
                            <IconRegister /> Stwórz konto
                        </RegisterHref>
                    </LoginRight>
                </LoginContainer>
            </LoginBox>
        </>
    );
}

export default LoginPage;