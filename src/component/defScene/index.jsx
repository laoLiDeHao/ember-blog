import { createRoot } from 'react-dom'
import { Suspense } from 'react'
import './style.scss'
import App from './App'


export default function DefScene(){
  return<Suspense fallback={null}>
    <App></App>
  </Suspense>
  
}