import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root',
})

export class Supabase {
supabaseUrl = 'https://sgeldqqjbsxugotjiilw.supabase.co'
supabaseKey = 'sb_publishable_pZRR_Cwb2pLRUrzCVmZH7Q_Rw7Fl7Db'
supabase = createClient(this.supabaseUrl, this.supabaseKey)
}
