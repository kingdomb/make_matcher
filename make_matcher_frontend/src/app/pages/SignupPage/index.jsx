/**
 *
 * SignupPage
 *
 */

import { SignupComponent } from 'app/components/SignupComponent/Loadable';
import React from 'react';

export function SignupPage() {
  return <SignupComponent />;

  // later can add more components, for example, to fill up a form for Player profile

  // const [signupSubmitted, setSignupSubmitted] = useState(false);

  // return signupSubmitted ? <ProfileFormComponent/> : <SignupComponent />;
}
