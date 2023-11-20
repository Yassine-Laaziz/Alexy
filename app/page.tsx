import Carousel from '@/components/Carousel'
import GetStarted from '@/components/GetStarted'
import Products from '@/components/Products'
import { product, slide } from '@/types'
import { sanityFetch } from '@/lib/sanity'

export default async function Home() {
  const slides: slide[] = await sanityFetch('*[_type == "slide"]')
  const products: product[] = await sanityFetch('*[_type == "product"]')

  return (
    <>
      <Carousel slides={slides} />
      <GetStarted />
      <Products products={products} />
    </>
  )
}
