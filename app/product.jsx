import React from 'react'
import SpeakerCard from './speakerCard'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
// New SpeakerCard component based on your reference

const ProductSection = ({ content, url, price }) => {
  // Default content for the widget
  const defaultContent = {
    mainHeading: {
      buy: 'BUY YOUR',
      elegant: 'ELEGANT',
      speaker: 'SPEAKER',
    },
    description:
      'Wherever you place the speaker, it gives a standout performance. No muddiness. No fuzziness. Just pure, clean sound. As the artist intended.',
    shopButtonText: 'SHOP IN STORE',
    shopButtonUrl: '#', // Default URL
    speakerImageUrl: 'https://placehold.co/300x400/D1D5DB/4B5563?text=Speaker', // Placeholder for speaker
    brandText: 'Crimson Sounds',
  }

  // Merge default content with provided props
  const finalContent = {
    mainHeading: { ...defaultContent.mainHeading, ...(content?.mainHeading || {}) },
    description: content?.description || defaultContent.description,
    shopButtonText: content?.shopButtonText || defaultContent.shopButtonText,
    shopButtonUrl: url || defaultContent.shopButtonUrl, // Use 'url' prop for shop button
    speakerImageUrl: content?.speakerImageUrl || defaultContent.speakerImageUrl,
    brandText: content?.brandText || defaultContent.brandText,
  }

  // The 'price' prop is not directly used in this design, but it's kept for consistency
  // If you need to display price in this layout, you'd add it to finalContent and render it.

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    const tl_product_sections = gsap.timeline({
      scrollTrigger: {
        trigger: '.product-section-animation-container',
        start: 'top bottom',
        end: '+=100%', // more scroll distance = smoother feel
        scrub: true,
        // pin: true,
        markers: true,
        onLeave: () => {},
        onEnter: () => {},
        onEnterBack: () => {},
      },
    })

    tl_product_sections.fromTo(
      '.product-section-right-section',
      {
        x: '800px',
        y: '800px',
        scale: 2.5,
      },
      {
        scale: 1,
        x: '0px',
        y: '0px',
        ease: 'power1.out',
      },
      '<+=0.005', // Start this animation 0.5 seconds after the previous one
    )

    tl_product_sections.fromTo(
      '.product-section-left-section',
      {
        x: '-200px',
        y: '800px',
        opacity: 0,
        scale: 2.5,
        ease: 'power1.out',
      },
      {
        scale: 1,
        opacity: 1,
        x: '0px',
        y: '0px',
        ease: 'power1.out',
      },
      '<', // Start this animation 0.5 seconds after the previous one
    )
    const tl_product_text = gsap.timeline({
      scrollTrigger: {
        trigger: '.product-section-animation-container', // The element that starts and controls the scroll animation
        start: 'top top', // Animation starts when the top of the trigger hits the top of the viewport
        end: '+=80%', // The scroll distance over which the entire timeline plays (80% of viewport height after start)
        scrub: true, // Links the timeline to scroll position, allowing smooth scrubbing
        pin: true, // Keeps the trigger element (and its content) fixed in place while the animation plays
        markers: true, // Displays visual markers in the browser for debugging ScrollTrigger setup
        onLeave: () => {}, // Callback when the trigger leaves the viewport (scrolling down)
        onEnter: () => {}, // Callback when the trigger enters the viewport (scrolling down)
        onEnterBack: () => {}, // Callback when the trigger re-enters the viewport (scrolling up)
      },
    })

    // --- Start of Main Animation Sequence ---

    // Animation for the main title: Font size change
    tl_product_text.to(
      '.product-section-left-title',
      {
        fontSize: '3.5rem', // Target font size
        ease: 'none', // Linear animation progression
        duration: 0.1, // Duration of this specific tween within the timeline
      },
      '<+=0.0005', // Starts this tween 0.0005 seconds after the PREVIOUS tween finishes
      // Since this is the first animated 'to' tween in the timeline, it means 0.0005s after the timeline effectively 'starts'
    )

    // Animation for the description: Font size and opacity change
    tl_product_text.to(
      '.product-section-left-description',
      {
        fontSize: '0.5rem', // Target font size
        ease: 'none', // Linear animation progression
        opacity: 0, // Target opacity (fades out)
        duration: 0.05, // Duration of this specific tween
      },
      '<+=0.0005', // Starts this tween 0.0005 seconds after the PREVIOUS tween finishes
    )

    // --- Product Card 1: Entry and Internal Animations ---

    // Product Card 1: Main movement/reveal
    tl_product_text.to(
      '.product-card-1',
      {
        rotateZ: 0, // No rotation on Z-axis (assumes it might start rotated, or ensures it ends flat)
        xPercent: -25, // Moves -200px on the X-axis relative to its initial position
        // x: `-20vw`, // Complex X-axis movement based on index.
        // This likely moves card 1 to a specific position relative to its initial spot.
        duration: 0.1, // Duration of this specific tween
        opacity: 1, // Target opacity (fades in, assuming initial opacity is 0)
        ease: 'power1.out', // Smoother end to the animation
      },
      '<', // Starts this tween at the exact same time the PREVIOUS tween begins ('product-section-left-description')
    )

    // Product Card 1 Speaker Image: Internal animations
    tl_product_text.to(
      '.product-card-1 .speaker-image',
      {
        rotateZ: 0, // No rotation on Z-axis
        scale: 0.5, // Shrinks to half its size
        x: '100px', // Moves 100px on the X-axis relative to its initial position within .product-card-1
        duration: 0.1, // Duration of this specific tween
        ease: 'power1.out',
      },
      '<', // Starts this tween at the exact same time the PREVIOUS tween begins (main .product-card-1 animation)
    )

    // Product Card 1 Pricing Container: Internal animations
    tl_product_text.to(
      '.product-card-1 .pricing-container',
      {
        scale: 0.7, // Shrinks to 80% its size
        x: '-90px', // Moves -80px on the X-axis relative to its initial position within .product-card-1
        y: '-260px', // Moves -220px on the Y-axis relative to its initial position within .product-card-1
        duration: 0.1, // Duration of this specific tween
        ease: 'power1.out',
      },
      '<', // Starts this tween at the exact same time the PREVIOUS tween begins (speaker image animation)
    )

    // --- Product Card 2: Entry and Card 1: Exit ---

    // Product Card 2: Slides into initial view position
    tl_product_text.fromTo(
      '.product-card-2',
      {
        // x: '100vw', // Starts completely off-screen to the left
        xPercent: 100,
        opacity: 0,
      },
      {
        xPercent: -20,
        // x: '-15vw', // Moves -200px on the X-axis relative to its initial position
        duration: 0.1, // Duration of this specific tween
        ease: 'power1.out',
        opacity: 1, // Fades in (assuming initial opacity is 0)
      },
      '<', // Starts this tween at the exact same time the PREVIOUS tween begins (pricing container animation)
    )

    // Product Card 1: Continues moving off-screen to the left
    tl_product_text.to(
      '.product-card-1',
      {
        xPercent: -170,
        // x: `-90vw`, // Moves -1200px on the X-axis (relative to its initial position at the start of this tween)
        duration: 0.15, // Duration of this specific tween
        ease: 'power1.out',
        rotateZ: 20, // Rotates 20 degrees on the Z-axis as it leaves
        opacity: 1, // Maintains full opacity while leaving (if it should fade, set to 0)
      },
      '<+=0.25', // Starts this tween 0.15 seconds after the PREVIOUS tween begins (product-card-2 entry)
    )

    // --- Left Section: Moves off-screen ---

    tl_product_text.to(
      '.product-section-left-section',
      {
        x: '-500vw', // Moves -1000px on the X-axis (off-screen left)
        duration: 0.15, // Duration of this specific tween
        ease: 'power1.out',
      },
      '<', // Starts this tween at the exact same time the PREVIOUS tween begins (product-card-1 exit)
    )

    // --- Product Card 2: Central Position and Internal Animations ---

    // Product Card 2: Moves to its "central" or main animated position
    tl_product_text.to(
      '.product-card-2',
      {
        xPercent: -150,
        // x: '-77vw', // Moves -900px on the X-axis (relative to its initial position at the start of this tween)
        duration: 0.15, // Duration of this specific tween
        rotateZ: 0, // No rotation on Z-axis
        ease: 'power1.out',
        opacity: 1, // Maintains full opacity
      },
      '<', // Starts this tween at the exact same time the PREVIOUS tween begins (left section exit)
    )

    // Product Card 2 Speaker Image: Internal animations
    tl_product_text.to(
      '.product-card-2 .speaker-image',
      {
        rotateZ: 0, // No rotation on Z-axis
        scale: 0.5, // Shrinks to half size
        x: '100px', // Moves 100px on the X-axis
        duration: 0.1, // Duration of this specific tween
        ease: 'power1.out',
      },
      '<', // Starts this tween at the exact same time the PREVIOUS tween begins (main .product-card-2 move)
    )

    // Product Card 2 Pricing Container: Internal animations
    tl_product_text.to(
      '.product-card-2 .pricing-container',
      {
        scale: 0.7, // Shrinks to 80% size
        x: '-90px', // Moves -80px on the X-axis relative to its initial position within .product-card-1
        y: '-260px', // Moves -220px on the Y-axis relative to its initial position within .product-card-1
        duration: 0.1, // Duration of this specific tween
        ease: 'power1.out',
      },
      '<', // Starts this tween at the exact same time the PREVIOUS tween begins (speaker image animation)
    )

    // --- Product Card 3: Entry and Card 1: Final Exit ---

    // Product Card 3: Slides into initial view position
    tl_product_text.fromTo(
      '.product-card-3',
      {
        xPercent: 100,
        // x: '100vw', // Starts completely off-screen to the left
        opacity: 0,
      },
      {
        xPercent: -140,
        // x: '-72vw', // Moves -850px on the X-axis relative to its initial position
        duration: 0.15, // Duration of this specific tween
        ease: 'power1.out',
        opacity: 1, // Fades in
      },
      '<', // Starts this tween at the exact same time the PREVIOUS tween begins (pricing container animation)
    )

    // Product Card 1: Continues moving further off-screen (final exit)
    tl_product_text.to(
      '.product-card-1',
      {
        x: `-200vw`, // Moves -2000px on the X-axis (relative to its position at the start of this tween)
        duration: 0.25, // Duration of this specific tween
        ease: 'power1.out',
        rotateZ: 20, // Rotates 20 degrees
        opacity: 0, // Fades out completely
      },
      '<+=0.25', // Starts this tween 0.25 seconds after the PREVIOUS tween begins (product-card-3 entry)
    )

    // --- Product Card 2: Final Exit ---

    // Product Card 2: Moves off-screen
    tl_product_text.to(
      '.product-card-2',
      {
        xPercent: -280,
        // x: `-145vw`, // Moves -1800px on the X-axis (relative to its position at the start of this tween)
        duration: 0.15, // Duration of this specific tween
        ease: 'power1.out',
        rotateZ: 20, // Rotates 20 degrees
      },
      '<', // Starts this tween at the exact same time the PREVIOUS tween begins (product-card-1 final exit)
    )

    // --- Product Card 3: Central Position and Internal Animations ---

    // Product Card 3: Moves to its "central" or main animated position
    tl_product_text.to(
      '.product-card-3',
      {
        xPercent: -260, // Moves -200px on the X-axis relative to its initial position
        // x: '-134vw', // Moves -1550px on the X-axis (relative to its position at the start of this tween)
        rotateZ: 0, // No rotation on Z-axis
        duration: 0.15, // Duration of this specific tween
        ease: 'power1.out',
        opacity: 1, // Maintains full opacity
      },
      '<', // Starts this tween at the exact same time the PREVIOUS tween begins (product-card-2 final exit)
    )

    // Product Card 3 Speaker Image: Internal animations
    tl_product_text.to(
      '.product-card-3 .speaker-image',
      {
        rotateZ: 0, // No rotation on Z-axis
        scale: 0.5, // Shrinks to half size
        x: '100px', // Moves 100px on the X-axis
        duration: 0.1, // Duration of this specific tween
        ease: 'power1.out',
      },
      '<', // Starts this tween at the exact same time the PREVIOUS tween begins (main .product-card-3 move)
    )

    // Product Card 3 Pricing Container: Internal animations
    tl_product_text.to(
      '.product-card-3 .pricing-container',
      {
        scale: 0.7, // Shrinks to 80% size
        x: '-90px', // Moves -80px on the X-axis relative to its initial position within .product-card-1
        y: '-260px', // Moves -220px on the Y-axis relative to its initial position within .product-card-1
        duration: 0.1, // Duration of this specific tween
        ease: 'power1.out',
      },
      '<', // Starts this tween at the exact same time the PREVIOUS tween begins (speaker image animation)
    )
  })

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8 font-sans text-white relative overflow-hidden product-section-animation-container'>
      {/* Left Section: Text and Shop Button */}
      <div className='flex-shrink-0 mb-12 lg:mb-0 lg:w-1/2 text-center lg:text-left p-4 z-10 product-section-left-section'>
        <h1 className='text-4xl sm:text-5xl lg:text-8xl font-extrabold lseading-tight tracking-tight mb-4 product-section-left-title'>
          {finalContent.mainHeading.buy} <br />
          <span className='text-white'>{finalContent.mainHeading.elegant}</span> <br />
          {finalContent.mainHeading.speaker}
        </h1>
        <p className='text-base sm:text-lg text-gray-200 leading-relaxed max-w-md mx-auto lg:mx-0 mb-8 product-section-left-description'>
          {finalContent.description}
        </p>
        <a
          href={finalContent.shopButtonUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center space-x-3 py-3 px-8 bg-black text-white text-lg font-semibold rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-200'
        >
          <span>{finalContent.shopButtonText}</span>
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
          </svg>
        </a>
      </div>

      {/* Right Section: SpeakerCard component */}
      <div className='relative w-full lg:w-1/2 items-center justify-center h-80 sm:h-96 md:h-[400px] lg:h-[calc(100vh-6rem)] max-h-[500px] product-section-right-section'>
        {/* This inner div will hold your cards in a horizontal line */}
        {/* It needs to be a block or inline-block itself to be animatable via x */}
        {/* The 'flex' from the parent is causing some initial centering; you might need to adjust parent styles */}
        <div
          className='product-cards-track'
          style={{
            display: 'inline-block', // Make this track an inline-block to naturally expand with its content
            whiteSpace: 'nowrap', // Prevent inner inline-block elements from wrapping to the next line
            height: '100%', // Take full height of its parent
            verticalAlign: 'middle', // If you want to vertically center it within its parent
            // Initial positioning for the track - often `left: 0` or no `left` if it flows naturally
            // For centering within `product-section-right-section`, you might need more specific CSS
          }}
        >
          <SpeakerCard
            imageSrc={finalContent.speakerImageUrl}
            brandText={finalContent.brandText}
            className='product-card-1'
            // IMPORTANT: Apply inline-block and horizontal spacing to the cards themselves
            style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '50px' }}
          />

          <SpeakerCard
            imageSrc={'/product/grey.png'}
            brandText={finalContent.brandText}
            className='product-card-2'
            style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '50px', opacity: 0 }}
          />

          <SpeakerCard
            imageSrc={'/product/blue.png'} // Example of a third card
            brandText={finalContent.brandText}
            className='product-card-3'
            style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '50px', opacity: 0 }}
          />

          <SpeakerCard
            imageSrc={'/product/golden.png'} // Example of a third card
            brandText={finalContent.brandText}
            className='product-card-4'
            style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '50px', opacity: 0 }}
          />
          {/* Keep adding more SpeakerCards here */}
        </div>
      </div>
    </div>
  )
}

export default ProductSection
