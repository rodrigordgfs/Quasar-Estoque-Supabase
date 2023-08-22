import { ref } from "vue";
import useSupabase from "../boot/supabase";

const user = ref(null);

export default function useAuth() {
  const { supabase } = useSupabase();

  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return user;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isLogged = () => {
    return !!user.value;
  };

  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data: meta,
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation}`,
      }
    );
    if (error) throw error;
    return user;
  };

  const updateProfile = async (profile) => {
    const { user, error } = await supabase.auth.update(profile);
    if (error) throw error;
    return user;
  };

  const sendResetPassword = async (email) => {
    const { user, error } = await supabase.auth.api.resetPasswordForEmail(
      email
    );
    if (error) throw error;
    return user;
  };

  return {
    login,
    loginWithSocialProvider,
    logout,
    isLogged,
    register,
    updateProfile,
    sendResetPassword,
  };
}
