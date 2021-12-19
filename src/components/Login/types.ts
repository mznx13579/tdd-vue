export interface LoginForm {
  user_id: string;
  user_password: string;
  security_level: string;
}

export interface ChangePasswordForm {
  old: string;
  new: string;
  new_confirm: string;
}
