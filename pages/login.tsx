import { useState, useCallback } from 'react';
import { GetServerSideProps } from 'next'
import { signIn, providers, SessionProvider } from 'next-auth/client'
import Link from 'next/link';
import Head from 'next/head';

import style from './login.module.scss';
import { Layout, InputTextField, InputCheckbox, ClassicButton, LineButton } from '../components';
import { getTopBarMenu } from '../lib/menu';

const acceptedProviders = ['google', 'line', 'github', 'email']


export default function Login({ providers, menuItems }) {

  const [rememberMe, setRememberMe] = useState(false),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [errors, setErrors] = useState({});

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  }

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail])

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword])

  const handleSubmit = (event) => {

    event.preventDefault();

    let errors = {};
    let isValid = true;

    if (!email) {
      isValid = false;
      errors["email"] = "Please enter an email address.";
    } else {
      if (typeof email !== undefined) {
        let regexPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!regexPattern.test(email)) {
          isValid = false;
          errors["email"] = "Please enter a valid email address.";
        }
      }
    }

    if (!password) {
      isValid = false;
      errors["password"] = "Please enter a password.";
    } else if (password.length < 8) {
      isValid = false;
      errors["password"] = "Password must be at least 8-characters long.";
    }


    setErrors(errors);

    if (isValid) {
      // if (rememberMe) { signIn(); } else { signIn(); } //TODO
      signIn(providers.credentials.id, { email, password });
    }
  }

  return (
    <Layout menuItems={menuItems}>
      <Head>
        <title>Login</title>
      </Head>
      <div className={style.login_wrapper}>
        <div className={style.connections_container}>
          <div className={style.title}>
            LOGIN
          </div>
          <div className={style.form}>
            <form onSubmit={handleSubmit} autoComplete="on">
              <div className={style.form_group}>
                <InputTextField name="Email" value={email} onChange={inputEmail} />
                <div className={style.form_error_field}>
                  {errors["email"]}
                </div>
              </div>
              <div className={style.form_group}>
                <InputTextField name="Password" value={password} onChange={inputPassword} type="password" />
                <div className={style.form_error_field}>
                  {errors["password"]}
                </div>
              </div>
              <div className={style.form_group}>
                <InputCheckbox state={rememberMe} onChange={handleRememberMe} />
              </div>
              <div className={style.button_container}>
                <ClassicButton className={style.login_button} type="submit" width="70%">Login</ClassicButton>
              </div>
            </form>
          </div>
          <div className={style.login_alternatives}>
            Or login with
              <div className={style.other_providers}>
              {
                providers !== null && Object.values(providers).map((provider: SessionProvider) => (
                  acceptedProviders.includes(provider.id) &&
                  <ClassicButton className={style.provider} onClick={() => signIn(provider.id)} width="47%" key={provider.name}>
                    {provider.name}
                  </ClassicButton>
                ))
              }
            </div>
          </div>
          <div className={style.sign_up}>
            Not registered yet ?
              {' '}
            <Link href="/signUp">
              <span className="global_link">Sign up now !</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      providers: await providers(),
      menuItems: await getTopBarMenu()
    }
  }
}