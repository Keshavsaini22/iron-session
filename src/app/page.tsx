import { Box } from '@mui/material'
import React from 'react'
import { logout } from './actions'

function page() {
  return (
    <>
      <Box >Hiiii</Box>
      <form action={logout}>
        <button>Logout</button>
      </form>
    </>
  )
}

export default page