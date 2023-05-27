import User from '@/models/user';
import { connectToDB } from '@/utils/database';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';


const { GOOGLE_CLIENT_ID = '', GOOGLE_CLIENT_SECRET = '' } = process.env;

const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session( { session } ) {
            await connectToDB();

            const sessionUser = await User.findOne({
                email: session.user.email
            });

            session.user.id = sessionUser._id.toString();

            return session
        },
        async signIn( { profile } ) {
            try {
                await connectToDB();
                
                const userExists = await User.findOne({
                    email: profile.email
                });    

                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "")
                    });
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}

const handler = NextAuth(authOptions);


// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: GOOGLE_CLIENT_ID,
//             clientSecret: GOOGLE_CLIENT_SECRET
//         })
//     ],
//     callbacks: {
//         async session( { session } ) {
//             await connectToDB();

//             const sessionUser = await User.findOne({
//                 email: session.user.email
//             });

//             session.user.id = sessionUser._id.toString();

//             return session
//         },
//         async signIn( { profile } ) {
//             try {
//                 await connectToDB();
                
//                 const userExists = await User.findOne({
//                     email: profile.email
//                 });    

//                 if (!userExists) {
//                     await User.create({
//                         email: profile.email,
//                         username: profile.name.replace(" ", "")
//                     });
//                 }

//                 return true;
//             } catch (error) {
//                 console.log(error);
//                 return false;
//             }
//         }
//     }
// });

export { authOptions, handler as GET, handler as POST };