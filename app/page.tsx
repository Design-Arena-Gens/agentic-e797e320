'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface Car {
  id: number
  make: string
  model: string
  year: number
  price: number
  mileage: number
  color: string
  transmission: string
  fuelType: string
  image: string
}

const cars: Car[] = [
  {
    id: 1,
    make: 'BMW',
    model: '3 Series',
    year: 2022,
    price: 45000,
    mileage: 15000,
    color: 'Black',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    image: '🚗'
  },
  {
    id: 2,
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2021,
    price: 42000,
    mileage: 22000,
    color: 'Silver',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    image: '🚙'
  },
  {
    id: 3,
    make: 'Audi',
    model: 'A4',
    year: 2023,
    price: 48000,
    mileage: 8000,
    color: 'White',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    image: '🚗'
  },
  {
    id: 4,
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 52000,
    mileage: 5000,
    color: 'Blue',
    transmission: 'Automatic',
    fuelType: 'Electric',
    image: '⚡'
  },
  {
    id: 5,
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 32000,
    mileage: 18000,
    color: 'Red',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    image: '🚗'
  },
  {
    id: 6,
    make: 'Honda',
    model: 'Accord',
    year: 2021,
    price: 28000,
    mileage: 25000,
    color: 'Gray',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    image: '🚙'
  },
  {
    id: 7,
    make: 'Porsche',
    model: '911',
    year: 2023,
    price: 125000,
    mileage: 3000,
    color: 'Yellow',
    transmission: 'Manual',
    fuelType: 'Petrol',
    image: '🏎️'
  },
  {
    id: 8,
    make: 'Ford',
    model: 'Mustang',
    year: 2022,
    price: 55000,
    mileage: 12000,
    color: 'Red',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    image: '🏁'
  },
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 150000])
  const [selectedFuelType, setSelectedFuelType] = useState('all')
  const [selectedTransmission, setSelectedTransmission] = useState('all')

  const filteredCars = cars.filter(car => {
    const matchesSearch =
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1]
    const matchesFuel = selectedFuelType === 'all' || car.fuelType === selectedFuelType
    const matchesTransmission = selectedTransmission === 'all' || car.transmission === selectedTransmission

    return matchesSearch && matchesPrice && matchesFuel && matchesTransmission
  })

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>🚗 Premium Car Sales</h1>
          <p>Find Your Dream Car Today</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search by make or model..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filtersSection}>
          <div className={styles.filter}>
            <label>Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</label>
            <input
              type="range"
              min="0"
              max="150000"
              step="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className={styles.rangeSlider}
            />
          </div>

          <div className={styles.filter}>
            <label>Fuel Type:</label>
            <select
              value={selectedFuelType}
              onChange={(e) => setSelectedFuelType(e.target.value)}
              className={styles.select}
            >
              <option value="all">All</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className={styles.filter}>
            <label>Transmission:</label>
            <select
              value={selectedTransmission}
              onChange={(e) => setSelectedTransmission(e.target.value)}
              className={styles.select}
            >
              <option value="all">All</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        </div>

        <div className={styles.results}>
          <h2>{filteredCars.length} Cars Available</h2>
        </div>

        <div className={styles.carGrid}>
          {filteredCars.map((car) => (
            <div key={car.id} className={styles.carCard}>
              <div className={styles.carImage}>{car.image}</div>
              <div className={styles.carDetails}>
                <h3>{car.year} {car.make} {car.model}</h3>
                <div className={styles.carPrice}>${car.price.toLocaleString()}</div>
                <div className={styles.carSpecs}>
                  <span>📏 {car.mileage.toLocaleString()} km</span>
                  <span>🎨 {car.color}</span>
                  <span>⚙️ {car.transmission}</span>
                  <span>⛽ {car.fuelType}</span>
                </div>
                <button className={styles.contactBtn}>Contact Seller</button>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className={styles.noResults}>
            <p>No cars match your search criteria. Try adjusting your filters.</p>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Premium Car Sales. All rights reserved.</p>
        <p>📞 Contact: (555) 123-4567 | 📧 info@premiumcars.com</p>
      </footer>
    </div>
  )
}
