'use client'
import React, { useRef } from 'react' // Removed useLayoutEffect as GSAP animations are removed
import './landing.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const Landing = () => {
  useGSAP(() => {
    gsap.fromTo('.leading-tight', { x: -500, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' })
    gsap.fromTo('.description', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
    gsap.fromTo(
      '.landing-bottom-right',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.2 },
    )

    gsap.fromTo('.goto-shop-button', { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: 'power4.out' })

    gsap.to('.goto-shop-icon', {
      x: 5,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: 'power1.inOut',
    })
  }, [])

  return (
    <div class='min-h-screen flex flex-col body-element landing-page'>
      <header class='flex justify-between items-center p-6 md:p-8 lg:p-10 z-10 relative'>
        <div class='flex items-center space-x-2'>
          <svg class='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
            <path d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z'></path>
          </svg>
          <span class='font-semibold text-lg'>audio pro</span>
        </div>
        <button class='block lg:hidden focus:outline-none'>
          <svg
            class='w-8 h-8 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16m-7 6h7'></path>
          </svg>
        </button>
        <nav class='hidden lg:flex space-x-8'>
          <a href='#' class='text-white hover:text-gray-300'>
            Home
          </a>
          <a href='#' class='text-white hover:text-gray-300'>
            Products
          </a>
          <a href='#' class='text-white hover:text-gray-300'>
            About
          </a>
          <a href='#' class='text-white hover:text-gray-300'>
            Contact
          </a>
        </nav>
      </header>

      <main class='flex-grow relative overflow-hidden flex items-end justify-center min-h-[calc(100vh-120px)]'>
        <video class='background-video absolute inset-0 w-full h-full object-cover' autoplay loop muted playsinline>
          <source src='https://www.w3schools.com/html/mov_bbb.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        <div class='absolute inset-0 bg-black opacity-30 z-0'></div>

        <div class='container mx-auto px-6 py-8 md:px-8 md:py-12 lg:px-10 lg:py-16 relative z-10'>
          <div class='grid grid-cols-1 lg:grid-cols-3 gap-8 items-center lg:items-start'>
            <div class='lg:col-span-2 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1'>
              <h1 class='text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4'>
                THE HOME SPEAKER MADE TO IMPRESS
              </h1>
              <p class='text-base md:text-lg mb-8 max-w-lg mx-auto lg:mx-0 description'>
                Captivating no matter where you place it, this powerful home speaker sounds as beautiful as it looks.
              </p>
              <div class='flex justify-center lg:justify-start'>
                <button
                  class='bg-white text-blue-900 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 flex items-center space-x-2 goto-shop-button'
                  className='goto-shop-button'
                >
                  <span>GO TO SHOP</span>
                  <svg
                    class='w-5 h-5 goto-shop-icon'
                    className='goto-shop-icon'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M17 8l4 4m0 0l-4 4m4-4H3'
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class='lg:col-span-1 flex flex-col justify-between items-center lg:items-end text-center lg:text-right space-y-8 order-3 lg:order-3'>
              <div class='flex flex-col items-center lg:items-end space-y-4 landing-bottom-right'>
                <div class='flex items-center space-x-4'>
                  <div class='relative w-40 h-24 md:w-48 md:h-28 rounded-lg overflow-hidden video-thumbnail flex items-center justify-center'>
                    <button class='absolute bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition duration-300'>
                      <svg class='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                        <path
                          fill-rule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <span class='text-lg font-medium'>
                    Discover
                    <br />
                    Full Video
                  </span>
                </div>
              </div>

              <p class='text-base md:text-lg max-w-sm mx-auto lg:mx-0 landing-bottom-right'>
                Applying our Acoustic Lens Technology into the conical speaker body creates a 360-degree sound
                experience.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* <footer class='p-6 md:p-8 lg:p-10 text-center lg:text-right text-sm text-gray-400 relative z-10'>
        SCROLL DOWN TO EXPLORE
      </footer> */}
    </div>
  )
}

export default Landing
