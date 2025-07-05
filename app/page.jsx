'use client'
import React, { useRef } from 'react' // Removed useLayoutEffect as GSAP animations are removed

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import Landing from './landing'

import ProductSection from './product'
const App = () => {
  const myProductData = {
    mainHeading: {
      buy: 'GET YOURS',
      elegant: 'NEW',
      speaker: 'GADGET',
    },
    description:
      'This amazing new gadget will revolutionize your daily routine with its cutting-edge features and sleek design.',
    shopButtonText: 'BUY NOW',
    shopButtonUrl: 'https://yourstore.com/new-gadget',
    speakerImageUrl: '/product/golden.png', // Custom image
    brandText: 'Tech Innovations',
  }

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.to('.star', {
      y: -2,
      yoyo: true,
      repeat: -1,
      ease: 'bounce.inOut',
      duration: 0.5,
      delay: 0.5,
    })

    gsap.to('.star', {
      rotation: 360,
      repeat: -1,
      ease: 'none',
      duration: 4,
      transformOrigin: '50% 50%',
      delay: 0.5,
    })

    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: '.crafting-section',
        start: 'top top',
        end: '+=300%', // more scroll distance = smoother feel
        scrub: true,
        pin: true,
        markers: true,
        onLeave: () => {
          gsap.to('.crafting', {
            // clearProps: 'all',

            ease: 'none',
            width: '95%',
          })

          gsap.to(
            '.crafting-card',

            {
              rotateZ: 15,
              opacity: 0.1,
            },
          )
        },
        onEnter: () => {},
        onEnterBack: () => {
          gsap.to('.crafting', {
            // clearProps: 'all',

            ease: 'none',
            width: '100%',
          })
          gsap.to(
            '.crafting-card',

            {
              rotateZ: 0,
              opacity: 1,
            },
          )
        },
      },
    })

    // Base move up
    tl1.to(
      '.crafting',
      {
        // y: '-30vh',
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
        ease: 'none',
      },
      'start',
    )
    // Final movement of crafting-card overlaps again

    // While it's moving up, start expanding height slightly after
    tl1.to(
      '.crafting',
      {
        y: '5vh',
        height: '100vh',
        ease: 'none',
        width: '100%',
      },
      '<',
    ) // starts 0.2 scroll units after the previous animation starts

    tl1.to(
      '.crafting-card',

      {
        rotateZ: 0,
        x: '0',
        y: '0',
        borderRadius: '30px',
        width: '40%',
        opacity: 1,
        height: '400px',
      },
      '<+0.005',
    )
    tl1.to(
      '.crafting-card-1',

      {
        rotateZ: 0,
        x: '0',
        y: '0px',
        borderRadius: '30px',
        width: '40%',
        opacity: 1,
        height: '400px',
      },
      '<+0.005',
    )
    tl1.fromTo(
      '.crafting-bottom-right',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none', stagger: 0.2 },
      '<+0.005',
    )
    // Animate intro-text while card is still animating
    // tl1.set('.intro-text', {
    //   x: '200%',
    //   opacity: 0.5,
    // })
    // tl1.to(
    //   '.intro-text',
    //   {
    //     x: '-200%',
    //     opacity: 1,
    //     ease: 'none',
    //   },
    //   '<+0.1',
    // )

    // const boxes = Array.from(gsap.utils.toArray('.box'))

    // boxes.forEach((box, index) => {
    //   const title = box.querySelector('.box-title')
    //   const desc = box.querySelector('.box-description')

    //   // const underline = title.querySelector('.underline');

    //   // const tl2 = gsap.timeline({ paused: true });

    //   // tl2.to(underline, {
    //   //   width: '100%',
    //   //   duration: 0.4,
    //   //   ease: 'power2.out',
    //   // });

    //   // title.addEventListener('mouseenter', () =>{
    //   //   console.log('Mouse entered title');

    //   //   tl2.play()});
    //   // title.addEventListener('mouseleave', () => tl2.reverse());
    //   // Set initial state
    //   gsap.set(box, {
    //     x: 500 + index * -100,
    //     rotate: -15,
    //     scale: 1,
    //     opacity: 0.7,
    //     zIndex: boxes.length - index,
    //   })

    //   gsap.set(title, {
    //     fontSize: '1rem',
    //   })

    //   gsap.set(desc, {
    //     opacity: 0,
    //     y: 40,
    //   })
    // })

    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: '.section.boxes',
    //     start: 'top top',
    //     end: `+=${boxes.length * 200}%`,
    //     scrub: true,
    //     pin: true,
    //     markers: true,
    //   },
    // })

    // boxes.forEach((box, index) => {
    //   const title = box.querySelector('.box-title')
    //   const desc = box.querySelector('.box-description')

    //   // Animate in
    //   tl.to(box, {
    //     x: 0,
    //     rotate: 0,
    //     scale: 2,
    //     opacity: 1,
    //     duration: 1,
    //     ease: 'power2.out',
    //   })

    //   tl.to(
    //     title,
    //     {
    //       fontSize: '2.5rem',
    //       duration: 0.5,
    //       ease: 'power2.out',
    //     },
    //     '<',
    //   )

    //   tl.to(
    //     desc,
    //     {
    //       opacity: 1,
    //       y: 0,
    //       duration: 0.5,
    //       ease: 'power2.out',
    //     },
    //     '<',
    //   )

    //   // Animate out (restore everything to initial)
    //   tl.to(desc, {
    //     opacity: 0,
    //     y: 40,
    //     duration: 0.5,
    //     ease: 'power2.in',
    //   })

    //   tl.to(
    //     title,
    //     {
    //       fontSize: '2rem',
    //       duration: 0.5,
    //       ease: 'power2.in',
    //     },
    //     '<',
    //   )

    //   tl.to(
    //     box,
    //     {
    //       x: -500 - index * 100,
    //       rotate: 15,
    //       scale: 1,
    //       opacity: 0.7,
    //       duration: 1,
    //       ease: 'power2.inOut',
    //     },
    //     '<',
    //   )
    // })

    // gsap.set('.outro-text', { x: '200%' })
    // gsap.to('.outro-text', {
    //   x: '-200%', // move fully to the right across screen
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: '.outro-section',
    //     start: 'top top',
    //     end: '+=100%',
    //     scrub: true,
    //     pin: true,
    //     markers: true,
    //   },
    // })

    const tl_flexibility = gsap.timeline({
      scrollTrigger: {
        trigger: '.flexibility-section',
        start: 'top 90%',
        end: `+=100%`,
        scrub: true,
        // pin: true,
        markers: true,

        onLeave: () => {},
        onEnter: () => {},
        onEnterBack: () => {
          gsap.to('.flexibility-content', {
            // clearProps: 'all',
            ease: 'power2.out',
            rotateZ: 0,
          })
        },
      },
    })

    tl_flexibility.to('.flexibility-title', {
      fontSize: '5vh',
      ease: 'none', // important for smooth scroll-scrubbing
    })
    tl_flexibility.to(
      '.flexibility-content',
      {
        width: '60%',
        ease: 'none', // important for smooth
      },
      '<',
    )

    tl_flexibility.fromTo(
      '.aesthetic-content > *',
      {
        y: 500,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        stagger: 0.02,
      },
    )
  })

  return (
    <>
      <main className='main'>
        <Landing />

        <ProductSection
          content={myProductData}
          url='https://anotherstore.com/product-link' // This 'url' prop will override content.shopButtonUrl
          price='€299,00' // This price is not directly used in the current visual, but can be added if needed.
        />

        <section
          className='section flexibility-section'
          style={{
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh', // must be set for flex ratios to work
          }}
        >
          {/* Top Title – smaller space */}
          <div
            className='flexibility-title'
            style={{
              flex: 1, // takes less height
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '5vw',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: '#555',
              letterSpacing: '0.1em',
              textAlign: 'center',
            }}
          >
            DESIGNED FOR FLEXIBILITY
          </div>

          {/* Card Content – takes more vertical space */}
          <div
            className='flexibility-content'
            style={{
              flex: 2, // fills remaining height
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              backgroundColor: '#fff',
              borderRadius: '1rem',
              margin: '1rem',
              padding: '2rem',
              width: '80%',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          ></div>

          {/* Footer – fixed height */}
          <div
            style={{
              flex: 2,
              width: '60%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'top',
              padding: '2rem 1rem',
            }}
            className='aesthetic-content'
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
              AESTHETIC <span style={{ fontWeight: 700 }}>FUNCTIONALISM</span>
            </h2>
            <p style={{ fontSize: '1rem', color: '#222', maxWidth: '600px', lineHeight: '1.5' }}>
              Delivering the morning news from the kitchen table or playing discreetly from the living room floor. With
              its clean lines and small footprint, it has an adaptable design that fits in everywhere in your home.
            </p>
          </div>
        </section>

        <section className='crafting-section gradient-green intro-section'>
          <div className='crafting'>
            <div className='crafting-card'>
              <h1 className='intro-text'>Crafting the Future of Audio</h1>
            </div>
            <div className='crafting-card-1'>
              <div class='lg:col-span-1 flex flex-col justify-between items-center lg:items-start text-center lg:text-left space-y-8 order-3 lg:order-3'>
                <div class='flex flex-col items-center lg:items-start space-y-4 crafting-bottom-right'>
                  <span class='crafting-card-title'>
                    Discover
                    <br />
                    Full Video
                  </span>
                </div>

                <p class='text-base md:text-lg max-w-sm mx-auto lg:mx-0 crafting-bottom-right'>
                  Applying our Acoustic Lens Technology into the conical speaker body creates a 360-degree sound
                  experience.
                </p>

                <button className='crafting-bottom-right bg-white text-blue-900 font-semibold py-3 px-6 rounded-full  shadow-lg hover:bg-gray-200 transition duration-300 flex items-center space-x-2'>
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
          </div>
        </section>
      </main>
    </>
  )
}

export default App
