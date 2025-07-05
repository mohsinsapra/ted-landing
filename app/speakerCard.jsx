import ProductPricing from './productPricing'
const SpeakerCard = ({
  imageSrc = '/product/golden.png',
  altText = 'Elegant Home Speaker',
  title = 'Elegant Home Speaker',
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`${className}`}
      style={{
        borderRadius: '1.5rem',
        transform: 'rotate(-10deg)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        width: '800px',
        height: '400px',
        position: 'relative',
        overflow: 'visible',
        ...style,
      }}
    >
      {/* Image Clipping Layer */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-30%',
          height: '150%',
          overflow: 'hidden',
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'start',
          // backgroundColor: 'red',
          // opacity: 0.5,
        }}
        className='speaker-image-layer'
      >
        {/* <h3
          style={{
            fontWeight: '600',
            fontSize: '1.4rem',
            color: '#fff',
            zIndex: 10,
            backgroundColor: 'red',
          }}
        >
          {title}
        </h3> */}
        <ProductPricing
          title='Elegant Home Speaker'
          subtitle='Gradient Colourways'
          features={['Speaker', 'Mains cable, 1.8 m (EU & US) / 3 m (CN)', 'Quick Start Guide', 'USB-C to AUX adapter']}
          price='189,00'
        />
        <img
          src={imageSrc}
          alt={altText}
          className='speaker-image'
          style={{
            position: 'relative',
            top: '-20%',
            transform: 'scale(1) rotateZ(20deg)',
            objectFit: 'contain',
          }}
        />
      </div>
      {/* Text */}
      {/* <h3
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          fontWeight: '600',
          fontSize: '1.4rem',
          color: '#fff',
          zIndex: 10,
        }}
      >
        {title}
      </h3> */}
    </div>
  )
}
export default SpeakerCard
