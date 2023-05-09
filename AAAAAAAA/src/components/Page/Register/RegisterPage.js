import {
    IconRegister,
    RegisterBox,
    RegisterContainer,
    RegisterHref,
    RegisterImage,
    RegisterRight,
    TitleRegister
} from "./RegisterElements";
import RegisterForm from "../../RegisterForm/RegisterForm";

const LoginPage = () => {
    return (
        <>
            <RegisterBox>
                <RegisterContainer>
                    <RegisterImage />
                    <RegisterRight>
                        <TitleRegister>Rejestracja</TitleRegister>
                        <RegisterForm />
                        <RegisterHref to='/login'>
                            <IconRegister /> Zaloguj się!
                        </RegisterHref>
                    </RegisterRight>
                </RegisterContainer>
            </RegisterBox>
        </>
    );
}

export default LoginPage;