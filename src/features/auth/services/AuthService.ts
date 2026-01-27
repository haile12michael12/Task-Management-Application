import { supabase } from '@/integrations/supabase/client';
import { User, AuthCredentials, RegisterCredentials, AuthResponse } from '../types/auth.types';

class AuthServiceImpl {
  private supabase = supabase;

  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const { email, password } = credentials;
    
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Login failed: No user returned');
    }

    const user = await this.formatUser(data.user);
    const token = data.session?.access_token || '';

    return { user, token };
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const { email, password, name } = credentials;
    
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Registration failed: No user returned');
    }

    const user = await this.formatUser(data.user);
    const token = data.session?.access_token || '';

    return { user, token };
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    
    if (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await this.supabase.auth.getUser();
    
    if (!user) {
      return null;
    }

    return this.formatUser(user);
  }

  async refreshToken(): Promise<string> {
    const { data, error } = await this.supabase.auth.refreshSession();
    
    if (error) {
      throw new Error(error.message);
    }

    return data.session?.access_token || '';
  }

  private async formatUser(supabaseUser: any): Promise<User> {
    // Check if user profile exists in the database
    const { data: profile, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    let user: User;

    if (error || !profile) {
      // Create profile if it doesn't exist
      const { data: newProfile, error: profileError } = await this.supabase
        .from('profiles')
        .insert({
          id: supabaseUser.id,
          email: supabaseUser.email,
          name: supabaseUser.user_metadata?.name || supabaseUser.email.split('@')[0],
        })
        .select()
        .single();

      if (profileError) {
        console.error('Error creating profile:', profileError);
        // Use fallback data
        user = {
          id: supabaseUser.id,
          email: supabaseUser.email,
          name: supabaseUser.user_metadata?.name || supabaseUser.email.split('@')[0],
          createdAt: supabaseUser.created_at,
          updatedAt: new Date().toISOString(),
        };
      } else {
        user = {
          id: newProfile.id,
          email: newProfile.email,
          name: newProfile.name,
          createdAt: newProfile.created_at,
          updatedAt: newProfile.updated_at,
        };
      }
    } else {
      user = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
      };
    }

    return user;
  }
}

export const authService = new AuthServiceImpl();