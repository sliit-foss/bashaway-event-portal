import { Timer } from '../components/home'
import Layout from '../components/layout'

export default function Questions() {
  return (
    <Layout>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <span className="text-gray-light text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-12 font-semibold">Competition Starts In</span>
        <Timer />
      </div>
    </Layout>
  )
}
