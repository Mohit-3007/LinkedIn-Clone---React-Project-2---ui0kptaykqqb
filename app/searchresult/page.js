import React from 'react'
import notFound from '@/public/notfound.png'
import Image from 'next/image';
import Footer from '../components/Footer';
import AsidePremium from '../components/AsidePremium';



const searchResult = () => {
    const { handleSearchInput, isInputSlct } = useContextProvider()

  return (
    <div className='w-full bg-[#F4F2EE] pt-[3.25rem] z-10 relative h-fit'>
        <div className='w-[calc(100vw-17px)] h-full'>
            {/*  */}
            <section className='w-full h-[56px] py-3 fixed top-[52px] bg-white shadow-md shadow-[#A7A6A3]'>
                <div className='w-full h-full'></div>
            </section>

            {/*  */}
            <div className='res-768:w-[720px] res-768:mx-[calc((100%-720px)/2)] res-992:w-[960px] res-992:mx-[calc((100%-960px)/2)] res-1200:w-[1128px]
                 res-1200:mx-[calc((100%-1128px)/2)] h-fit mt-20 flex flex-col'>

                {/* main conatiner */}
                <div className='w-full h-full flex flex-col items-center mb-6 res-768:flex-row res-768:justify-between res-768:items-start'>
                    {/* main */}
                    <main className='w-[576px] res-768:w-[396px] res-992:w-[636px] res-1200:w-[50.25rem] mb-3 res-768:mb-0 h-fit flex 
                        flex-col bg-white rounded-md shadow-lg outline outline-1 outline-[#E8E8E8]'>
                        <div className='w-full h-full'>
                            {/* h1 hidden */}
                            {/* conatiner */}
                            <div className='w-full h-[360px]'>
                                <section className='w-full h-full flex flex-col items-center '>

                                    <div className='w-[290px] h-[248px] flex flex-col'>
                                        {/* bg image */}
                                        <div className='w-full h-[160px] flex justify-center items-center'>
                                            <Image src={notFound} alt='bg-pic' height={160} width={160} className='w-[160px] h-full' />
                                        </div>
                                        <div className='w-full h-8 mb-2 test-[#191919] font-semibold text-2xl text-center'>No results found</div>
                                        <p className='w-full h-6 mt-2 mb-6 text-sm text-[#666666] text-center'>try shortening or rephrasing your search.</p>
                                    </div>
                                    
                                    <button className='w-fit h-8 rounded-3xl outline outline-1 hover:outline-2 outline-[#434343] 
                                        flex items-center justify-center font-semibold text-base text-[#666666] hover:bg-[#E8E8E8] px-4 py-1.5'>
                                        Edit search
                                    </button>

                                </section>
                            </div>
                        </div>
                    </main>
                    {/* aside */}
                    <aside className='w-[576px] res-768:w-[18.75rem] h-fit bg-white rounded-md shadow-lg outline outline-1 outline-[#E8E8E8]'>
                     <AsidePremium />
                    </aside>
                </div>

                {/* footer conatiner */}
                <Footer />

            </div>
        </div>
    </div>
  )
}

export default searchResult