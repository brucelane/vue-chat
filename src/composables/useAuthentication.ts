import { userCollection, auth } from '@/firebase';
import { useRouter } from 'vue-router';

export function useAuthentication() {
  const router = useRouter();
  const updateUser = (user: { id: string; name: string }) => {
    return userCollection.doc(user.id).set(user);
  };

  const goToHome = () => {
    router.push('/home');
  };

  function loginWithEmail(name: string, email: string, password: string) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (!auth.user) {
          console.warn('login unsuccessful');
          return;
        }
        return updateUser({
          id: auth.user.uid,
          name,
        });
      })
      .then(goToHome)
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  function signupWithEmail(name: string, email: string, password: string) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (!auth.user) {
          console.warn('signup unsuccessful');
          return;
        }
        return updateUser({
          id: auth.user.uid,
          name,
        });
      })
      .then(goToHome)
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  function logout() {
    auth.signOut().then(() => router.push('/auth'));
  }

  return { loginWithEmail, signupWithEmail, logout };
}
