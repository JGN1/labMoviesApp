import '../../index.css'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://lskyozzebbtzitvyfbgx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxza3lvenplYmJ0eml0dnlmYmd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwNTk4NjcsImV4cCI6MTk5NjYzNTg2N30.soujvBS__llR84_VQwxB_gpeYvbyWnnyRgRp3RAyOco')


const MovieAuth = (props) => {

    return (
        <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'facebook', 'twitter']}
        />
    )
};

export default MovieAuth;


