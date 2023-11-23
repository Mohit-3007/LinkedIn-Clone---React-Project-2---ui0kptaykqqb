import Link from 'next/link';
import React from 'react'
import Image from 'next/image'
import Media from '../../public/media.png'
import Event from '../../public/event.png'
import Article from '../../public/article.png'
import getPosts from '../lib/getPosts';
import FeedPosts from '../components/FeedPosts';



const Feed = async () => {
  const data = await getPosts({limit:10, page:1})
  const res = data.data;
  console.log("RESULT  " ,res);   

  return (
    <div className="w-[calc(100vw-17px)] bg-[#F4F2EE] pt-[3.25rem]">
      <div className="w-full h-full">
        <div className="w-full h-full">
          <div className="w-[1128px] h-full mx-[calc((100%-1128px)/2)]">
            <div className="w-full h-full my-6 flex justify-between">

              {/* Left-Bar */}
              <div className="w-[14.0625rem] h-full">
                <div className="w-wull h-[43.5625rem] ">
                  {/* left-top */}
                  <div className="w-full h-[22.1875rem] bg-white mb-2 rounded-lg"></div>
                  {/* right-top */}
                  <div className="w-full h-[20.875rem] bg-white"></div>
                </div>
              </div>

              {/* Center-Bar */}
              <div className="w-[34.6875rem] h-full">
                {/* center-top */}
                <div className="w-full h-[7.25rem] bg-white rounded-lg mb-2">
                  <div className="w-full h-full ">
                    <div className="mx-4 w-[32.6875rem] h-14 flex">
                      <Link href={"#"} className="w-14 h-12">
                        <div className="w-12 h-12 mr-2">
                          {/* Profile Pic */}
                        </div>
                      </Link>
                      <button className="w-[29.1875rem] h-12 mt-1 py-2.5 pl-4 pr-2 border flex items-center rounded-[35px] hover:bg-[#EDEDED]">
                        <span className="w-fit h-[1.3125rem] text-sm text-[#868686] overflow-hidden">
                          Start a post
                        </span>
                      </button>
                    </div>

                    <div className="w-full h-[52px] mb-1 flex justify-around">
                      {/* Media */}
                      <button className="w-[98px] px-2 h-12 flex items-center hover:bg-[#EBEBEB] justify-start">
                        {/* png */}
                        <Image
                          src={Media}
                          alt="Picture of the user"
                          width="0"
                          height="0"
                          sizes="100vw"
                          className="w-full h-auto"
                        />       
                        <span className="ml-2 h-7 text-sm text-[#868686] flex items-center">
                          Media
                        </span>
                      </button>
                      {/* Event */}
                      <button className="w-[93px] px-2 h-12 flex items-center hover:bg-[#EBEBEB]">
                        {/* png */}
                        <Image
                          src={Event}
                          alt="Picture of the user"
                          width="0"
                          height="0"
                          sizes="100vw"
                          className="w-full h-auto"
                        />
                        <span className="ml-2 h-7 text-sm text-[#868686] flex items-center">
                          Event
                        </span>
                      </button>
                      {/* Write article */}
                      <button className="w-[136px] px-2 h-12 flex items-center hover:bg-[#EBEBEB]">
                        {/* png */}
                        <Image
                          src={Article}
                          alt="Picture of the user"
                          width="0"
                          height="0"
                          sizes="100vw"
                          className="w-full h-auto"
                        />
                        <span className="ml-2 w-[calc(100%-40px)]  h-7 text-sm text-[#868686] flex items-center">
                          Write article
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* center-break */}
                <div className="w-full h-4 mb-2">
                  <button className="w-full h-full flex items-center">
                    <div className="w-full h-[1px] bg-[#BFBDBA]"></div>
                  </button>
                </div>

                {/* center-bottom */}
                <div className="w-full">
                  {/* Posts */}
                  <div className="w-full h-full rounded-lg">

                    {/* Posts Map Function */}
                    <FeedPosts data={res} />
                
                  </div>

                  {/* Load More ??????????????? */}
                  <div className="w-full h-[72px]"></div>

                </div>
              </div>

              {/* Right-Bar */}
              <div className="w-[18.75rem] h-full"></div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;