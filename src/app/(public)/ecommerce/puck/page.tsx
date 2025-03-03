'use client'
import { BenefitsSection } from '@/components/routes/ecommerce/ecommerce-benefits-section'
import { Header } from '@/components/routes/ecommerce/ecommerce-header'
import { Hero } from '@/components/routes/ecommerce/ecommerce-hero'
import { Puck } from '@measured/puck'
import '@measured/puck/puck.css'

// Create Puck component config
const config = {
  components: {
    HeadingBlock: {
      fields: {
        children: {
          type: 'text',
        },
      },
      render: ({ children }) => {
        return <h1>{children}</h1>
      },
    },
    Header: {
      fields: {
        children: {
          type: 'text',
        },
      },
      render: () => {
        return <Header />
      },
    },
    Hero: {
      fields: {
        children: {
          type: 'text',
        },
      },
      render: () => {
        return <Hero />
      },
    },
    Benefits: {
      fields: {
        children: {
          type: 'text',
        },
      },
      render: () => {
        return <BenefitsSection />
      },
    },
  },
}

// Describe the initial data
const initialData = {}

// Save the data to your database
const save = (data) => {}

// Render Puck editor
export default function Editor() {
  return <Puck config={config} data={initialData} onPublish={save} />
}
