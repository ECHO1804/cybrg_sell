export type Database = {
    public: {
      Tables: {
        seller: {
          Row: {
            id: string
            email: string
            password: string
            name: string
            created_at: string
          }
        }
        cyborgs: {
          Row: {
            id: string
            email: string
            password: string
            name: string
            created_at: string
          }
        }
        parts: {
          Row: {
            id: string
            seller_id: string
            name: string
            category: string
            price: number
            image: string | null
            description: string | null
            created_at: string
          }
        }
        // Add other tables as needed
      }
    }
  }
  