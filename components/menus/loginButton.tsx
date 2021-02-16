import { useRouter } from 'next/router';

import style from './loginButton.module.scss';

export default function LoginButton() {

    const router = useRouter();

    return (
        <button className={style.login_button} onClick={() => router.push("/login")}>
            LOGIN
        </button>
    );
}