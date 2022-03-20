import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import SmallCard from '../components/SmallCard/SmallCard'
import {getAuthorizationHeader} from '../api'
import {FireIcon, BeakerIcon, SparklesIcon} from '@heroicons/react/solid'
import Layout from '../components/Layout'
import Footer from '../components/Footer'

export default function Home({DesDatas, FoodDatas, ActivityDatas}) {
  return (
    <div className="">
      <Head>
        <title>TaiFun旅遊網</title>
        <link rel="icon" href="/taiwan.png" />
      </Head>
      <Layout>
        <main className="max-w-7xl mx-auto px-8 sm:px-16 bg-slightBlue">
          <section className="pt-6">
            <div className="relative flex justify-center items-center pb-5 text-pri">
              <h2 className="text-4xl font-semibold text-center pr-2">
                熱門景點
              </h2>
              <FireIcon className="h-8" />
            </div>
            <div className="grid grid-cols-1 gap-y-5 gap-x-8 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:flex flex-wrap justify-center">
              {DesDatas.map(data => {
                return (
                  <SmallCard
                    key={data.ScenicSpotID}
                    id={data.ScenicSpotID}
                    name={data.ScenicSpotName}
                    address={data.Address}
                    picture={data.Picture.PictureUrl1}
                    opentime={data.OpenTime}
                    category="popularScenicSpot"
                  />
                )
              })}
            </div>
            <div className="flex justify-center mt-10">
              <Link href="/popularScenicSpot">
                <a>
                  <button
                    aria-label="View More Popular Destination"
                    className="border-2 border-pri rounded-lg py-3 px-7 text-pri font-semibold mb-7"
                  >
                    看更多熱門景點
                  </button>
                </a>
              </Link>
            </div>
          </section>
          <section className="pt-6">
            <div className="relative flex justify-center items-center pb-5 text-pri">
              <h2 className="text-4xl font-semibold text-center pr-2">
                熱門美食
              </h2>
              <BeakerIcon className="h-8" />
            </div>
            <div className="grid grid-cols-1 gap-y-5 gap-x-8 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:flex flex-wrap justify-center">
              {FoodDatas.map(data => (
                <SmallCard
                  key={data.RestaurantID}
                  id={data.RestaurantID}
                  name={data.RestaurantName}
                  address={data.Address}
                  picture={data.Picture.PictureUrl1}
                  opentime={data.OpenTime}
                  category="popularRestaurant"
                />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Link href="/popularRestaurant">
                <a>
                  <button
                    aria-label="View More Popular Food"
                    className=" border-2 border-pri rounded-lg py-3 px-7 text-pri font-semibold mb-7"
                  >
                    看更多熱門美食
                  </button>
                </a>
              </Link>
            </div>
          </section>
          <section className="pt-6">
            <div className="relative flex justify-center items-center pb-5 text-pri">
              <h2 className="text-4xl font-semibold text-center pr-2">
                近期活動
              </h2>
              <SparklesIcon className="h-9" />
            </div>
            <div className="grid grid-cols-1 gap-y-5 gap-x-8 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:flex flex-wrap justify-center">
              {ActivityDatas.map(data => (
                <SmallCard
                  key={data.ActivityID}
                  id={data.ActivityID}
                  name={data.ActivityName}
                  address={data.Address}
                  picture={data.Picture.PictureUrl1}
                  opentime={data.OpenTime}
                  category="popularActivity"
                />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Link href="/popularActivity">
                <a>
                  <button
                    aria-label="View More Recent Activities"
                    className=" border-2 border-pri rounded-lg py-3 px-7 text-pri font-semibold mb-7"
                  >
                    看更多近期活動
                  </button>
                </a>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  const p1 = axios.get(
    'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=8&$format=JSON',
    {
      headers: getAuthorizationHeader(),
    },
  )
  const p2 = axios.get(
    'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=8&$format=JSON',
    {
      headers: getAuthorizationHeader(),
    },
  )
  const p3 = axios.get(
    'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$top=8&$format=JSON',
    {
      headers: getAuthorizationHeader(),
    },
  )
  const res = await Promise.all([p1, p2, p3])
  const DesDatas = res[0].data
  const FoodDatas = res[1].data
  const ActivityDatas = res[2].data

  return {
    props: {
      DesDatas,
      FoodDatas,
      ActivityDatas,
    },
  }
}
