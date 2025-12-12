// Mock Supabase client for now - will be replaced with real DB later
export const supabase = {
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        single: () => ({
          data: null,
          error: null
        })
      }),
      single: () => ({
        data: null,
        error: null
      })
    }),
    insert: () => ({
      select: () => ({
        single: () => ({
          data: null,
          error: null
        })
      })
    }),
    delete: () => ({
      eq: () => ({
        data: null,
        error: null
      })
    })
  })
};