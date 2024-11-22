export interface RestaurantData {
  id: number
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  contactInfo: string
  hours: string
  description: string
  categories?: string[]
  photos?: string[]
  rating?: number
  price?: number
  lat: number
  lng: number
  // photos?: (File | string)[]
}
export const mockRestaurants: RestaurantData[] = [
  {
    id: 1,
    name: 'Sample Restaurant 1',
    street: '123 Sample St',
    city: 'Sample City',
    state: 'Sample State',
    zipCode: '12345',
    country: 'US',
    contactInfo: '123-456-7890',
    hours: '9:00 AM - 9:00 PM',
    description: 'A cozy place for delicious food.',
    categories: ['Italian', 'Pizza'],
    photos: [],
    rating: 1,
    price: 4,
    lat: 37.3402,
    lng: -121.8855,
  },
  {
    id: 2,
    name: 'Sample Restaurant 2',
    street: '456 Sample Ave',
    city: 'Example City',
    state: 'Example State',
    zipCode: '67890',
    country: 'US',
    contactInfo: '987-654-3210',
    hours: '10:00 AM - 10:00 PM',
    description: 'Famous for amazing desserts.',
    categories: ['Bakery', 'Desserts'],
    photos: [],
    rating: 2,
    price: 3,
    lat: 37.3395,
    lng: -121.8877,
  },
]
