import { supabase } from '../lib/supabase';

export async function signIn(phone: string, password: string) {
  return supabase.auth.signInWithPassword({
    phone,
    password
  });
}

export async function signUp(
  phone: string, 
  password: string, 
  firstName: string, 
  lastName: string
) {
  return supabase.auth.signUp({
    phone,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName
      }
    }
  });
}

export async function createCustomerProfile(
  userId: string,
  phone: string,
  firstName: string,
  lastName: string
) {
  return supabase.from('customers').insert({
    id: userId,
    phone,
    first_name: firstName,
    last_name: lastName,
    auth_id: userId
  });
}