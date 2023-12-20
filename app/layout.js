'use client'
import { useState, useEffect, Suspense } from 'react';
import { AlertGlobalContextProvider, useAlertContextProvider } from './ContextApi/AlertContextProvider';
import { GlobalContextProvider } from './ContextApi/AppContextProvider';
import NavBar from './_components/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Loading from './loading';
import TopBottomNav from './_components/MobileComponents/TopBottomNav';



const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const [hideScroll, setHideScroll] = useState(false)
  const [popUp, setPopUp] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const logWindowWidth = () => {
    setWindowWidth(window?.innerWidth);
  };
  // console.log("window.innerWidth ",windowWidth);
  useEffect(() => {
    logWindowWidth();
    window.addEventListener('resize', logWindowWidth);
    return () => {
      window.removeEventListener('resize', logWindowWidth);
    };
  }, []);

  useEffect( () => {

    if(popUp) setHideScroll(true)
    else setHideScroll(false)

  },[popUp])



  return (
    <html lang="en">
      <body className={"max-w-full w-screen relative overflow-x-hidden scrollbar-stable "
       + ( inter.className && (hideScroll ? 'overflow-y-hidden' : 'overflow-y-scroll' ) )}>
          
        <GlobalContextProvider>
          <AlertGlobalContextProvider>
            {( (pathname != '/signup')  && (pathname != '/') && (pathname != '/updatepassword') ) 
              && windowWidth > 620 && (
      
                  <NavBar popUp={popUp} setPopUp={setPopUp} />
    
              )}  

              {windowWidth <= 620 && (pathname != '/feed/overlay/post') && (pathname != '/searchresult/mobile-nav-search') && (
                < TopBottomNav />
              )} 
            {children}
          </AlertGlobalContextProvider>
        </GlobalContextProvider>
          
      </body>
    </html>
  )
}

