import {createClient} from '@supabase/supabase-js'


const SUPABASE_URL = "https://qcvmdxekdqtqiwtewnhm.supabase.co"
  const SUPABASE_ANON_KEY ="sb_publishable_Bseb6VWCbvlMe4lvhjQiNw_N9dKHwt8"





export const supabase = createClient(
   SUPABASE_URL,
   SUPABASE_ANON_KEY
)