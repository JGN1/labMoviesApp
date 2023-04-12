import '../index.css'
import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import {
    // Import predefined theme
    ThemeSupa,
  } from '@supabase/auth-ui-shared'

// import React from 'react';
// import Auth from '../components/auth'
import HomePage from './hompage';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const HomePageAuth = (supabase1) => {
    // this.supabase = supabase;

    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const { error } = supabase.auth.signOut()

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log(event, session)
            console.log(`Supabase auth event: ${event}`);
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return (        
            <>
                <HomePage />
            </>
        )
        // return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
    }
    else {
        //   return (<div>Logged in!</div>)

        // const { error } = supabase.auth.signOut()
        // const { error } = await supabase.auth.signOut()
        return (
            <>
                <HomePage />
            </>
        )
    }
};
// 
// };

export default HomePageAuth;

