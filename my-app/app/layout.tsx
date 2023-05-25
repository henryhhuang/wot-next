import React from 'react'
import NavBar from '@/components/NavBar';
import Provider from '@/components/Provider';

export const metadata = {
    title: "Wot"
}

interface Props {
    children?: React.ReactNode;
}

const RootLayout: React.FC<Props> = ( {children} ) => {
  return (
    <html lang="en">
        <body>
            <Provider session={undefined}>
                <main className='app'>
                    <NavBar />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;