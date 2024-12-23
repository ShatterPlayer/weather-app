'use client'

import { useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useRouter } from 'next/navigation'

import EditLocationIcon from '@mui/icons-material/EditLocation'
import { ThemeProvider } from '@emotion/react'
import theme from '@/app/_utils/theme'

import styles from './ChangeLocalizationButton.module.css'

export default function ChangeLocalizationButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const redirectToStartPage = () => {
    setIsLoading(true)
    router.push('/')
  }

  return (
    <ThemeProvider theme={theme}>
      <LoadingButton
        className={styles.button}
        loading={isLoading}
        loadingPosition="start"
        startIcon={<EditLocationIcon />}
        variant="outlined"
        onClick={redirectToStartPage}
      >
        Zmień lokalizację
      </LoadingButton>
    </ThemeProvider>
  )
}
