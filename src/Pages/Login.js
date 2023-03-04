import React from 'react';
import {createClient } from '@supabase/supabase-js';
import {Auth}  from '@supabase/auth-ui-react';
import {ThemeSupa} from '@supabase/auth-ui-shared'
  
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
    'https://tqfruvglcoupvuwfhpzo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZnJ1dmdsY291cHZ1d2ZocHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM1MTI4NDEsImV4cCI6MTk4OTA4ODg0MX0.Nmcl1EOPJZcEG-UB8SPEkun577RTWLhkscfG7j5GX64'
);

const Login = () => {
    const navigate = useNavigate();
    supabase.auth.onAuthStateChange(async (event) => {
        if (event !== "SIGNED OUT") {
            navigate("/success")
        } else {
            navigate("/")
        }
    })

  return (
    <>
      <h1>Sign in</h1>
      <Auth 
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa}}
        theme='light'
      />
    </>
  );
}

export default Login