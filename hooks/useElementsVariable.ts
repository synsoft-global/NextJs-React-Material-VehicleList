import { useEffect } from 'react'
import { useReduxSelector } from './redux'
import { useRouter } from 'next/router'


export default function useElementsVariable() {
  const router = useRouter()
  const { loading, sidebar, sidebarDense, sidebarWidth } = useReduxSelector(state => state.layout)


  function updateScreenHeight() {
    document.documentElement.style.setProperty('--screen-height', `${window.innerHeight}px`)
    document.documentElement.style.setProperty('--header-height', `${(document.querySelector('#header') as HTMLElement)?.offsetHeight || 0}px`)
    document.documentElement.style.setProperty('--footer-height', `${(document.querySelector('#footer') as HTMLElement)?.offsetHeight || 0}px`)
  }


  useEffect(() => {
    window.addEventListener('resize', updateScreenHeight)
  }, [])


  useEffect(() => {
    updateScreenHeight()
    setTimeout(() => updateScreenHeight(), 200)
  }, [loading, sidebar, sidebarDense, sidebarWidth, router.route, router.isReady])
}
