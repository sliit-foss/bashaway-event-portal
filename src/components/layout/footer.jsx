import { useNavigate } from 'react-router-dom'
import { Divider } from '../common'

const Footer = () => {
  const socialLinks = [
    {
      icon: 'fb',
      url: 'https://www.facebook.com/sliitfoss',
    },
    {
      icon: 'insta',
      url: 'https://www.instagram.com/sliitfoss/',
    },
    {
      icon: 'linkedin',
      url: 'https://www.linkedin.com/company/sliit-foss-community/?originalSubdomain=lk',
    },
    {
      icon: 'twitter',
      url: 'https://twitter.com/fosssliit?lang=en',
    },
    {
      icon: 'youtube',
      url: 'https://www.youtube.com/channel/UCPPO-QR0Dv13ewjhPsc_I3w/featured',
    },
  ]

  const usefulLinks = [
    {
      name: 'Register',
      url: '/register',
      target: '_self',
    },
    {
      name: 'Competition',
      url: '/',
      target: '_self',
    },
    {
      name: 'Code of Conduct',
      url: 'https://sliitfoss.org/code-conduct',
      target: '_blank',
    },
    // {
    //     name: 'Source Code',
    //     url: 'https://github.com/sliit-foss/bashaway-landing'
    // },
  ]

  const navigate = useNavigate()

  return (
    <>
      <Divider />
      <div className="flex flex-col justify-between p-10 bg-transparent md:flex-row md:p-12 relative z-[2]" id="footer">
        <div className="flex justify-center w-full pl-0 md:pl-24 md:justify-start">
          <a href="https://sliitfoss.org" target="_blank" rel="noreferrer">
            <img src="/assets/images/foss_light.svg" className="w-28 h-28" />
          </a>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-6 md:justify-start md:items-center">
          <h1 className="mb-8 text-2xl font-semibold text-white">Contact</h1>
          <a className="mb-8 text-nav-links-unselected hover:text-primary transition duration-300" href="mailto:sllitfoss@gmail.com" target="_blank" rel="noreferrer">
            sllitfoss@gmail.com
          </a>
          <div className="flex justify-start mb-8">
            {socialLinks.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                <img src={`/assets/images/social/${link.icon}.svg`} className="w-5 h-5 mx-2 fill-current hover:brightness-200 transition duration-300"></img>
              </a>
            ))}
          </div>
          <h1 className="mb-4 text-2xl font-semibold text-white">Visit Us On</h1>
          <a className="mb-2 text-nav-links-unselected hover:text-primary transition duration-300" href="https://sliitfoss.org" target="_blank" rel="noreferrer">
            sllitfoss.org
          </a>
        </div>
        <div className="flex flex-col items-center justify-end w-full mt-6 md:justify-start md:items-end md:pr-24">
          <h1 className="mb-6 text-2xl font-semibold text-white">Useful Links</h1>
          {usefulLinks.map((link) => (
            <a
              className="mb-3 text-nav-links-unselected hover:text-primary cursor-pointer transition duration-300"
              key={link.url}
              onClick={() => {
                if (link.target === '_blank') {
                  window.open(link.url, link.target)
                } else {
                  navigate(link.url)
                }
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      <Divider />
      <div className="flex flex-col justify-start px-10 pt-5 pb-6 bg-black md:flex-row md:justify-between text-nav-links-unselected md:px-24">
        <span className="text-center md:text-left">Copyright © 2022 SLIIT FOSS Community</span>
        <div className="flex items-center justify-center mt-4 md:justify-start md:mt-0">
          <span className="mr-8">Visit us On</span>
          <a href="https://github.com/sliit-foss" target="_blank" rel="noreferrer">
            <img src={`/assets/images/social/github.svg`} className="w-5 h-5 mb-0.5 hover:brightness-200 transition duration-300"></img>
          </a>
        </div>
      </div>
    </>
  )
}

export default Footer