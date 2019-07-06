import Index from './home/IndexContainer';
import Login from './login';
import SignUp from './sign-up';
import SignUpComplete from './sign-up-complete';
import Verify from './sign-up-complete/Verify';
import Contact from './contact';
import About from './about/indexContainer';
import Press from './press';
import Privacy from './privacy';
import Post from './post';
import Thank from './thank';
import ForgotPassword from './forgot-password';
import ResetPassword from './reset-password';
import ForgotSent from './forgot-sent';

export default {
  path: '',
  indexRoute: { component: Index },
  childRoutes: [
    { path: 'login', component: Login },
    { path: 'sign-up/verify(/:code)', component: Verify },
    { path: 'sign-up/complete', component: SignUpComplete },
    { path: 'sign-up(/:role)', component: SignUp },
    { path: 'forgot-password', component: ForgotPassword },
    { path: 'reset-password(/:token)', component: ResetPassword },
    { path: 'forgot-sent', component: ForgotSent },
    { path: 'contact', component: Contact },
    { path: 'about', component: About },
    { path: 'press', component: Press },
    { path: 'privacy-policy', component: Privacy },
    { path: 'post/:id', component: Post },
    { path: 'thank-you', component: Thank },
    SignUpComplete,
  ],
};
