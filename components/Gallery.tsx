// components/Gallery.tsx
import Image from 'next/image'

const GallerySection = () => {
  const images = [
    '/images/audit-bg.jpg',
    '/images/hazmat-bg.jpg',
    '/images/training-bg.jpg',
    '/images/plant-examinations.jpg',
  ]

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-8">Our Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            width={640}
            height={360}
            alt={`Gallery Image ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg shadow-lg"
          />
        ))}
      </div>
    </div>
  )
}

export default GallerySection
