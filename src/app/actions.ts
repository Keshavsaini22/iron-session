"use server"

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SessionData, defaultSession, sessionOptions } from "./lib";

// ADD THE GETSESSION ACTION
export async function getSession() {
    try {
        const session = await getIronSession<SessionData>(cookies(), sessionOptions);

        // If user visits for the first time session returns an empty object.
        // Let's add the isLoggedIn property to this object and its value will be the default value which is false
        if (!session.isLoggedIn) {
            session.isLoggedIn = defaultSession.isLoggedIn;
        }

        return session;
    } catch (error) {
        console.log('error: ', error);

    }
}


export async function login(
    // THIS IS THE PARAMETER THAT WE NEED TO ADD
    prevState: { error: undefined | string },
    formData: FormData
) {
    try {
        const session = await getSession();

        const formUsername = formData.get("username") as string;
        const formPassword = formData.get("password") as string;

        const user = {
            id: 1,
            username: formUsername,
            img: "avatar.png"
        }

        if (!user.username) {
            // IF THERE IS AN ERROR THE STATE WILL BE UPDATED
            return { error: "Wrong Credentials!" }
        }

        session!.isLoggedIn = true;
        session!.userId = user.id;
        session!.username = user.username;

        await session!.save();
        redirect("/")
    } catch (error) {
        console.log('error: ', error);
    }
}

export async function logout() {
    try {
        const session = await getSession();
        session!.destroy();
        // redirect("/login")
    } catch (error) {
        console.log('error: ', error);
    }
}