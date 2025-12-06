import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lyferdvxrqzzeuhpslly.supabase.co'
const supabaseKey = 'sb_publishable_GUHk_-FLwutWUJVYEQdDSw_sFxhSTk-'  // ✅ YOUR KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🔄 Testing connection...')
  
  const { data, error } = await supabase
    .from('seller')
    .select('email, name')
    .limit(1)
  
  if (error) {
    console.error('❌ ERROR:', error.message)
  } else if (data?.length > 0) {
    console.log('✅ CONNECTION SUCCESS!')
    console.log('✅ Seller:', data[0])
  } else {
    console.log('⚠️ Connected but no data - run seed.sql first')
  }
}

testConnection()
