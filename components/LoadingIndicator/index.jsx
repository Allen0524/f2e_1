import React from 'react'
import ReactDOM from 'react-dom'

function Index() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const sc = e => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
    window.addEventListener('wheel', sc, {passive: false})

    return () => {
      setMounted(false)
      window.removeEventListener('wheel', sc, {passive: false})
    }
  }, [])

  if (mounted) {
    return <LoadingIndicator />
  } else {
    return null
  }
}

function LoadingIndicator() {
  return (
    <div className=" absolute top-0 left-0 right-0 bottom-0 h-screen w-screen z-50">
      {/* <div className="absolute w-full h-full "></div> */}
      <div
        className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 inline-block 
          after:block
          after:w-14
          after:h-14
          after:m-2
          after:animate-spin
          after:rounded-full
          after:border-4
          after:border-t-transparent
          after:border-b-transparent
          after:border-l-pri
          after:border-r-pri"
      />
    </div>
  )
}

export default Index
