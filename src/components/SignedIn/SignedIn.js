import React from 'react'
import useStore from '../Context'

export default function SignedIn({ children }) {
  const { userId } = useStore()

  return <div>{userId && children}</div>
}
