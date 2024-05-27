"use server"

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SessionData, defaultSession, sessionOptions } from "./lib";

// ADD THE GETSESSION ACTION
export async function getSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  
    // If user visits for the first time session returns an empty object.
    // Let's add the isLoggedIn property to this object and its value will be the default value which is false
    if (!session.isLoggedIn) {
      session.isLoggedIn = defaultSession.isLoggedIn;
    }
  
    return session;
  }
  

  export async function login(
    // THIS IS THE PARAMETER THAT WE NEED TO ADD
    prevState: { error: undefined | string },
    formData: FormData
  ) {
    const session = await getSession();
  
    const formUsername = formData.get("username") as string;
    const formPassword = formData.get("password") as string;
  
    const user = {
      id:1,
      username:formUsername,
      img:"avatar.png"
    }
  
    if(!user){
      // IF THERE IS AN ERROR THE STATE WILL BE UPDATED
      return { error: "Wrong Credentials!" }
    }
  
    session.isLoggedIn = true;
    session.userId = user.id;
    session.username = user.username;
  
    await session.save();
    redirect("/")
  }

  export async function logout() {
    const session = await getSession();
    session.destroy();
    redirect("/")
  }