import Carousel from '@/components/Carousel'
import GetStarted from '@/components/3D Scenes/GetStarted'
import Products from '@/components/Products'
import { product, slide } from '@/types'
import { sanityFetch } from '@/lib/sanity'
import Newsletter from '@/components/Newsletter'

export default async function Home() {
  const slides: slide[] = await sanityFetch('*[_type == "slide"]')
  const products: product[] = await sanityFetch('*[_type == "product"]')

  return (
    <>
      <Carousel slides={slides} />
      <GetStarted />
      <Products products={products} />
      <Newsletter />
    </>
  )
}
